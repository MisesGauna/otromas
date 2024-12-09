import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, logout, user, isAdmin, isRoot } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del menú

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Inicio</Link>
      </h1>

      {/* Botón hamburguesa, visible solo en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      {/* Menú: Se oculta en pantallas pequeñas y se muestra solo si isOpen es true */}
      <ul
        className={`flex gap-x-2 md:flex ${isOpen ? "flex-col md:flex-row" : "hidden md:flex"}`}
      >
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.username}
            </li>
            {isAdmin && (
              <li>
                <ButtonLink to="/add-task" className=" gap-x-2" >Cargar Sumario</ButtonLink>
              </li>
            )}
            <li>
              <ButtonLink to="/tasks">Ver Sumarios</ButtonLink>
            </li>
            {isRoot && (
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            )
            }

            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>

          </>
        ) : (
          <>


          </>
        )}
      </ul>
    </nav>
  );
}
