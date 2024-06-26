import { Request, Response } from "express";
import { CreateUser, User } from "../../model/user";
import { createUser } from "../../repositories/CreateUserRepository";
import { getUsers } from "../../repositories/List/ListUsersRepository";

export async function createUserController(req: Request, res: Response) {
    const data: CreateUser = req.body;
    const users = await getUsers({});

    if (users !== undefined) {
        const userAlreadyExists = users.find(user => user.email === data.email)
    
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" })
        }
    }

    const user = await createUser({
        ...data,
    })

    return res.status(201).json(user)
}

