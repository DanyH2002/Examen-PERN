import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AlertMessage from '../AlertMessage';
import type { Book } from '../Types/Book';
import { getBooks, deleteBook, updateAvailability } from '../Services/BookService';

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [confirmId, setConfirmId] = useState<string | null>(null);

    useEffect(() => {
        getBooks()
            .then((data) => setBooks(data))
            .catch(() => setError('Error al cargar libros'))
            .finally(() => setLoading(false));
    }, []);

    const confirmDelete = async () => {
        if (!confirmId) return;
        try {
            await deleteBook(confirmId);
            setBooks(prev => prev.filter(books => String(books.id) !== confirmId));
        } catch {
            setError('Error al eliminar libro del sistema');
        } finally {
            setConfirmId(null);
        }
    };

    const toggleAvailability = async (id: string) => {
        try {
            const updated = await updateAvailability(id);
            setBooks(prev =>
                prev.map(book => (book.id === updated.id ? updated : book))
            );
        } catch {
            setError('No se pudo actualizar la disponibilidad');
        }
    };

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-brown-800">Biblioteca Otoñal 🍁</h2>
                    <Link
                        to="/books/create"
                        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        + Agregar Libro
                    </Link>
                </div>

                {loading && <p className="text-brown-500">Cargando libros...</p>}
                {error && <p className="text-red-600">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className={`rounded-lg border border-amber-300 shadow-md p-5 bg-amber-50 transition-opacity ${book.available ? 'opacity-100' : 'opacity-60'
                                }`}
                        >
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-brown-900">{book.title}</h3>
                                <p className="text-sm text-brown-700">Autor: {book.author}</p>
                                <p className="text-sm text-brown-700">ISBN: {book.isbn}</p>
                                <p className="text-sm text-brown-700">Género: {book.genre}</p>
                                <p className="text-sm text-brown-700">
                                    Publicado: {new Date(book.publicationDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-brown-700 italic">
                                    {book.description.length > 100
                                        ? book.description.slice(0, 100) + '...'
                                        : book.description}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() => toggleAvailability(String(book.id))}
                                    className={`text-xs font-medium px-3 py-1 rounded-md ${book.available
                                        ? 'bg-green-600 text-white hover:bg-green-500'
                                        : 'bg-red-600 text-white hover:bg-red-500'
                                        }`}
                                >
                                    {book.available ? 'Disponible' : 'No disponible'}
                                </button>

                                <div className="flex space-x-3">
                                    <Link
                                        to={`/books/edit/${book.id}`}
                                        className="text-yellow-700 hover:underline text-sm"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => setConfirmId(String(book.id))}
                                        className="text-red-700 hover:underline text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {confirmId && (
                    <AlertMessage
                        message="¿Estás segura de que quieres eliminar este libro?"
                        onConfirm={confirmDelete}
                        onCancel={() => setConfirmId(null)}
                    />
                )}
            </div>
        </>
    )
}
