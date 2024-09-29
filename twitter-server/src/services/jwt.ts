import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from "jsonwebtoken";
import { JWTUser } from "../interfaces";

const JWT_SECRET:string=process.env.JWT_SECRET || "JWT_secret_is_set";

class JWTService{
    public static generateTokenForUser(user:User){
        const payload:JWTUser={
            id:user?.id,
            email:user?.email
        };
        const token=JWT.sign(payload,JWT_SECRET);
        return token;
    }

    public static decodeToken(token:string){
        return JWT.verify(token,JWT_SECRET) as JWTUser;
    }
}

export default JWTService;