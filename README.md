# 📚 Proyecto PERN

Este proyecto es una aplicación web construida con el stack **PERN (PostgreSQL, Express, React y Node.js)**.  
Permite la gestión de libros a través de un backend con API RESTful y un frontend en React, conectado a una base de datos PostgreSQL alojada en **Render**.

---

## ✨ Características principales

- CRUD completo de libros (crear, leer, actualizar, eliminar)
- Cambio de disponibilidad con PATCH
- API documentada con Swagger
- Frontend estilizado con TailwindCSS
- Pruebas unitarias y de integración con Jest + Supertest
- Deploy en Render con PostgreSQL

---

## 🚀 Tecnologías utilizadas

| Tecnología | Descripción |
|------------|-------------|
| PostgreSQL | Base de datos relacional |
| Express.js | Framework para construir APIs RESTful |
| React + Vite | Interfaz de usuario rápida y moderna |
| Node.js v21 | Entorno de ejecución del backend |
| Sequelize + Typescript | ORM para modelado y tipado de datos |
| Swagger | Documentación interactiva de la API |
| Jest + Supertest | Pruebas y cobertura del backend |
| Axios | Cliente HTTP para comunicación frontend-backend |
| TailwindCSS | Estilos utilitarios para el frontend |

---

## 📋 Requisitos previos

- Node.js v21+
- PostgreSQL instalado o acceso a una instancia remota
- Cuenta en Render (opcional para deploy)
- Git

---

## 📂 Estructura del repositorio

```
Examen-PERN/
├── client/          # Frontend en React + Vite
├── server/          # Backend en Node.js + Express
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/DanyH2002/Examen-PERN.git
cd Examen-PERN
```

### 2. Configurar variables de entorno

**Backend (`server/.env`):**
```env
PORT=4000
DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<db>?ssl=true
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Instalar dependencias

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 4. Ejecutar el proyecto

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

Abre el navegador en: 👉 **http://localhost:5173** (o el puerto que indique Vite)

---

## 📬 Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/books` | Obtener todos los libros |
| GET | `/books/:id` | Obtener información de un libro |
| POST | `/books` | Añadir un nuevo libro |
| PUT | `/books/:id` | Actualizar información de un libro |
| DELETE | `/books/:id` | Eliminar un libro |
| PATCH | `/books/:id` | Cambiar disponibilidad de un libro |

> La documentación completa está disponible en Swagger en la ruta `/api-docs`

---

## 🧪 Pruebas y coverage

**Ejecutar pruebas:**
```bash
npm test
```

**Ejecutar pruebas con cobertura:**
```bash
npm run test:coverage
```

---

## ✨ Funcionalidades del frontend

- Formularios para crear y editar libros
- Listado de libros existentes
- Manejo de estado con useState y useEffect
- Comunicación con el backend mediante axios

---

## 👩‍💻 Autor

**Hulda Daniela Crisanto Luna**  
📧 [danielacrisantoluna@gmail.com](mailto:danielacrisantoluna@gmail.com)  
🔗 [GitHub](https://github.com/DanyH2002)

