import { User } from "./user";

export interface Friend {
    _id?: any;
    user: User | string;
    cool: boolean;
    quote?: string;
    estado: string;
}