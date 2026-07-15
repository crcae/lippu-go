import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateShortLinkAction } from "../../actions";
import { LinkForm } from "../../link-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditLinkPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const link = await prisma.shortLink.findUnique({ where: { id } });
  if (!link) notFound();

  return (
    <main className="shell">
      <header className="header">
        <Link className="logo" href="/admin">
          <span className="logo-mark">L</span>
          <span>Editar link</span>
        </Link>
        <nav className="nav"><Link href="/admin">Volver</Link></nav>
      </header>
      <section className="card">
        <h1>Editar link</h1>
        <LinkForm action={updateShortLinkAction} link={link} />
      </section>
    </main>
  );
}
