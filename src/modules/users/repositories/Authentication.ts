import { PrismaClient } from "@prisma/client";
import { LoginUser, User } from "../model/user";
import bcrypt from 'bcryptjs';
import createError from "http-errors";
import { Token } from '../../../utils/jwt';

const jwt = new Token();

const prisma = new PrismaClient();

export async function authenticate({ email, password }: LoginUser): Promise<User> {

    const user = await prisma.user.findUniqueOrThrow({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            profileImage: true,
        }
    });

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');

    const accessToken = await jwt.signAccessToken(user);

    const userWithAccessToken = {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        accessToken
    };

    return userWithAccessToken

}