import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "./auth-actions";
import { deleteShortLinkAction, toggleShortLinkAction } from "./actions";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://go.lippu.app";

function publicUrl(slug: string) {
  return `${appUrl.replace(/\/$/, "")}/${slug}`;
}

export default async function AdminPage() {
  await requireAdmin();
  const links = await prisma.shortLink.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="shell">
      <header className="header">
        <Link className="logo" href="/admin">
          <span className="logo-mark">L</span>
          <span>Lippu Go Admin</span>
        </Link>
        <nav className="nav">
          <Link href="/admin/new">Nuevo link</Link>
          <form action={logoutAction}><button type="submit">Salir</button></form>
        </nav>
      </header>

      <section className="card">
        <h1>Links cortos</h1>
        <p className="help">Usa un solo dominio estable y slugs legibles. Recomendado: modo LANDING para campañas de WhatsApp o eventos nuevos.</p>
      </section>

      <div style={{ height: 18 }} />

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Link</th>
              <th>Destino</th>
              <th>Modo</th>
              <th>Status</th>
              <th>Métricas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td>
                  <strong>{link.title}</strong><br />
                  <a className="help" href={`/${link.slug}`} target="_blank" rel="noopener noreferrer">{publicUrl(link.slug)}</a>
                </td>
                <td className="help" style={{ maxWidth: 320, wordBreak: "break-word" }}>{link.targetUrl}</td>
                <td><span className="badge">{link.mode}</span></td>
                <td><span className={`badge ${link.active ? "green" : "red"}`}>{link.active ? "Activo" : "Inactivo"}</span></td>
                <td className="help">Vistas: {link.views}<br />Clicks: {link.outClicks}</td>
                <td>
                  <div className="row-actions">
                    <Link className="btn secondary" href={`/admin/${link.id}/edit`}>Editar</Link>
                    <form action={toggleShortLinkAction}>
                      <input type="hidden" name="id" value={link.id} />
                      <button className="btn warning" type="submit">{link.active ? "Desactivar" : "Activar"}</button>
                    </form>
                    <form action={deleteShortLinkAction}>
                      <input type="hidden" name="id" value={link.id} />
                      <button className="btn danger" type="submit">Borrar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {links.length === 0 ? (
              <tr><td colSpan={6}>Todavía no hay links. Crea el primero.</td></tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </main>
  );
}
