import { Likes } from "./Likes";

export interface Tweet {
    id: number;
    content: string;
    user: string;
    date: Date;
    likes: Likes[];
}
