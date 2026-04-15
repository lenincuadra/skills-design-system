// =============================================================
// tokens.js — Agencia Rosa Design System
// Fuente única de verdad para tokens, componentes y tipografía.
// Importar ANTES de Tailwind CDN en cada HTML:
//   <script src="./tokens.js"></script>
//   <script src="https://cdn.tailwindcss.com"></script>
// =============================================================


// ── CAPA 1: Tailwind config ───────────────────────────────────
// Define los tokens como clases utilitarias de Tailwind.
// Ej: bg-primary, text-ink-muted, font-display, shadow-card
//
// IMPORTANTE: tokens.js carga ANTES del CDN de Tailwind, por eso
// usamos window.tailwind = window.tailwind || {} en lugar de
// tailwind.config = {} directamente (tailwind no existe aún).
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#d4693f', light: '#e08f6f', dark: '#b0502a' },
        secondary: { DEFAULT: '#d8dca6', light: '#eaeccc', dark: '#b8be7c' },
        accent:    { DEFAULT: '#cdb8dc', light: '#e2d6ed', dark: '#a88fc0' },
        gold:      { DEFAULT: '#c9a265', light: '#dfc08e', dark: '#a07e42' },
        surface:   { DEFAULT: '#f7f2ea', dark: '#ede5d8' },
        ink:       { DEFAULT: '#1c1917', muted: '#6b6560', subtle: '#a09890' },
      },
      fontFamily: {
        display: ['"Domine"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.4' }],
        'sm':   ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem',     { lineHeight: '1.6' }],
        'lg':   ['1.125rem', { lineHeight: '1.55' }],
        'xl':   ['1.25rem',  { lineHeight: '1.5' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.4' }],
        '3xl':  ['2rem',     { lineHeight: '1.25' }],
        '4xl':  ['2.5rem',   { lineHeight: '1.15' }],
        '5xl':  ['3.5rem',   { lineHeight: '1.05' }],
        '6xl':  ['4.5rem',   { lineHeight: '1' }],
      },
      borderRadius: {
        'sm': '0.25rem', DEFAULT: '0.5rem', 'md': '0.625rem',
        'lg': '0.875rem', 'xl': '1.25rem', '2xl': '1.75rem', 'full': '9999px',
      },
      boxShadow: {
        'soft': '0 2px 12px 0 rgba(28,25,23,0.07)',
        'card': '0 4px 24px 0 rgba(28,25,23,0.09)',
      },
    },
  },
};


// ── CAPA 2: Google Fonts + CSS variables ──────────────────────
// Carga las fuentes e inyecta las variables en :root para
// usarlas en CSS puro (var(--color-primary), etc.)

(function () {
  // Google Fonts — una sola carga aunque se importe tokens.js varias veces
  if (!document.querySelector('[data-ds-fonts]')) {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = '';
    document.head.appendChild(preconnect2);

    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.setAttribute('data-ds-fonts', '');
    fonts.href = 'https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap';
    document.head.appendChild(fonts);
  }

  // CSS variables — sincronizadas con la Capa 1
  const vars = document.createElement('style');
  vars.setAttribute('data-ds-vars', '');
  vars.textContent = `
    :root {
      /* Colores */
      --color-primary:         #d4693f;
      --color-primary-light:   #e08f6f;
      --color-primary-dark:    #b0502a;
      --color-secondary:       #d8dca6;
      --color-secondary-light: #eaeccc;
      --color-secondary-dark:  #b8be7c;
      --color-accent:          #cdb8dc;
      --color-accent-dark:     #a88fc0;
      --color-gold:            #c9a265;
      --color-gold-dark:       #a07e42;
      --color-surface:         #f7f2ea;
      --color-surface-dark:    #ede5d8;
      --color-ink:             #1c1917;
      --color-ink-muted:       #6b6560;
      --color-ink-subtle:      #a09890;

      /* Tipografía */
      --font-display: 'Domine', Georgia, serif;
      --font-sans:    'DM Sans', system-ui, sans-serif;

      /* Radio por defecto de componentes */
      --radius-btn:   16px;
      --radius-card:  0.875rem;
      --radius-input: 0.5rem;
      --radius-badge: 9999px;

      /* Sombras */
      --shadow-soft: 0 2px 12px 0 rgba(28,25,23,0.07);
      --shadow-card: 0 4px 24px 0 rgba(28,25,23,0.09);

      /* Transición global */
      --transition: all 0.2s ease;
    }

    /* Reset base */
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: var(--font-sans); background: var(--color-surface); color: var(--color-ink); }
    a { transition: var(--transition); }
  `;
  document.head.appendChild(vars);
})();


