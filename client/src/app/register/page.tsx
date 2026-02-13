"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState(""); // Solo guardamos el error, nada más.

   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        
        const formData = new FormData(e.currentTarget);

        // Convertimos los datos a un objeto simple JSON: { name: "...", email: "...", password: "..." }
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data), // Enviamos el objeto creado arriba
            });

            if (res.ok) {
                router.push("/login");
            } else {
                const responseData = await res.json();
                setError(responseData.message || "Error al registrarse");
            }
        } catch (err) {
            setError("Error de conexión");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Crear Cuenta</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                {/* El form maneja todo. No tocamos los inputs individualmente. */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Nombre</label>
                        <input
                            name="name" 
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="******"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="text-gray-400 mt-4 text-center text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
