import Image from "next/image";

export default function Dashboard() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            {/* 
        1. min-h-screen: la altura ocupa la pantalla completa
        2. flex items-center justify-center: centrado vertical y horizontal
        3. px-4: un pequeño padding horizontal para pantallas muy pequeñas
      */}

            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                {/* Encabezado */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
                </div>

                {/* Formulario */}
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Olvidé mi contraseña
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition-colors"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    ¿No tiene una cuenta?{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Registrarse
                    </a>
                </p>
            </div>
        </main>
    );
}
