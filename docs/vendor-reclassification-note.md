# Nota para reclasificación ante vendors

Cuando pidas que bajen `lippu.app` de phishing/malicious, puedes agregar que eliminaste o sustituiste el patrón de subdominios dinámicos por evento y ahora usas un único shortener oficial:

```txt
go.lippu.app/[slug-legible]
```

Texto sugerido:

```txt
Hello,

We have updated our event sharing system to reduce false-positive risk. Instead of dynamic event subdomains or tokenized short URLs, Lippu now uses one official shortlink domain: https://go.lippu.app/ with human-readable event slugs.

Shortlinks either show an official Lippu landing page or redirect directly to authorized Lippu domains only. The system does not impersonate any third party and does not collect external credentials.

Please reanalyze lippu.app and remove the phishing/malicious classification.
```
