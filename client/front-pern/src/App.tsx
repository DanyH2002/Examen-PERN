import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <header className="bg-orange-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-amber-200">
            Biblioteca 🍂
          </Link>

          <nav className="flex space-x-4">
            <Link
              to="/books"
              className="hover:bg-orange-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Lista de Libros
            </Link>
            <Link
              to="/books/create"
              className="hover:bg-orange-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Agregar Libro
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />

        {isHome && (
          <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-bold text-brown-800 mb-4">
                Bienvenido a tu biblioteca
              </h1>
              <p className="text-brown-700 text-lg mb-6">
                Este sistema de biblioteca permite registrar, visualizar y administrar libros de forma sencilla y elegante. Ideal para proyectos educativos, colecciones personales o como base para sistemas más complejos. Cada libro incluye detalles como autor, ISBN, género, fecha de publicación y disponibilidad. El diseño está inspirado en los colores del otoño 🍁, ofreciendo una experiencia visual cálida y acogedora.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/books"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500"
                >
                  Ver libros
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://img.freepik.com/fotos-premium/libro-hojas-otono_308079-2830.jpg"
                alt="Biblioteca 📚🍁"
                className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
