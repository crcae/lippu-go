import { loginAction } from "../auth-actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main className="shell">
      <section className="hero" style={{ maxWidth: 520 }}>
        <h1>Admin</h1>
        <p>Ingresa la contraseña para administrar links cortos.</p>
        {params.error ? <div className="error">Contraseña incorrecta.</div> : null}
        <form className="form" action={loginAction}>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" required autoFocus />
          </div>
          <button className="btn" type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}
