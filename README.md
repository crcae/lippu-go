# Lippu Go Shortener

Un shortener oficial para Lippu con admin privado. La idea es usar **un solo subdominio estable** (`go.lippu.app`) y links legibles tipo:

```txt
https://go.lippu.app/noche-heavy
```

que pueden mandar a tu URL actual:

```txt
https://lippu.app/eventwa/noche-tributo-al-heavy-metal-en-espanol-beat-803-1784076929249x797319466386980900
```

Incluye:

- Admin en `/admin` con contraseña.
- Crear, editar, activar/desactivar y borrar links.
- Modo `LANDING`: muestra una página oficial intermedia con logo, evento y botón.
- Modo `REDIRECT`: redirecciona directo.
- Métricas básicas: visitas y clicks de salida.
- Restricción de destinos permitidos para evitar abuso y mejorar reputación.
- Página home oficial de `go.lippu.app` para que el subdominio no parezca infraestructura fantasma.

## 1. Instalar local

```bash
npm install
cp .env.example .env
```

Edita `.env` con:

```txt
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="una-contrasena-segura"
AUTH_SECRET="un-secreto-largo-random"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ALLOWED_TARGET_HOSTS="lippu.app,eventos.lippu.app,www.lippu.app"
```

Para generar `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 2. Base de datos

Crea una base PostgreSQL en Supabase, Neon, Vercel Postgres o cualquier Postgres.

Después corre:

```bash
npx prisma generate
npx prisma migrate dev
```

## 3. Correr local

```bash
npm run dev
```

Abre:

```txt
http://localhost:3000/admin
```

## 4. Crear un link

Entra a `/admin`, crea un link con:

```txt
Slug: noche-heavy
Título: Noche Tributo al Heavy Metal en Español
URL destino: https://lippu.app/eventwa/noche-tributo-al-heavy-metal-en-espanol-beat-803-1784076929249x797319466386980900
Modo: LANDING
```

El link público será:

```txt
https://go.lippu.app/noche-heavy
```

## 5. Deploy en Vercel

1. Sube este repo a GitHub.
2. Crea un proyecto nuevo en Vercel.
3. Configura variables de entorno en Vercel:

```txt
DATABASE_URL
ADMIN_PASSWORD
AUTH_SECRET
NEXT_PUBLIC_APP_URL=https://go.lippu.app
NEXT_PUBLIC_BRAND_NAME=Lippu Go
ALLOWED_TARGET_HOSTS=lippu.app,eventos.lippu.app,www.lippu.app
```

4. En Vercel, corre la migración en una terminal/local apuntando a producción:

```bash
npx prisma migrate deploy
```

5. Agrega el dominio:

```txt
go.lippu.app
```

## 6. DNS en GoDaddy

En el DNS de `lippu.app`, crea:

```txt
Type: CNAME
Name: go
Value: cname.vercel-dns.com
TTL: 1 hour
```

Luego valida el dominio en Vercel.

## 7. Recomendación anti-falso positivo

Para reducir riesgo de que lo marquen como phishing:

- Usa solo `go.lippu.app`, no subdominios por evento.
- Prefiere modo `LANDING` para eventos nuevos o campañas por WhatsApp.
- Usa slugs humanos: `/noche-heavy`, `/exfr2026`, `/tedx-up`.
- Evita slugs random tipo `/1784076929249x797...`.
- Evita cadenas de redirecciones.
- Mantén `ALLOWED_TARGET_HOSTS` limitado a dominios de Lippu.
- Ten visibles en `lippu.app` políticas, aviso de privacidad, términos, soporte y razón social.

## 8. Estructura

```txt
src/app/page.tsx              Home oficial del shortener
src/app/[slug]/page.tsx       Link público / landing / redirect
src/app/out/[slug]/route.ts   Salida desde landing al destino
src/app/admin                 Panel admin
src/lib                       Auth, Prisma, validaciones
prisma/schema.prisma          Modelos de base de datos
```
