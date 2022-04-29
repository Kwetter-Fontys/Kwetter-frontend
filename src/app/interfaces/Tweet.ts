import { Likes } from "./Likes";

export interface Tweet {
    id: number;
    content: string;
    userId: string;
    date: Date;
    likes: Likes[];
}