// ── CAPA 3: Componentes CSS ───────────────────────────────────
// Clases reutilizables por nombre. Cambiar una propiedad acá
// la propaga a TODAS las páginas que importen tokens.js.
// IMPORTANTE: CSS puro con var(), nunca @apply (no funciona en estilos inyectados).

(function () {
  const css = document.createElement('style');
  css.setAttribute('data-ds-components', '');
  css.textContent = `

  /* ══════════════════════════════════════════════════════════
     BOTONES
     Uso: <button class="btn-primary">Texto</button>
     Ícono binario: <button class="btn-primary" data-icon="→">Texto</button>
  ══════════════════════════════════════════════════════════ */

  .btn-primary, .btn-secondary, .btn-outline, .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 300;
    letter-spacing: 0.01em;
    border-radius: var(--radius-btn);
    padding: 0.625rem 1.75rem;
    cursor: pointer;
    transition: var(--transition);
    border: 1px solid transparent;
    text-decoration: none;
    white-space: nowrap;
  }
  .btn-primary            { background: var(--color-primary);   color: #fff; }
  .btn-primary:hover      { background: var(--color-primary-dark); }
  .btn-primary:disabled   { opacity: 0.45; cursor: not-allowed; }

  .btn-secondary          { background: var(--color-secondary); color: var(--color-ink); }
  .btn-secondary:hover    { background: var(--color-secondary-dark); }
  .btn-secondary:disabled { opacity: 0.45; cursor: not-allowed; }

  .btn-outline            { background: transparent; border-color: var(--color-ink); color: var(--color-ink); }
  .btn-outline:hover      { border-color: var(--color-primary); color: var(--color-primary); }
  .btn-outline:disabled   { opacity: 0.45; cursor: not-allowed; }

  .btn-ghost              { background: transparent; border-color: transparent;
                            color: var(--color-ink-muted); text-decoration: underline;
                            text-underline-offset: 4px; padding-left: 0.25rem; padding-right: 0.25rem; }
  .btn-ghost:hover        { color: var(--color-primary); }

  /* Modificadores de tamaño — combinar con variante: class="btn-primary btn-sm" */
  .btn-sm { font-size: 0.75rem;  padding: 0.375rem 1rem; }
  .btn-lg { font-size: 1rem;     padding: 0.875rem 2.25rem; }

  /* Ícono binario via data-icon="→" — presencia/ausencia controlada desde el HTML
     Usamos [class*="btn-"] (contains) en lugar de [class^="btn-"] (starts-with)
     porque el atributo class puede empezar con otra clase (ej: "hidden lg:flex btn-outline") */
  [class*="btn-"][data-icon]::after {
    content: attr(data-icon);
    margin-left: 0.375rem;
    font-size: 0.85em;
    line-height: 1;
    transition: transform 0.2s ease;
  }
  [class*="btn-"][data-icon]:hover::after { transform: translate(2px, -2px); }

  /* Estado loading — spinner inline */
  .btn-loading { position: relative; color: transparent !important; pointer-events: none; }
  .btn-loading::before {
    content: '';
    position: absolute;
    width: 1rem; height: 1rem;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;
  }
  .btn-primary.btn-loading::before, .btn-secondary.btn-loading::before { border-top-color: #fff; }
  .btn-outline.btn-loading::before, .btn-ghost.btn-loading::before { border-top-color: var(--color-primary); border-color: rgba(0,0,0,0.15); }
  @keyframes btn-spin { to { transform: rotate(360deg); } }


  /* ══════════════════════════════════════════════════════════
     INPUTS
     Uso: <input class="input-base" />
          <input class="input-base input-error" />
  ══════════════════════════════════════════════════════════ */

  .input-base {
    width: 100%;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-ink);
    background: var(--color-surface);
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-input);
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    -webkit-appearance: none;
  }
  .input-base::placeholder { color: var(--color-ink-subtle); }
  .input-base:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(212,105,63,0.12);
  }
  .input-error {
    border-color: #f87171 !important;
    box-shadow: 0 0 0 3px rgba(248,113,113,0.12) !important;
  }
  .input-base:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--color-surface-dark);
  }

  /* Label estándar */
  .input-label {
    display: block;
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-ink-subtle);
    margin-bottom: 0.375rem;
  }
  .input-hint  { font-family: var(--font-sans); font-size: 0.75rem; color: var(--color-ink-subtle); margin-top: 0.25rem; }
  .input-error-msg { font-family: var(--font-sans); font-size: 0.75rem; color: #ef4444; margin-top: 0.25rem; }


  /* ══════════════════════════════════════════════════════════
     CARDS
     Uso: <div class="card">...</div>
  ══════════════════════════════════════════════════════════ */

  .card {
    background: #fff;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-soft);
    padding: 1.5rem;
  }
  .card-image {
    background: #fff;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
  }
  .card-elevated {
    background: #fff;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    overflow: hidden;
  }
  .card-flat {
    background: var(--color-surface-dark);
    border-radius: var(--radius-card);
    padding: 1.5rem;
  }


  /* ══════════════════════════════════════════════════════════
     BADGES
     Uso: <span class="badge badge-primary">Branding</span>
  ══════════════════════════════════════════════════════════ */

  .badge {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    border-radius: var(--radius-badge);
    padding: 0.2rem 0.7rem;
    white-space: nowrap;
  }
  .badge-primary   { color: var(--color-primary);      background: rgba(212,105,63,0.10); }
  .badge-secondary { color: var(--color-secondary-dark); background: rgba(216,220,166,0.45); }
  .badge-accent    { color: var(--color-accent-dark);  background: rgba(205,184,220,0.30); }
  .badge-gold      { color: var(--color-gold-dark);    background: rgba(201,162,101,0.18); }
  .badge-neutral   { color: var(--color-ink-muted);    background: var(--color-surface-dark); }
  .badge-solid     { color: #fff;                      background: var(--color-primary); }
  .badge-success   { color: #166534;                   background: #dcfce7; }
  .badge-warning   { color: #854d0e;                   background: #fef9c3; }
  .badge-danger    { color: #991b1b;                   background: #fee2e2; }


  /* ══════════════════════════════════════════════════════════
     NAV
     Uso: <header class="nav">...</header>
  ══════════════════════════════════════════════════════════ */

  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(247,242,234,0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-surface-dark);
  }
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin: 0 auto;
  }
  .nav-logo  { font-family: var(--font-display); font-size: 1.25rem; font-weight: 300; color: var(--color-ink); text-decoration: none; }
  .nav-logo:hover { color: var(--color-primary); }
  .nav-link  { font-family: var(--font-sans); font-size: 0.875rem; font-weight: 300; color: var(--color-ink-muted); text-decoration: none; }
  .nav-link:hover { color: var(--color-primary); }


  /* ══════════════════════════════════════════════════════════
     ALERTS
     Uso: <div class="alert alert-success">...</div>
  ══════════════════════════════════════════════════════════ */

  .alert {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: var(--radius-card);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
  }
  .alert-icon { font-size: 1rem; flex-shrink: 0; margin-top: 0.05rem; }
  .alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
  .alert-warning { background: #fffbeb; color: #854d0e; border: 1px solid #fde68a; }
  .alert-danger  { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
  .alert-info    { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }


  /* ══════════════════════════════════════════════════════════
     AVATAR
     Uso: <div class="avatar">AB</div>
          <img class="avatar" src="..." />
  ══════════════════════════════════════════════════════════ */

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-secondary);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-weight: 500;
    object-fit: cover;
    flex-shrink: 0;
  }
  .avatar-sm  { width: 2rem;   height: 2rem;   font-size: 0.7rem; }
  .avatar-md  { width: 2.5rem; height: 2.5rem; font-size: 0.8rem; }
  .avatar-lg  { width: 3.5rem; height: 3.5rem; font-size: 1.1rem; }
  .avatar-xl  { width: 5rem;   height: 5rem;   font-size: 1.4rem; }

  /* Badge de estado sobre el avatar */
  .avatar-wrap { position: relative; display: inline-flex; }
  .avatar-status {
    position: absolute; bottom: 0; right: 0;
    width: 0.65rem; height: 0.65rem;
    border-radius: 50%; border: 2px solid #fff;
  }
  .avatar-online  { background: #22c55e; }
  .avatar-offline { background: var(--color-ink-subtle); }
  .avatar-busy    { background: #f87171; }


  /* ══════════════════════════════════════════════════════════
     LOADER
     Uso: <div class="loader-spinner"></div>
          <div class="skeleton skeleton-text"></div>
  ══════════════════════════════════════════════════════════ */

  /* Spinner */
  .loader-spinner {
    display: inline-block;
    border-radius: 50%;
    border: 2px solid var(--color-surface-dark);
    border-top-color: var(--color-primary);
    animation: spin 0.7s linear infinite;
  }
  .loader-spinner.sm { width: 1rem;   height: 1rem; }
  .loader-spinner.md { width: 1.5rem; height: 1.5rem; border-width: 2px; }
  .loader-spinner.lg { width: 2.5rem; height: 2.5rem; border-width: 3px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Skeleton */
  .skeleton {
    background: linear-gradient(90deg, var(--color-surface-dark) 25%, var(--color-surface) 50%, var(--color-surface-dark) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 0.375rem;
  }
  .skeleton-text   { height: 0.875rem; margin-bottom: 0.5rem; }
  .skeleton-title  { height: 1.5rem;   margin-bottom: 0.75rem; }
  .skeleton-avatar { border-radius: 50%; width: 2.5rem; height: 2.5rem; }
  @keyframes shimmer { to { background-position: -200% 0; } }

  /* Progress bar */
  .progress-track {
    height: 0.375rem;
    background: var(--color-surface-dark);
    border-radius: 9999px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 9999px;
    transition: width 0.4s ease;
  }


  /* ══════════════════════════════════════════════════════════
     TABS
     Uso: <div class="tabs-bar"><button class="tab active">...</button></div>
  ══════════════════════════════════════════════════════════ */

  .tabs-bar {
    display: flex;
    border-bottom: 1px solid var(--color-surface-dark);
    gap: 0;
  }
  .tab {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-ink-muted);
    padding: 0.625rem 1.25rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
  }
  .tab:hover      { color: var(--color-ink); }
  .tab.active     { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  .tab:disabled   { opacity: 0.4; cursor: not-allowed; }
  .tab-count {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--color-surface-dark); color: var(--color-ink-muted);
    font-size: 0.65rem; font-weight: 500;
    border-radius: 9999px; padding: 0.1rem 0.45rem;
    margin-left: 0.35rem;
  }
  .tab.active .tab-count { background: rgba(212,105,63,0.12); color: var(--color-primary); }


  /* ══════════════════════════════════════════════════════════
     ACCORDION
     Uso: <details class="accordion"><summary class="accordion-trigger">...</summary>
          <div class="accordion-body">...</div></details>
  ══════════════════════════════════════════════════════════ */

  .accordion {
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-card);
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .accordion-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.25rem;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--color-ink);
    background: #fff;
    cursor: pointer;
    list-style: none;
    transition: background 0.15s ease;
  }
  .accordion-trigger:hover { background: var(--color-surface); }
  .accordion-trigger::after {
    content: '+';
    font-size: 1.25rem;
    font-weight: 300;
    color: var(--color-ink-muted);
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }
  details[open] > .accordion-trigger::after { transform: rotate(45deg); }
  .accordion-body {
    padding: 0 1.25rem 1rem;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 300;
    color: var(--color-ink-muted);
    line-height: 1.6;
    background: #fff;
    border-top: 1px solid var(--color-surface-dark);
  }

  `;
  document.head.appendChild(css);
})();


// ── CAPA 4: Registro de componentes (renderizado condicional) ─
// El styleguide lee esta lista y solo muestra las secciones
// de los componentes declarados acá.
// Agregar/quitar un nombre = mostrar/ocultar esa sección.

// ── Tokens expuestos para el styleguide ──────────────────────
// El styleguide lee estos valores para mostrar nombres de fuentes,
// colores principales, etc. — nunca hardcodeados en el HTML.
window.DS_TOKENS = {
  fontDisplay: 'Domine',
  fontSans:    'DM Sans',
};

window.DS_COMPONENTS = [
  'btn',        // Botones
  'input',      // Inputs, selects, textarea
  'card',       // Cards
  'badge',      // Badges y etiquetas
  'nav',        // Navegación
  'alert',      // Alertas y toasts
  'avatar',     // Avatares
  'loader',     // Loaders y skeletons
  'tab',        // Tabs
  'accordion',  // Acordeones
];
