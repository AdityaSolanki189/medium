import { IAuthor } from "./UserViews";

export interface IBlog {
    id: string;
    author: IAuthor;
    title: string;
    content: string;
}
