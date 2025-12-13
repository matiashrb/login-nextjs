"use client"; // Necesario para usar localStorage y hooks

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Al cargar la página, buscamos si hay usuario guardado
  useEffect(() => {
    const userStored = localStorage.getItem("user");
    if (userStored) {
      setUser(JSON.parse(userStored));
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.refresh(); // Recargamos para limpiar todo
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">

      {/* CONDICIONAL: ¿Existe el usuario? */}
      {user ? (
        // SI ESTÁ LOGUEADO:
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-green-400">
            ¡Hola, {user.name}! 👋
          </h1>
          <p className="text-xl mb-8">Has iniciado sesión correctamente.</p>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        // NO ESTÁ LOGUEADO:
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8">
            Sistema de Auth
          </h1>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Registrarse
            </Link>
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}

    </main>
  );
}