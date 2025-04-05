"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ onLogin }: { onLogin: () => void }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-50 shadow-sm sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">RealState AI</h1>
      <nav className="hidden md:flex gap-6 text-sm">
        <Link href="#about" className="hover:text-blue-600">Sobre</Link>
        <Link href="#features" className="hover:text-blue-600">Soluciones</Link>
        <Link href="#faq" className="hover:text-blue-600">FAQ</Link>
        <button onClick={onLogin} className="text-blue-600 font-medium hover:underline">Iniciar sesión</button>
      </nav>
    </header>
  );
}
