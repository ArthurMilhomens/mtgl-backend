import { Deck } from "../../decks/model/deck";

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    decks?: Deck[];
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    decks?: Deck[];
    profileImage?: string;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

export interface LoginUser {
    email: string;
    password: string;
}