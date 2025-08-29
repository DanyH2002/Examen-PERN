export type Book = {
    id: number;
    title: string;
    author: string;
    isbn: string;
    description: string;
    publicationDate: Date;
    genre: string;
    available?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
