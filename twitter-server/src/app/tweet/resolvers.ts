import { GraphqlContext } from "../../interfaces";
import { prismaClient } from "../../clients/db";
import { Tweet } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface CreateTweetPayload {
    content: string
    imageURL?: string
    tags: [string]
}

const s3Client = new S3Client({region:"us-east-1",credentials: { accessKeyId: `${process.env.S3_ACCESS}`, secretAccessKey: `${process.env.AWS_S3_SECRET}` } });

const queries = {
    getAllTweets: () => prismaClient.tweet.findMany({ orderBy: { createdAt: 'desc' } }),
    getSignedURLForTweet: async (parent: any, { imageType,imageName }: { imageType: string,imageName:string }, ctx: GraphqlContext) => {
        if (!ctx.user || !ctx.user.id) {
            throw new Error("Unauthenticated");
        }
        const allowedImageTypes = ["jpg", "jpeg", "png", "webp"];
        if (!allowedImageTypes.includes(imageType)) {
            throw new Error("Unsupported Image type");
        }

        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            ContentType: imageType,
            Key: `uploads/${ctx.user.id}/tweets/${imageName}-${Date.now()}`,
        });

        const signedURL = await getSignedUrl(s3Client, putObjectCommand);

        return signedURL;
    }
}

const mutations = {
    createTweet: async (parent: any, { payload }: { payload: CreateTweetPayload }, ctx: GraphqlContext) => {
        if (!ctx.user) {
            throw new Error("you are not authenticated");
        }
        else {
            const tweet = await prismaClient.tweet.create({
                data: {
                    content: payload.content,
                    imageURL: payload.imageURL,
                    tags: payload.tags,
                    author: { connect: { id: ctx.user.id } },
                }
            })
            return tweet;
        }
    }
}

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) => prismaClient.user.findUnique({ where: { id: parent.authorId } })
    }
}

export const resolvers = { mutations, extraResolvers, queries };