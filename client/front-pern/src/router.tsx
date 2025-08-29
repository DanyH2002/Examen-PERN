import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { getBookById } from "./Services/BookService";
import BookForm, { generaLibro, actualizarLibro } from "./Components/BookForm";
import BookList from "./Components/BookList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/books',
                element: <BookList />
            },
            {
                path: '/books/create',
                element: <BookForm />,
                action: generaLibro
            },
            {
                path: '/books/edit/:id',
                element: <BookForm />,
                loader: async ({ params }) => {
                    if (!params.id) {
                        throw new Error("El parámetro 'id' es requerido");
                    }
                    const book = await getBookById(params.id);
                    return book;
                },
                action: actualizarLibro
            }
        ]
    }
])