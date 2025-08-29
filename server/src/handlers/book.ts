import { Request, Response } from 'express';
import Book from '../models/Book.mo';

export const createBook = async (req: Request, res: Response) => {
    try {
        const { isbn } = req.body;
        if (await Book.findOne({ where: { isbn } })) {
            return res.status(400).json({ error: 'El ISBN del libro ya fue registrado' });
        }
        const book = await Book.create(req.body);
        await book.save();
        res.status(201).json({ data: book });
    } catch (error) {
        console.log("Error al registrar el libro");
    }
}

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const book = await Book.findAll({
            order: [
                ['title', 'ASC']
            ],
        });
        res.status(200).json({ data: book });
    } catch (error) {
        console.log("Error al obtener los libros");
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ erro: 'Libro no encontrado' });
        }
        res.status(200).json({ data: book });
    } catch (error) {
        console.log("Error al obtener el libro por ID");
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isbn } = req.body;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ erro: 'Libro no encontrado' });
        }
        const existingISBN = await Book.findOne({ where: { isbn } });
        if (existingISBN && existingISBN.id !== book.id) {
            return res.status(400).json({ error: 'El ISBN ya fue registrado' });
        }
        book.title = req.body.title;
        book.author = req.body.author;
        book.isbn = req.body.isbn;
        book.description = req.body.description;
        book.publicationDate = req.body.publicationDate;
        book.genre = req.body.genre;
        await book.save();
        res.status(200).json({ data: book });
    } catch (error) {
        console.log("Error al actualizar el libro");
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ erro: 'Libro no encontrado' });
        }
        await book.destroy();
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        console.log("Error al eliminar el libro");
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).json({ erro: 'Libro no encontrado' });
        }
        book.available = !book.dataValues.available;
        await book.save();
        res.status(200).json({ data: book });
    } catch (error) {
        console.log("Error al actualizar la disponibilidad del libro");
    }
}
