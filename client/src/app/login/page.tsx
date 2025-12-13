"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();

                // ¡AQUÍ ESTÁ LA MAGIA!
                // Guardamos el token y el usuario en el navegador
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirigimos al inicio
                router.push("/");
            } else {
                const data = await res.json();
                setError(data.message || "Credenciales incorrectas");
            }
        } catch (err) {
            setError("Error de conexión");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-1">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="******"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-gray-400 mt-4 text-center text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link href="/register" className="text-green-400 hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}