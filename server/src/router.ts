import { Router } from 'express';
import { handleInputErrors } from './middleware';
import { body, param } from 'express-validator';
import { createBook, getAllBooks, getBookById, updateBook, updateAvailability, deleteBook } from './handlers/book';

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Book:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: El ID del libro
 *                      example: 1
 *                  title:
 *                      type: string
 *                      description: El titulo del libro
 *                      example: El origen del invierno
 *                  author:
 *                      type: string
 *                      description: Autor del libro
 *                      example: Laura Campos
 *                  isbn:
 *                      type: string
 *                      description: El ISBN unico del libro
 *                      example: 9798870808406
 *                  description:
 *                      type: string
 *                      description: Breve descripcion del libro
 *                      example: Fantasia e historia sobre dos personajes que inspiraron
 *                  price:
 *                      type: number
 *                      description: El precio del libro
 *                      example: 300
 *                  publicationDate:
 *                      type: string
 *                      format: date
 *                      description: Fecha de publicacion del libro
 *                      example: 2023-12-21
 *                  genre:
 *                      type: string
 *                      enum: ['narrativo', 'lirico', 'didactico', 'dramatico']
 *                      description: El genero literiro del libro
 *                      example: narrativo
 *                  availability:
 *                      type: boolean
 *                      description: Disponiblidad del libro
 *                      example: true
 */

router.get('/books', handleInputErrors, getAllBooks);
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtener una lista de todos los libros
 *     tags:
 *       - Books
 *     description: Retorna una lista de todos los libros registrados
 *     responses:
 *       200:
 *         description: Lista de Libros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Book"
 */

router.get('/books/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, getBookById
);
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags:
 *       - Books
 *     description: Retorna un libro específico por su ID
 *     parameters:
 *       - in: path 
 *         name: id
 *         description: ID del libro a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Book"
 *       400:
 *         description: Libro no encontrado
 *       404:
 *         description: Solicitud erronea
 */

router.post('/books',
    body('title')
        .notEmpty().withMessage('El nombre de titulo del libto es obligatorio')
        .isLength({ min: 3 }).withMessage('El titulo del libto  debe tener al menos 3 caracteres'),
    body('author')
        .notEmpty().withMessage('El nombre del autor es obligatorio'),
    body('isbn')
        .notEmpty().withMessage('El ISBN es obligatorio')
        .isLength({ min: 10 }).withMessage('El ISBN debe tener al menos 10 caracteres')
        .isLength({ max: 13 }).withMessage('El ISBN debe tener maximo 13 caracteres'),
    body('description')
        .notEmpty().withMessage('La descripcion del libro es obligatorio'),
    body('publicationDate')
        .notEmpty().withMessage('El correo electrónico es obligatorio'),
    body('genre')
        .notEmpty().withMessage('El genero del libro es obligatorio')
        .isIn(['narrativo', 'lirico', 'didactico', 'dramatico']).withMessage('El genero debe ser: "narrativo,lirico, didactico o dramatico"'),
    handleInputErrors, createBook
);
/**
 * @swagger
* /api/books:
*   post:
*     summary: Registrar un nuevo libro 
*     tags:
*       - Books
*     description: Registra un nuevo libro en el sistema
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 example: El origen del invierno
*               author:
*                 type: string
*                 example: Laura Campos
*               isbn:
*                 type: string
*                 example: 9798870808406
*               description:
*                 type: string
*                 example: Fantasia e historia sobre dos personajes que inspiraron
*               price:
*                 type: number
*                 example: 300
*               publicationDate:
*                 type: string
*                 format: date
*                 example: 2023-12-21
*               genre:
*                 type: string
*                 enum: ['narrativo', 'lirico', 'didactico', 'dramatico']
*                 example: narrativo
*     responses:
*       201:
*         description: Libro creado exitosamente
*       400:
*         description: Datos de entrada inválidos
*/

router.put('/books/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    body('title')
        .notEmpty().withMessage('El nombre de titulo del libto es obligatorio')
        .isLength({ min: 3 }).withMessage('El titulo del libto  debe tener al menos 3 caracteres'),
    body('author')
        .notEmpty().withMessage('El nombre del autor es obligatorio'),
    body('isbn')
        .notEmpty().withMessage('El ISBN es obligatorio')
        .isLength({ min: 10 }).withMessage('El ISBN debe tener al menos 10 caracteres')
        .isLength({ max: 13 }).withMessage('El ISBN debe tener maximo 13 caracteres'),
    body('description')
        .notEmpty().withMessage('La descripcion del libro es obligatorio'),
    body('publicationDate')
        .notEmpty().withMessage('El correo electrónico es obligatorio'),
    body('genre')
        .notEmpty().withMessage('El genero del libro es obligatorio')
        .isIn(['narrativo', 'lirico', 'didactico', 'dramatico']).withMessage('El genero debe ser: "narrativo,lirico, didactico o dramatico"'),
    handleInputErrors, updateBook
);
/**
* @swagger
* /api/books/{id}:
*   put:
*     summary: Actualizar datos de un libro
*     tags:
*       - Books
*     description: Actualiza la información de un libro existente
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del Libro a actualizar
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 example: El origen del invierno
*               author:
*                 type: string
*                 example: Laura Campos
*               isbn:
*                 type: string
*                 example: 9798870808406
*               description:
*                 type: string
*                 example: Fantasia e historia sobre dos personajes que inspiraron
*               price:
*                 type: number
*                 example: 300
*               publicationDate:
*                 type: string
*                 format: date
*                 example: 2023-12-21
*               genre:
*                 type: string
*                 enum: ['narrativo', 'lirico', 'didactico', 'dramatico']
*                 example: narrativo
*     responses:
*       200:
*         description: Usuario actualizado exitosamente
*       400:
*         description: Datos de entrada inválidos
*       404:
*         description: Usuario no encontrado
*/

router.patch('/books/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, updateAvailability
);
/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Actualizar la disponibilidad de un libro
 *     tags:
 *       - Books
 *     description: Cambia el estado activo/inactivo de un libro
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del libro a actualizar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponiblidad del libro actualizado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Libro no encontrado
 */

router.delete('/books/:id',
    param('id')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isNumeric().withMessage('El ID debe ser un número')
        .custom(value => value > 0).withMessage('El ID debe ser mayor que 0'),
    handleInputErrors, deleteBook
);
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags:
 *       - Books
 *     description: Elimina un libro existente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del libro a eliminar
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       400:
 *         description: El ID proporcionado es inválido 
 *       404:
 *         description: Libro no encontrado
 */
export default router;