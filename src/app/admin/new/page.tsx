import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createShortLinkAction } from "../actions";
import { LinkForm } from "../link-form";

export default async function NewLinkPage() {
  await requireAdmin();
  return (
    <main className="shell">
      <header className="header">
        <Link className="logo" href="/admin">
          <span className="logo-mark">L</span>
          <span>Nuevo link</span>
        </Link>
        <nav className="nav"><Link href="/admin">Volver</Link></nav>
      </header>
      <section className="card">
        <h1>Crear link corto</h1>
        <LinkForm action={createShortLinkAction} />
      </section>
    </main>
  );
}
