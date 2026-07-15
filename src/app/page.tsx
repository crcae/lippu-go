import Link from "next/link";

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Lippu Go";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="header">
        <Link className="logo" href="/">
          <span className="logo-mark">L</span>
          <span>{brandName}</span>
        </Link>
        <nav className="nav">
          <a href="https://lippu.app" rel="noopener noreferrer">Lippu</a>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Links oficiales de Lippu.</h1>
        <p>
          Este subdominio se usa para compartir accesos cortos y confiables a eventos publicados en Lippu. Si recibiste un link de este dominio, confirma que el navegador muestre <strong>go.lippu.app</strong> antes de continuar.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Eventos</h2>
          <p className="help">Los enlaces dirigen a páginas oficiales de eventos y boletos de Lippu.</p>
        </div>
        <div className="card">
          <h2>Seguridad</h2>
          <p className="help">No pedimos contraseñas externas ni datos bancarios en este subdominio. Los pagos se procesan desde la plataforma oficial.</p>
        </div>
        <div className="card">
          <h2>Soporte</h2>
          <p className="help">Para dudas sobre boletos, entra directamente a lippu.app o contacta al organizador del evento.</p>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Lippu.</footer>
    </main>
  );
}
