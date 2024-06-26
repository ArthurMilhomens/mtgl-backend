import { PrismaClient } from "@prisma/client";
import { CreateUser, User } from "../model/user";
import bcrypt from 'bcryptjs';
import { Token } from '../../../utils/jwt';

const jwt = new Token();

const prisma = new PrismaClient();

export async function createUser(data: CreateUser): Promise<User> {

    data.password = bcrypt.hashSync(data.password, 8);

    const user = await prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
        }
    });

    const userWithAcessToken = {
        ...user,
        acessToken: await jwt.signAccessToken(user)
    };

    return userWithAcessToken
}