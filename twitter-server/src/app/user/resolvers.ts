
import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";

interface GoogleTokenList {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

function followUser(from: string, to: string) {
    return prismaClient.follows.create({
        data: {
            follower: { connect: { id: from } },
            following: { connect: { id: to } },
        },
    });
}

function unfollowUser(from: string, to: string) {
    return prismaClient.follows.delete({
        where: { followerId_followingId: { followerId: from, followingId: to } },
    });
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const googleToken = token;
        const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthURL.searchParams.set('id_token', googleToken);
        const { data } = await axios.get<GoogleTokenList>(googleOauthURL.toString(), {
            responseType: 'json'
        })


        const user = await prismaClient.user.findUnique({ where: { email: data.email } });
        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                }
            })
        }


        const userInDb = await prismaClient.user.findUnique({ where: { email: data.email } });
        if (!userInDb) {
            throw new Error("User with email not found.");
        }
        const userToken = JWTService.generateTokenForUser(userInDb);
        return userToken;
    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx?.user?.id;
        if (!id) {
            return null;
        }
        const user = await prismaClient.user.findUnique({ where: { id } })
        return user;
    },

    getUserById: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => prismaClient.user.findUnique({ where: { id } })
}

const extraResolvers = {
    User: {
        tweets: (parent: User) => prismaClient.tweet.findMany({ where: { author: { id: parent.id } } })
    },
    followers: async (parent: User) => {
        const result = await prismaClient.follows.findMany({
            where: { following: { id: parent.id } },
            include: {
                follower: true,
            },
        });
        return result.map((el) => el.follower);
    },
    following: async (parent: User) => {
        const result = await prismaClient.follows.findMany({
            where: { follower: { id: parent.id } },
            include: {
                following: true,
            },
        });
        return result.map((el) => el.following);
    },
    recommendedUsers: async (parent: User, _: any, ctx: GraphqlContext) => {
        if (!ctx.user) return [];

        const myFollowings = await prismaClient.follows.findMany({
            where: {
                follower: { id: ctx.user.id },
            },
            include: {
                following: {
                    include: { followers: { include: { following: true } } },
                },
            },
        });

        const users: User[] = [];

        for (const followings of myFollowings) {
            for (const followingOfFollowedUser of followings.following.followers) {
                if (
                    followingOfFollowedUser.following.id !== ctx.user.id &&
                    myFollowings.findIndex(
                        (e) => e?.followingId === followingOfFollowedUser.following.id
                    ) < 0
                ) {
                    users.push(followingOfFollowedUser.following);
                }
            }
        }

        console.log("Cache Not Found");

        return users;
    },
}

const mutations = {
    followUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");

        await followUser(ctx.user.id, to);
        return true;
    },
    unfollowUser: async (
        parent: any,
        { to }: { to: string },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user || !ctx.user.id) throw new Error("unauthenticated");
        await unfollowUser(ctx.user.id, to);
        return true;
    },
};

export const resolvers = { queries, extraResolvers, mutations };