import { Friend } from "./friend";

export interface User {
    _id?: any;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string; 
    friends: Friend[] | string[];
}