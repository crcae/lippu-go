import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <section className="hero">
        <h1>Link no encontrado</h1>
        <p>Este enlace no existe, fue desactivado o cambió de ubicación.</p>
        <Link className="btn" href="/">Ir al inicio</Link>
      </section>
    </main>
  );
}
