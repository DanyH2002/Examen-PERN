import { Form, ActionFunctionArgs, useActionData, redirect, useParams, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import { addBook, updateBook } from '../Services/BookService';

export async function generaLibro({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    if (Object.values(data).includes('')) {
        return { error: 'Todos los campos son obligatorios' };
    }
    try {
        await addBook(data);
        return redirect('/books');
    } catch {
        return { error: 'Error al regitrar el libro. Intenta nuevamente.' };
    }
}

export async function actualizarLibro({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    if (Object.values(data).includes('')) {
        return { error: 'Todos los campos son obligatorios' };
    }
    try {
        await updateBook(params.id!, data);
        return redirect('/books');
    } catch {
        return { error: 'Error al actualizar el libro. Intenta nuevamente.' };
    }
}



function BookForm() {
    const actionData = useActionData() as { error?: string; };
    const book = useLoaderData() as { title: string; author: string; isbn: string; description: string, publicationDate: Date, genre: string } | undefined;
    const { id } = useParams();
    const isEdit = Boolean(id);
    return (
        <>
            {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex justify-center p-3">
                {isEdit ? `Actualizar Libto: ${book?.title}` : 'Registro de Libros'}
            </h2>
            <Form className="max-w-3xl mx-auto px-6 py-10 bg-amber-50 rounded-lg shadow-md" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold">
                            Título del Libro
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            defaultValue={book?.title || ''}
                            placeholder="Ej. La Sombra del Lobo"
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-sm font-semibold">
                            Autor del Libro
                        </label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            defaultValue={book?.author || ''}
                            placeholder="Ej. Erya"
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="isbn" className="block text-sm font-semibold">
                            ISBN
                        </label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            defaultValue={book?.isbn || ''}
                            placeholder="Ej. 9798833569733"
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        />
                        <spa className="text-sm text-amber-950 font-light">ISBN debe ser de 10 a 13 caracteres</spa>
                    </div>

                    <div>
                        <label htmlFor="publicationDate" className="block text-sm font-semibold">
                            Fecha de Publicación
                        </label>
                        <input
                            id="publicationDate"
                            name="publicationDate"
                            type="date"
                            defaultValue={
                                book?.publicationDate
                                    ? new Date(book.publicationDate).toISOString().split('T')[0]
                                    : ''
                            }
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="genre" className="block text-sm font-semibold">
                            Género Literario
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            defaultValue={book?.genre || ''}
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        >
                            <option value="">Selecciona un género</option>
                            <option value="narrativo">Narrativo: Novela, Cuento, etc.</option>
                            <option value="lirico">Lírico: Oda, Soneto, etc.</option>
                            <option value="didactico">Didáctico: Ensayo, Biografía, etc.</option>
                            <option value="dramatico">Dramático: Tragedia, Fantasía, etc.</option>
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-brown-700">
                            Descripción del Libro
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={book?.description || ''}
                            placeholder="Ej. Una gran historia muy conocida, pero contada de distinta forma"
                            rows={4}
                            className="mt-2 block w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-brown-900 shadow-sm focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Guardar
                    </button>
                </div>
            </Form>

        </>
    )
}

export default BookForm;