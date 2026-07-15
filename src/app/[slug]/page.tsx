import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { displayHostname } from "@/lib/target-url";
import { logView, logOutClick } from "@/lib/analytics";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const link = await prisma.shortLink.findUnique({ where: { slug } });
  if (!link || !link.active) {
    return { title: "Link no encontrado", robots: { index: false, follow: false } };
  }
  return {
    title: `${link.title} | Lippu`,
    description: link.description || "Link oficial de Lippu para evento.",
    robots: { index: false, follow: true },
  };
}

function formatDate(value: Date | null): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "long", timeStyle: "short" }).format(value);
}

export default async function ShortLinkPage({ params }: Props) {
  const { slug } = await params;
  const link = await prisma.shortLink.findUnique({ where: { slug } });
  if (!link || !link.active) notFound();

  await logView(link.id);

  if (link.mode === "REDIRECT") {
    await logOutClick(link.id);
    redirect(link.targetUrl);
  }

  const eventDate = formatDate(link.eventDate);
  const hostname = displayHostname(link.targetUrl);

  return (
    <main className="shell">
      <header className="header">
        <Link className="logo" href="/">
          <span className="logo-mark">L</span>
          <span>Lippu</span>
        </Link>
        <nav className="nav">
          <a href="https://lippu.app" rel="noopener noreferrer">Sitio oficial</a>
        </nav>
      </header>

      <section className="card event-preview">
        <span className="badge green">Link oficial</span>
        <h1 className="event-title">{link.title}</h1>
        {link.description ? <p>{link.description}</p> : null}
        <div className="event-meta">
          {eventDate ? <span>📅 {eventDate}</span> : null}
          {link.venue ? <span>📍 {link.venue}</span> : null}
          <span>🔗 Destino: {hostname}</span>
        </div>
        <a className="btn" href={`/out/${encodeURIComponent(link.slug)}`} rel="noopener noreferrer">
          Ver evento en Lippu
        </a>
        <p className="secure-note">
          Este enlace pertenece a Lippu. Antes de comprar o ingresar datos, revisa que la página final sea de <span className="code">lippu.app</span> o un dominio oficial autorizado por Lippu.
        </p>
      </section>
    </main>
  );
}
