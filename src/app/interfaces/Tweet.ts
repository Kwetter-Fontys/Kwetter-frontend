import { Likes } from "./Likes";

export interface Tweet {
    id: number;
    content: string;
    userId: number;
    date: Date;
    likes: Likes[];
}
