# Warm editorial landing — Astro + Tailwind implementation

Port `design/landing-cloud-local/02-warm-editorial.html` (chosen artboard) to the real stack in
`D:/landing_cloud_local` (Astro 7 + Tailwind v4). The artboard is the visual spec; tokens come from
`design/system.md` (already mirrored in `src/styles/global.css`). Do not copy the artboard HTML
verbatim: map to Astro components; the app-replica demo may carry over its internals because it
replicates the real CloudLocal UI.

## Specs

- S1: "Implement it in the project's real stack. Use the artboard as the visual spec: map its parts to the project's existing components and styles, and do not copy the artboard HTML verbatim."
- S2: "Take colors, typography, spacing, radius and shadows from design/system.md, the project's token source."
- S3: Header reduced to "solo el download y stars de github" + wordmark; content aligned with the same centered max-width as the footer ("y que este mas centrado el contendio aplica eso igual para el navbar top").
- S4: Centered hero: "dejar un buen título al medio con un subtítulo y botón de descarga" + GitHub link with icons; no eyebrow/badges/testimonial.
- S5: Hero flanked by TWO large animated ASCII silhouettes (cloud, local server) — "la idea es que sean distintos... con la card con un efecto como flotando", aqua/teal family, dense "+" texture, assemble/float motion; decorative only: aria-hidden, static single shape under prefers-reduced-motion, hidden below 900px.
- S6: "The pixel-faithful, navigable replica of the real CloudLocal UI stays as the centerpiece (rail navigation across Archivos/Recientes/Papelera/Configuración, breadcrumb, type chips, grid with 'Añadido recientemente' strip, selection bar, working trash with restore/empty, notice bar, settings cards spanning the full content width, and a light/dark theme switch that recolors the replica) using fictional Spanish data, and the actual cloud logo." No fake "Subiendo…" row ("no incluir una fila de carga ficticia persistente").
- S7: Sections follow the t3.codes-style open composition (no card grids): story preview + copy with check bullets, centered open-source section, CTA. Spanish CTA headline: "Tus archivos en tu casa." (EN: "Bring your files home.").
- S8: Footer: "© 2026 - Creado con ❤️ por AlexsibDev" where AlexsibDev links to https://alexsibdev.netlify.app/.
- S9: "estraduccion ingles español a la pagina y segun de donde sea el que entre este en español o ingles" — ES/EN translation with automatic initial language from browser preference plus a manual selector in the header; the app demo keeps its Spanish UI.
- S10: Language of artifacts: page copy is bilingual as above; code/comments in English.

## Tasks

- T1 (S2, S10): Global styles — tokens, fonts, base type scale + display headline; Layout.astro (lang handling, meta). Commit C1.
- T2 (S3, S8): Header.astro + Footer.astro components (lang select, Download link, stars pill; centered content width; credit link). Commit C1.
- T3 (S4, S5): Hero.astro + ascii-tiles client script (two silhouettes, float, reduced-motion, <900px hidden). Commit C2.
- T4 (S6): AppDemo.astro — port replica markup/styles/JS as component + bundled client script; theme switch, trash, selection, search, views. Commit C3.
- T5 (S7): Story.astro, OpenSource.astro, Cta.astro. Commit C4.
- T6 (S9): i18n client script — auto-detect + header selector; demo stays Spanish. Commit C4.
- T7 (S1, S2): Verify — `npm run build`, preview server, Playwright: ES/EN auto+manual, reduced motion, demo interactions, no console errors; then handoff "implemented" with previewUrl. Commit C5 (fixes if any).

## Log

- L1: "Implement the design artboard design/landing-cloud-local/02-warm-editorial.html … Implement it in the project's real stack. Use the artboard as the visual spec: map its parts to the project's existing components and styles, and do not copy the artboard HTML verbatim. Take colors, typography, spacing, radius and shadows from design/system.md … Report progress with the gentle_design tool … status 'implemented' when it is done, with previewUrl set to the running app's loopback URL … This handoff itself commits nothing."
- L2: Iteration history of the artboard (from canvas comments, all resolved): 02 Warm editorial iterated to centered hero + GitHub stars pill header; four dot tiles → two large dense ASCII silhouettes (cloud, server) with aqua blooms; sections → open composition without card grids ("muchas cards es como ia"); footer credit "© 2026 - Creado con ❤️ por AlexsibDev" → https://alexsibdev.netlify.app/; "Tus archivos en tu casa."; ES/EN i18n with auto-detect; header/footer content centered to the same width.
- L3: Branch: `feat/warm-editorial-landing` (created from `main` before C1). Designs remain git-excluded by user decision; this repo holds only the implementation.
