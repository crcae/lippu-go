import type { ShortLink } from "@prisma/client";

export function LinkForm({
  action,
  link,
}: {
  action: (formData: FormData) => Promise<void>;
  link?: ShortLink;
}) {
  const localEventDate = link?.eventDate ? new Date(link.eventDate).toISOString().slice(0, 16) : "";

  return (
    <form className="form" action={action}>
      {link ? <input type="hidden" name="id" value={link.id} /> : null}

      <div className="field">
        <label htmlFor="title">Título del evento/link</label>
        <input id="title" name="title" defaultValue={link?.title || ""} placeholder="Noche Tributo al Heavy Metal" required />
      </div>

      <div className="field">
        <label htmlFor="slug">Slug público</label>
        <input id="slug" name="slug" defaultValue={link?.slug || ""} placeholder="noche-heavy" required />
        <span className="help">Se verá como: go.lippu.app/noche-heavy. Evita IDs largos o random.</span>
      </div>

      <div className="field">
        <label htmlFor="targetUrl">URL destino</label>
        <input id="targetUrl" name="targetUrl" defaultValue={link?.targetUrl || ""} placeholder="https://lippu.app/eventwa/..." required />
        <span className="help">Por seguridad, el dominio debe estar permitido en ALLOWED_TARGET_HOSTS.</span>
      </div>

      <div className="field">
        <label htmlFor="mode">Modo</label>
        <select id="mode" name="mode" defaultValue={link?.mode || "LANDING"}>
          <option value="LANDING">LANDING: página oficial intermedia</option>
          <option value="REDIRECT">REDIRECT: redirección directa</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="description">Descripción corta</label>
        <textarea id="description" name="description" defaultValue={link?.description || ""} placeholder="Accede a boletos oficiales para este evento." />
      </div>

      <div className="grid">
        <div className="field">
          <label htmlFor="venue">Lugar</label>
          <input id="venue" name="venue" defaultValue={link?.venue || ""} placeholder="Beat 803" />
        </div>
        <div className="field">
          <label htmlFor="eventDate">Fecha del evento</label>
          <input id="eventDate" name="eventDate" type="datetime-local" defaultValue={localEventDate} />
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" name="active" defaultChecked={link?.active ?? true} style={{ width: "auto" }} />
        Activo
      </label>

      <button className="btn" type="submit">Guardar</button>
    </form>
  );
}
