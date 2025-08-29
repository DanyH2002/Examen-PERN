import axios from 'axios';
import { object, string, minLength, pipe, safeParse, maxLength, date } from 'valibot';
import type { Book } from '../Types/Book';

export const DraftUsertSchema = object({
    title: pipe(string(), minLength(3, 'El titulo es obligatorio')),
    author: pipe(string(), minLength(3, 'El autor es obligatorio')),
    isbn: pipe(string(), minLength(10, 'El ISBN es obligatorio'), maxLength(13, "EL ISBN no puede tener mas de 13 caracteres ")),
    description: pipe(string(), minLength(3, 'La descripcion es obligatoria')),
    publicationDate: pipe(date()),
    genre: pipe(string(), minLength(3, 'El genero es obligatorio')),
});

type BookData = {
    [key: string]: FormDataEntryValue;
};

const BASE_URL = import.meta.env.VITE_API_URL;

export async function addBook(data: BookData) {
    try {
        const parsed = safeParse(DraftUsertSchema, {
            title: String(data.title),
            author: String(data.author),
            isbn: String(data.isbn),
            description: String(data.description),
            publicationDate: new Date(String(data.publicationDate)),
            genre: String(data.genre),
        });

        if (!parsed.success) {
            const messages = parsed.issues.map(issue => issue.message).join(', ');
            throw new Error(messages);
        }

        const url = `${BASE_URL}/books`;

        const response = await axios.post(url, {
            title: parsed.output.title,
            author: parsed.output.author,
            isbn: parsed.output.isbn,
            description: parsed.output.description,
            publicationDate: parsed.output.publicationDate,
            genre: parsed.output.genre
        });

        return response.data;
    } catch (error) {
        console.log('Error al agregar libro:', error);
        throw error;
    }
}

export async function getBooks(): Promise<Book[]> {
    try {
        const url = `${BASE_URL}/books`;
        const response = await axios.get(url);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log("Error al obtener la lista de libros: ", error);
        throw error;
    }
}

export async function getBookById(id: string): Promise<Book> {
    try {
        const url = `${BASE_URL}/books/${id}`;
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.log("Error al cargar datos del libro: ", error);
        throw error;
    }
}

export async function deleteBook(id: string): Promise<void> {
    try {
        const url = `${BASE_URL}/books/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log('Error al eliminar el libro:', error);
        throw error;
    }
}

export async function updateBook(id: string, data: BookData): Promise<Book> {
    try {
        const parsed = safeParse(DraftUsertSchema, {
            title: String(data.title),
            author: String(data.author),
            isbn: String(data.isbn),
            description: String(data.description),
            publicationDate: new Date(String(data.publicationDate)),
            genre: String(data.genre),
        });

        if (!parsed.success) {
            const messages = parsed.issues.map(issue => issue.message).join(', ');
            throw new Error(messages);
        }

        const url = `${BASE_URL}/books/${id}`;
        const response = await axios.put(url, {
            title: parsed.output.title,
            author: parsed.output.author,
            isbn: parsed.output.isbn,
            description: parsed.output.description,
            publicationDate: parsed.output.publicationDate,
            genre: parsed.output.genre
        });
        return response.data;
    } catch (error) {
        console.log("Error al actualizar el libro: ", error);
        throw error;
    }
}

export async function updateAvailability(id: string): Promise<Book> {
    try {
        const url = `${BASE_URL}/books/${id}`;
        const response = await axios.patch(url);
        return response.data.data;
    } catch (error) {
        console.log("Error al actualizar disponibilidad del libro: ", error);
        throw error;
    }
}

