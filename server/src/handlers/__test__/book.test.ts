import request from "supertest";
import server from "../../server";
import Book from "../../models/Book.mo";
import { createBook, getAllBooks, getBookById, updateBook, updateAvailability, deleteBook } from '../book';

describe("POST /api/books", () => {
    it("Debe mostrar errores de validación si el cuerpo esta vacio", async () => {
        const res = await request(server).post('/api/books').send({});
        expect(res.status).toBe(400);
    });
    it("Registrar el libro si los datos son correctos", async () => {
        const res = await request(server).post('/api/books').send({
            title: 'Fallen',
            author: 'Lauen Kate',
            isbn: '9780385738934',
            description: 'Hisotria sobre la fuerza del amor',
            price: 500,
            publicationDate: '2009-12-08',
            genre: 'narrativo'
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data');
    });
    it("No se crea el libro por ISBN ya registrado", async () => {
        const res = await request(server).post('/api/books').send({
            title: 'El regreso de la sombra',
            author: 'Lauen Kate',
            isbn: '9780385738934',
            description: 'Viaje por los misterios del pasado',
            price: 300,
            publicationDate: '2010-09-28',
            genre: 'narrativo'

        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'El ISBN del libro ya fue registrado')
    });
    it("Debe mostrar errores de validación si el cuerpo esta incompleto", async () => {
        const res = await request(server).post('/api/books').send({
            title: 'El regreso de la sombra',
            author: 'Lauen Kate',
            isbn: '9780385738934',
            description: 'Viaje por los misterios del pasado',
        });
        expect(res.status).toBe(400);
    });
});
describe("GET /api/books", () => {
    it("Debe devolver un status 200", async () => {
        const res = await request(server).get('/api/books');
        expect(res.status).toBe(200);
    });
    it("Devuelve los datos en formato JSON", async () => {
        const res = await request(server).get('/api/books')
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.header['content-type']).not.toMatch(/text/)
    });
    it("La respuesta debe contener una propiedad data", async () => {
        const res = await request(server).get('/api/books')
        expect(res.body).toHaveProperty('data')
    });
    it("La respuesta 'no' debe tener la propiedad errors", async () => {
        const res = await request(server).get('/api/books')
        expect(res.body).not.toHaveProperty('errors')
    });
});
describe("GET /api/books/:id", () => {
    it("Retornar 404 si el libro no existe", async () => {
        const res = await request(server).get('/api/books/9999')
        expect(res.status).toBe(404)
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).get('/api/books/abc')
        expect(res.status).toBe(400)
    });
    it("Retornar 200 y los datos del producto si el ID es valido", async () => {
        const createRest = await request(server).post('/api/books').send({
            title: 'Unforgiven',
            author: 'Lauen Kate',
            isbn: '0385742630',
            description: 'Hisotria sobre la fuerza del destino y sus peligros',
            price: 800,
            publicationDate: '2015-11-10',
            genre: 'narrativo'
        });
        expect(createRest.status).toBe(201);
        const id = createRest.body.data.id;
        const res = await request(server).get(`/api/books/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
    });
});
describe("PUT /api/books/:id", () => {
    it("Retornar errores si el cuerpo esta vacio", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'El Alquimista',
            author: 'Paulo Coelho',
            isbn: '9780061122415',
            description: 'Un clásico contemporáneo',
            price: 350,
            publicationDate: '1988-05-01',
            genre: 'dramatico'
        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;
        const res = await request(server).put(`/api/books/${id}`).send({});
        expect(res.status).toBe(400);
    });
    it("Retornar errores si el cuerpo esta incompleto", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'El Alquimista',
            author: 'Paulo Coelho',
            isbn: '0192384756',
            description: 'Un clásico contemporáneo',
            price: 350,
            publicationDate: '1988-05-01',
            genre: 'dramatico'
        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;
        const res = await request(server).put(`/api/books/${id}`).send({
            title: 'Fallen',
            author: 'Lauen Kate',
            isbn: '0192384756',
            description: 'Hisotria sobre la fuerza del amor'
        });
        expect(res.status).toBe(400);
    });
    it("Validar que el ID en la URL sea valido", async () => {
        const res = await request(server).put('/api/books/abc').send({
            title: 'El Alquimista',
            author: 'Paulo Coelho',
            isbn: '9780061122415',
            description: 'Un clásico contemporáneo',
            price: 350,
            publicationDate: '1988-05-01',
            genre: 'narrativo'
        });
        expect(res.status).toBe(400);
    });
    it("Retornar 404 si el libro no existe", async () => {
        const res = await request(server).put('/api/books/9999').send({
            title: 'Fallen',
            author: 'Lauen Kate',
            isbn: '9780385738934',
            description: 'Hisotria sobre la fuerza del amor',
            price: 500,
            publicationDate: '2009-12-08',
            genre: 'narrativo'
        });
        expect(res.status).toBe(404);
    });
    it("Retornar 400 si el ISBN del libro ya fue registrado", async () => {
        const createRes1 = await request(server).post('/api/books').send({
            title: 'Thunder',
            author: 'Lauen M.',
            isbn: '0385738935',
            description: 'Hisotria sobre la fuerza del amor',
            price: 400,
            publicationDate: '2012-04-08',
            genre: 'narrativo'
        });
        expect(createRes1.status).toBe(201);
        const createRes2 = await request(server).post('/api/books').send({
            title: 'La odisea',
            author: 'Homero',
            isbn: '6571420983',
            description: 'Hisotria sobre una aventura',
            price: 300,
            publicationDate: '1990-04-08',
            genre: 'narrativo'
        });
        expect(createRes2.status).toBe(201);
        const id = createRes2.body.data.id;
        const res = await request(server).put(`/api/books/${id}`).send({
            title: 'Thunder',
            author: 'Lauen M.',
            isbn: '0385738935',
            description: 'Hisotria sobre la fuerza del amor',
            price: 400,
            publicationDate: '2012-04-08',
            genre: 'narrativo'
        });
        expect(res.status).toBe(400);
    });
    it("Retornar 200 si el libro se actualiza correctamente", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'Cazadores de Sombras - Ciudad de Hueso',
            author: 'Cassandra Clare',
            isbn: '9781416914280',
            description: 'Primera parte de la saga',
            price: 450,
            publicationDate: '2007-03-27',
            genre: 'dramatico'
        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;
        const res = await request(server).put(`/api/books/${id}`).send({
            title: 'Cazadores de Sombras',
            author: 'Cassandra',
            isbn: '9781416914280',
            description: 'Primera parte de la saga',
            price: 400,
            publicationDate: '2007-03-27',
            genre: 'dramatico'
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.author).toBe('Cassandra');
    });
});
describe("PATCH /api/books/:id", () => {
    it("Validar el ID en la URL", async () => {
        const res = await request(server).patch("/api/books/abc");
        expect(res.status).toBe(400);
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).patch("/api/books/abc");
        expect(res.status).toBe(400);
    });
    it("Retornar 404 si el libro no existe", async () => {
        const res = await request(server).patch("/api/books/9999");
        expect(res.status).toBe(404);
    });
    it("Retornar 200 si se cambia correctamente la disponibilidad", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'Juego de Tronos',
            author: 'George R. R. Martin',
            isbn: '9780553103540',
            description: 'Primera parte de Canción de Hielo y Fuego',
            price: 900,
            publicationDate: '1996-08-06',
            genre: 'dramatico'
        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;

        const getRes = await request(server).get(`/api/books/${id}`);
        expect(getRes.status).toBe(200);
        expect(typeof getRes.body.data.available).toBe("boolean");
        const patchRes = getRes.body.data.available;

        const res = await request(server).patch(`/api/books/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.available).not.toBe(patchRes)
    });
    it("Verificar que available se alterna (true ↔ false)", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'Tormenta de fuego',
            author: 'Brandon Sanderson',
            isbn: '9780765326355',
            description: 'Fantasía épica',
            price: 800,
            publicationDate: '2010-08-31',
            genre: 'dramatico'

        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;
        const getRes = await request(server).get(`/api/books/${id}`);
        expect(getRes.status).toBe(200);
        console.log(getRes.body)
        expect(typeof getRes.body.data.available).toBe("boolean");
        const patchRes = getRes.body.data.available;

        const res = await request(server).patch(`/api/books/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data.available).not.toBe(patchRes);
    });
});
describe("DELETE /api/books/:id", () => {
    it("Validar el ID en la URL", async () => {
        const res = await request(server).delete("/api/books/abc");
        expect(res.status).toBe(400);
    });
    it("Retornar 400 si el ID no es valido", async () => {
        const res = await request(server).delete("/api/books/abc");
        expect(res.status).toBe(400);
    });
    it("Retornar 404 si el libro no existe", async () => {
        const res = await request(server).delete("/api/books/9999");
        expect(res.status).toBe(404);
    });
    it("Retornar 200 y un mensaje si se elimina correctamente", async () => {
        const createRes = await request(server).post('/api/books').send({
            title: 'El Alquimista',
            author: 'Paulo Coelho',
            isbn: '9780122415',
            description: 'Un clásico contemporáneo',
            price: 350,
            publicationDate: '1988-05-01',
            genre: 'dramatico'
        });
        expect(createRes.status).toBe(201);
        const id = createRes.body.data.id;
        const res = await request(server).delete(`/api/books/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});
describe("Pase de logs", () => {
    it("No se registra el libro", async () => {
        const req: any = {
            body:
            {
                title: 'Fallen',
                author: 'Lauen Kate',
                isbn: '9780385738934',
                description: 'Historia sobre la fuerza del amor',
                price: 500,
                publicationDate: '2009-12-08',
                genre: 'narrativo'
            }
        };
        const res: any = { json: jest.fn(), status: jest.fn(() => res) };
        jest.spyOn(Book, "findOne").mockResolvedValueOnce(null); 
        jest.spyOn(Book, "create").mockRejectedValueOnce(new Error("Error al registrar el libro"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await createBook(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al registrar el libro")
        );
        logSpy.mockRestore();
    });
    it("No debe mostrar los libros", async () => {
        const req: any = {};
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(Book, "findAll").mockRejectedValueOnce(new Error("Error al obtener los libros"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await getAllBooks(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al obtener los libros")
        );
        logSpy.mockRestore();
    });
    it("Falla al obtener el libro por ID", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(Book, "findByPk").mockRejectedValueOnce(new Error("Error al obtener el libro por ID"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await getBookById(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al obtener el libro por ID")
        );
        logSpy.mockRestore();
    });
    it("Falla la actualización del libro", async () => {
        const req: any = {
            params: { id: "1" },
            body:
            {
                title: 'Fallen',
                author: 'Lauen Kate',
                isbn: '9780385738934',
                description: 'Hisotria sobre la fuerza del amor',
                price: 500,
                publicationDate: '2009-12-08',
                genre: 'narrativo'
            }
        };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(Book, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar el libro"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await updateBook(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al actualizar el libro")
        );
        logSpy.mockRestore();
    });
    it("Falla al actualizar la disponibilidad", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(Book, "findByPk").mockRejectedValueOnce(new Error("Error al actualizar la disponibilidad del libro"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await updateAvailability(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al actualizar la disponibilidad del libro")
        );
        logSpy.mockRestore();
    });
    it("Falla al eliminar el libro", async () => {
        const req: any = { params: { id: "1" } };
        const res: any = { status: jest.fn(() => res), json: jest.fn() };
        jest.spyOn(Book, "findByPk").mockRejectedValueOnce(new Error("Error al eliminar el libro"));
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await deleteBook(req, res);
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al eliminar el libro")
        );
        logSpy.mockRestore();
    });
});