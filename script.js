/* =========================================================
   Azul Embajador — Tienda de hinchas de Millonarios
   Lógica de la tienda: catálogo, ficha de producto,
   personalización, carrito y pago simulado.
   ========================================================= */

/* ---------- Configuración ---------- */
const CONFIG = {
  envioGratisDesde: 250000,
  costoEnvio: 14900,
  precioPersonalizacion: 30000,
  storageKey: "azulEmbajadorCarrito",
};

const CATEGORIAS = {
  camisetas: "Camisetas",
  ropa: "Ropa casual",
  accesorios: "Accesorios",
  ninos: "Niños y coleccionables",
};

const TALLAS = {
  adulto: ["S", "M", "L", "XL", "XXL"],
  nino: ["4", "6", "8", "10", "12", "14"],
  unica: [],
};

const COLOR = {
  azul: "#123c8f",
  profundo: "#0a2557",
  blanco: "#ffffff",
  dorado: "#c9a227",
  perla: "#dfe5ee",
  retro: "#1a4ba3",
};

/* ---------- Catálogo ----------
   Para agregar un producto, copia un objeto y cambia sus datos.
   tipo: jersey | retro | jacket | hoodie | training | polo | cap |
         scarf | thermos | mug | flag | ball | keychain              */
const PRODUCTOS = [
  {
    id: "camiseta-local-2026", nombre: "Camiseta local 2026", categoria: "camisetas",
    precio: 289900, badge: "Nuevo", tipo: "jersey", tallas: "adulto", personalizable: true,
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "Azul de pies a cabeza, con cuello redondo y puños blancos. Tela liviana que respira en los 90 minutos.",
  },
  {
    id: "camiseta-visitante-2026", nombre: "Camiseta visitante 2026", categoria: "camisetas",
    precio: 289900, badge: "Nuevo", tipo: "jersey", tallas: "adulto", personalizable: true,
    colores: { cuerpo: COLOR.blanco, detalle: COLOR.azul },
    descripcion: "Blanca con detalles en azul para los partidos fuera de casa. Corte regular y secado rápido.",
  },
  {
    id: "camiseta-alternativa", nombre: "Camiseta alternativa", categoria: "camisetas",
    precio: 279900, badge: "Nuevo", tipo: "jersey", tallas: "adulto", personalizable: true,
    colores: { cuerpo: COLOR.profundo, detalle: COLOR.dorado },
    descripcion: "Azul noche con detalles dorados que recuerdan las estrellas ganadas. Edición de temporada.",
  },
  {
    id: "camiseta-retro-el-dorado", nombre: "Camiseta retro época de El Dorado", categoria: "camisetas",
    precio: 199900, precioAntes: 229900, tipo: "retro", tallas: "adulto", personalizable: true,
    colores: { cuerpo: COLOR.retro, detalle: COLOR.blanco },
    descripcion: "Inspirada en el Ballet Azul de los años cincuenta: cuello en V con cordón y algodón grueso.",
  },
  {
    id: "chaqueta-presentacion", nombre: "Chaqueta de presentación", categoria: "ropa",
    precio: 329900, tipo: "jacket", tallas: "adulto",
    colores: { cuerpo: COLOR.profundo, detalle: COLOR.blanco },
    descripcion: "La chaqueta para ir al estadio en noches frías. Cierre completo, cuello alto y franjas en las mangas.",
  },
  {
    id: "buzo-capucha", nombre: "Buzo con capucha", categoria: "ropa",
    precio: 219900, tipo: "hoodie", tallas: "adulto",
    colores: { cuerpo: COLOR.perla, detalle: COLOR.azul },
    descripcion: "Buzo gris perla en felpa suave, con bolsillo canguro y cordones azules.",
  },
  {
    id: "camiseta-entrenamiento", nombre: "Camiseta de entrenamiento", categoria: "ropa",
    precio: 149900, tipo: "training", tallas: "adulto",
    colores: { cuerpo: COLOR.blanco, detalle: COLOR.azul },
    descripcion: "Para el gimnasio o el partido del fin de semana. Franja diagonal azul y tela de secado rápido.",
  },
  {
    id: "polo-casual", nombre: "Polo casual", categoria: "ropa",
    precio: 139900, tipo: "polo", tallas: "adulto",
    colores: { cuerpo: COLOR.profundo, detalle: COLOR.blanco },
    descripcion: "Polo en piqué azul noche con cuello blanco. Sirve para la oficina y para la tribuna.",
  },
  {
    id: "gorra-bordada", nombre: "Gorra bordada", categoria: "accesorios",
    precio: 79900, tipo: "cap", tallas: "unica",
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "Gorra azul de seis paneles con estrella bordada y correa ajustable.",
  },
  {
    id: "bufanda-tejida", nombre: "Bufanda tejida", categoria: "accesorios",
    precio: 69900, precioAntes: 79900, tipo: "scarf", tallas: "unica",
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "Bufanda en franjas azules y blancas, tejida a doble cara. Mide 1,40 m.",
  },
  {
    id: "termo-acero", nombre: "Termo de acero 750 ml", categoria: "accesorios",
    precio: 89900, tipo: "thermos", tallas: "unica",
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "Mantiene el tinto caliente 12 horas y el agua fría 24. Tapa con cierre hermético.",
  },
  {
    id: "mug-ceramica", nombre: "Mug de cerámica", categoria: "accesorios",
    precio: 39900, tipo: "mug", tallas: "unica",
    colores: { cuerpo: COLOR.blanco, detalle: COLOR.azul },
    descripcion: "Mug blanco de 11 oz con franja azul. Apto para microondas y lavaplatos.",
  },
  {
    id: "bandera-grande", nombre: "Bandera grande 1,5 × 1 m", categoria: "accesorios",
    precio: 59900, tipo: "flag", tallas: "unica",
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "Bandera azul y blanca en poliéster resistente, con ojales para colgarla en la tribuna o en la casa.",
  },
  {
    id: "camiseta-local-ninos", nombre: "Camiseta local niños", categoria: "ninos",
    precio: 189900, badge: "Nuevo", tipo: "jersey", tallas: "nino", personalizable: true,
    colores: { cuerpo: COLOR.azul, detalle: COLOR.blanco },
    descripcion: "La misma camiseta local en tallas de 4 a 14 años, para el hincha más pequeño de la casa.",
  },
  {
    id: "balon-coleccion", nombre: "Balón de colección talla 5", categoria: "ninos",
    precio: 119900, tipo: "ball", tallas: "unica",
    colores: { cuerpo: COLOR.blanco, detalle: COLOR.azul },
    descripcion: "Balón cosido a máquina, talla oficial 5. Para jugar en el parque o tenerlo en la repisa.",
  },
  {
    id: "llavero-estrella", nombre: "Llavero metálico estrella", categoria: "ninos",
    precio: 24900, tipo: "keychain", tallas: "unica",
    colores: { cuerpo: COLOR.dorado, detalle: COLOR.azul },
    descripcion: "Llavero de metal esmaltado con forma de estrella. Viene en caja de regalo.",
  },
];

const DEPARTAMENTOS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas",
  "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía",
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander",
  "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre",
  "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
];

/* =========================================================
   Ilustraciones SVG de los productos
   ========================================================= */
let svgUid = 0;

function starPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function star(cx, cy, r, fill, extra = "") {
  return `<polygon points="${starPoints(cx, cy, r)}" fill="${fill}" ${extra}/>`;
}

const OUTLINE = 'stroke="rgba(10,37,87,.28)" stroke-width="1.5" stroke-linejoin="round"';

const SHAPES = {
  short: "M64 28 L84 20 Q100 32 116 20 L136 28 L172 56 L154 84 L140 76 L140 178 Q100 184 60 178 L60 76 L46 84 L28 56 Z",
  long: "M64 28 L84 20 Q100 30 116 20 L136 28 L160 52 L176 150 L156 156 L140 90 L140 178 Q100 184 60 178 L60 90 L44 156 L24 150 L40 52 Z",
};

function wrapSvg(inner, label) {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(label)}">${inner}</svg>`;
}

/* Camisetas (frente o espalda con nombre y número) */
function drawShirt(p, opts = {}) {
  const id = `c${++svgUid}`;
  const { cuerpo, detalle } = p.colores;
  const back = opts.back;
  const shape = ["jacket", "hoodie"].includes(p.tipo) ? SHAPES.long : SHAPES.short;
  let behind = "";
  let trims = "";
  let front = "";

  // Puños y cuello (dibujados sobre el borde y recortados por la silueta)
  if (shape === SHAPES.short) {
    trims += `<path d="M172 56 L154 84 M28 56 L46 84" stroke="${detalle}" stroke-width="10"/>`;
  } else {
    trims += `<path d="M176 150 L156 156 M24 150 L44 156" stroke="${detalle}" stroke-width="12"/>`;
  }

  switch (p.tipo) {
    case "retro":
      trims += back
        ? `<path d="M84 20 Q100 26 116 20" stroke="${detalle}" stroke-width="8" fill="none"/>`
        : `<path d="M84 20 L100 46 L116 20" stroke="${detalle}" stroke-width="9" fill="none"/>`;
      if (!back) {
        front += `<path d="M95 30 L105 30 M96 36 L104 36" stroke="${detalle}" stroke-width="2" stroke-linecap="round"/>`;
      }
      break;
    case "jacket":
      behind += `<path d="M80 12 L120 12 L118 26 Q100 32 82 26 Z" fill="${cuerpo}" ${OUTLINE}/>`;
      trims += `<path d="M138 30 L162 54 L178 148 M62 30 L38 54 L22 148" stroke="${detalle}" stroke-width="9" fill="none"/>`;
      if (!back) front += `<path d="M100 24 L100 180" stroke="${detalle}" stroke-width="2.5"/><circle cx="100" cy="34" r="3" fill="${detalle}"/>`;
      break;
    case "hoodie":
      behind += `<path d="M74 30 Q76 0 100 0 Q124 0 126 30 Q100 42 74 30 Z" fill="${shade(cuerpo, -10)}" ${OUTLINE}/>`;
      if (!back) {
        front += `<path d="M92 30 L90 70 M108 30 L110 70" stroke="${detalle}" stroke-width="3" stroke-linecap="round"/>`;
        front += `<path d="M70 126 L130 126 L138 166 L62 166 Z" fill="none" stroke="${shade(cuerpo, -18)}" stroke-width="2.5"/>`;
      }
      break;
    case "training":
      if (!back) trims += `<path d="M58 118 L142 74 L142 98 L58 142 Z" fill="${detalle}"/>`;
      trims += `<path d="M84 20 Q100 32 116 20" stroke="${detalle}" stroke-width="8" fill="none"/>`;
      break;
    case "polo":
      if (!back) {
        front += `<path d="M84 20 L98 36 L88 42 L78 24 Z M116 20 L102 36 L112 42 L122 24 Z" fill="${detalle}" ${OUTLINE}/>`;
        front += `<path d="M100 36 L100 64" stroke="${shade(cuerpo, 25)}" stroke-width="2"/><circle cx="100" cy="46" r="2.2" fill="${detalle}"/><circle cx="100" cy="57" r="2.2" fill="${detalle}"/>`;
      } else {
        trims += `<path d="M84 20 Q100 28 116 20" stroke="${detalle}" stroke-width="10" fill="none"/>`;
      }
      break;
    default: // jersey
      trims += `<path d="M84 20 Q100 ${back ? 26 : 32} 116 20" stroke="${detalle}" stroke-width="9" fill="none"/>`;
      if (!back) trims += `<path d="M60 76 L60 178 M140 76 L140 178" stroke="${detalle}" stroke-width="6"/>`;
  }

  // Escudo genérico (estrella) y pliegue sutil en el frente
  if (!back && !["hoodie", "jacket"].includes(p.tipo)) {
    front += star(120, 62, 8, detalle);
  }
  if (!back && p.tipo === "jacket") front += star(122, 60, 6, detalle);
  if (!back && p.tipo === "hoodie") front += star(120, 92, 9, detalle);

  // Nombre y número en la espalda
  let backText = "";
  if (back) {
    const nombre = (opts.nombre || "").toUpperCase();
    const numero = opts.numero ? String(opts.numero) : "";
    // Los nombres largos se comprimen para que no se salgan de la camiseta
    const fit = nombre.length > 6 ? `textLength="${Math.min(70, nombre.length * 9)}" lengthAdjust="spacingAndGlyphs"` : "";
    backText += `<text x="100" y="74" text-anchor="middle" font-family="'Big Shoulders Display', 'Arial Narrow', sans-serif" font-weight="800" font-size="15" letter-spacing="1.5" ${fit} fill="${detalle}">${escapeHtml(nombre)}</text>`;
    backText += `<text x="100" y="152" text-anchor="middle" font-family="'Big Shoulders Display', 'Arial Narrow', sans-serif" font-weight="900" font-size="70" fill="${detalle}">${escapeHtml(numero)}</text>`;
  }

  const inner = `
    <defs><clipPath id="${id}"><path d="${shape}"/></clipPath></defs>
    ${behind}
    <path d="${shape}" fill="${cuerpo}" ${OUTLINE}/>
    <g clip-path="url(#${id})">
      <path d="M60 100 Q100 116 140 100 L140 120 Q100 134 60 120 Z" fill="#000" opacity=".04"/>
      ${trims}
    </g>
    ${front}
    ${backText}`;
  return wrapSvg(inner, p.nombre + (back ? ", vista de la espalda" : ""));
}

function drawCap(p) {
  const { cuerpo, detalle } = p.colores;
  return wrapSvg(`
    <path d="M48 128 Q46 62 100 58 Q154 62 152 128 Z" fill="${cuerpo}" ${OUTLINE}/>
    <path d="M100 58 L100 128 M74 66 Q66 96 70 128 M126 66 Q134 96 130 128" stroke="${shade(cuerpo, -15)}" stroke-width="1.5" fill="none"/>
    <path d="M40 126 Q100 112 176 132 Q160 150 104 144 Q58 140 40 126 Z" fill="${shade(cuerpo, -14)}" ${OUTLINE}/>
    <circle cx="100" cy="58" r="5" fill="${detalle}"/>
    ${star(100, 96, 15, detalle)}`, p.nombre);
}

function drawScarf(p) {
  const { cuerpo, detalle } = p.colores;
  let blocks = "";
  for (let i = 0; i < 8; i++) {
    blocks += `<rect x="${20 + i * 20}" y="84" width="20" height="34" fill="${i % 2 ? detalle : cuerpo}"/>`;
  }
  let fringe = "";
  for (let i = 0; i < 6; i++) {
    const y = 87 + i * 5.6;
    fringe += `<path d="M20 ${y} L8 ${y + 2} M180 ${y} L192 ${y + 2}" stroke="${cuerpo}" stroke-width="2" stroke-linecap="round"/>`;
  }
  return wrapSvg(`
    <g transform="rotate(-24 100 100)">
      ${fringe}
      ${blocks}
      <rect x="20" y="84" width="160" height="34" fill="none" ${OUTLINE}/>
      ${star(110, 101, 8, cuerpo)}
    </g>`, p.nombre);
}

function drawThermos(p) {
  const { cuerpo, detalle } = p.colores;
  return wrapSvg(`
    <rect x="78" y="18" width="44" height="30" rx="6" fill="${shade(cuerpo, -18)}" ${OUTLINE}/>
    <rect x="70" y="44" width="60" height="140" rx="16" fill="${cuerpo}" ${OUTLINE}/>
    <rect x="70" y="96" width="60" height="30" fill="${detalle}"/>
    ${star(100, 111, 10, cuerpo)}
    <rect x="80" y="54" width="6" height="110" rx="3" fill="#fff" opacity=".18"/>`, p.nombre);
}

function drawMug(p) {
  const { cuerpo, detalle } = p.colores;
  return wrapSvg(`
    <path d="M136 82 Q172 80 172 110 Q172 140 136 138" stroke="${cuerpo}" stroke-width="14" fill="none"/>
    <path d="M136 82 Q172 80 172 110 Q172 140 136 138" stroke="rgba(10,37,87,.28)" stroke-width="1.5" fill="none"/>
    <rect x="40" y="52" width="100" height="116" rx="10" fill="${cuerpo}" ${OUTLINE}/>
    <rect x="40" y="92" width="100" height="36" fill="${detalle}"/>
    ${star(90, 110, 12, cuerpo)}
    <ellipse cx="90" cy="54" rx="48" ry="4" fill="#000" opacity=".06"/>`, p.nombre);
}

function drawFlag(p) {
  const id = `c${++svgUid}`;
  const { cuerpo, detalle } = p.colores;
  const shape = "M46 30 Q86 16 122 32 Q150 44 182 30 L182 124 Q150 138 122 126 Q86 110 46 124 Z";
  return wrapSvg(`
    <defs><clipPath id="${id}"><path d="${shape}"/></clipPath></defs>
    <path d="M42 22 L42 188" stroke="#8a97b3" stroke-width="5" stroke-linecap="round"/>
    <path d="${shape}" fill="${cuerpo}" ${OUTLINE}/>
    <g clip-path="url(#${id})"><rect x="40" y="62" width="150" height="30" fill="${detalle}"/></g>
    ${star(114, 77, 13, cuerpo)}`, p.nombre);
}

function drawBall(p) {
  const id = `c${++svgUid}`;
  const { cuerpo, detalle } = p.colores;
  const pent = (cx, cy, r, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 / 5) * i - Math.PI / 2 + rot;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  let seams = "";
  let patches = "";
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const x1 = 100 + 22 * Math.cos(a), y1 = 100 + 22 * Math.sin(a);
    const x2 = 100 + 58 * Math.cos(a), y2 = 100 + 58 * Math.sin(a);
    seams += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${detalle}" stroke-width="2"/>`;
    const px = 100 + 74 * Math.cos(a), py = 100 + 74 * Math.sin(a);
    patches += `<polygon points="${pent(px, py, 18, Math.PI)}" fill="${detalle}"/>`;
  }
  return wrapSvg(`
    <defs><clipPath id="${id}"><circle cx="100" cy="100" r="74"/></clipPath></defs>
    <circle cx="100" cy="100" r="74" fill="${cuerpo}"/>
    <g clip-path="url(#${id})">${seams}${patches}</g>
    <polygon points="${pent(100, 100, 24)}" fill="${detalle}"/>
    <circle cx="100" cy="100" r="74" fill="none" stroke="${detalle}" stroke-width="3"/>`, p.nombre);
}

function drawKeychain(p) {
  const { cuerpo, detalle } = p.colores;
  return wrapSvg(`
    <circle cx="100" cy="36" r="18" fill="none" stroke="#8a97b3" stroke-width="5"/>
    <path d="M100 54 L100 70" stroke="#8a97b3" stroke-width="4"/>
    ${star(100, 124, 56, cuerpo, `stroke="${shade(cuerpo, -25)}" stroke-width="3" stroke-linejoin="round"`)}
    ${star(100, 126, 26, detalle)}`, p.nombre);
}

function productSvg(p, opts = {}) {
  switch (p.tipo) {
    case "cap": return drawCap(p);
    case "scarf": return drawScarf(p);
    case "thermos": return drawThermos(p);
    case "mug": return drawMug(p);
    case "flag": return drawFlag(p);
    case "ball": return drawBall(p);
    case "keychain": return drawKeychain(p);
    default: return drawShirt(p, opts);
  }
}

/* Aclara (+) u oscurece (−) un color hex en porcentaje */
function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c) => Math.max(0, Math.min(255, Math.round(c + (percent / 100) * (percent > 0 ? 255 - c : c))));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/* =========================================================
   Utilidades
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatCOP(value) {
  return "$" + Math.round(value).toLocaleString("es-CO");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function findProduct(id) {
  return PRODUCTOS.find((p) => p.id === id);
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

/* =========================================================
   Estado
   ========================================================= */
const state = {
  categoria: "todos",
  busqueda: "",
  orden: "destacados",
  carrito: loadCart(),
};

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    return Array.isArray(saved) ? saved.filter((item) => findProduct(item.id)) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.carrito));
  } catch {
    /* Si el navegador bloquea el almacenamiento, el carrito sigue funcionando en memoria */
  }
}

/* =========================================================
   Catálogo
   ========================================================= */
function getVisibleProducts() {
  const q = normalize(state.busqueda.trim());
  let list = PRODUCTOS.filter((p) => {
    const inCategory = state.categoria === "todos" || p.categoria === state.categoria;
    if (!inCategory) return false;
    if (!q) return true;
    const haystack = normalize(`${p.nombre} ${CATEGORIAS[p.categoria]} ${p.descripcion}`);
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
  if (state.orden === "menor") list = [...list].sort((a, b) => a.precio - b.precio);
  if (state.orden === "mayor") list = [...list].sort((a, b) => b.precio - a.precio);
  return list;
}

function renderCatalog() {
  const list = getVisibleProducts();
  const grid = $("#productGrid");

  grid.innerHTML = list.map((p) => {
    const needsSize = p.tallas !== "unica";
    const badge = p.precioAntes
      ? `<span class="product__badge product__badge--sale">−${Math.round((1 - p.precio / p.precioAntes) * 100)}%</span>`
      : p.badge ? `<span class="product__badge">${p.badge}</span>` : "";
    return `
      <article class="product">
        <button class="product__media" data-open="${p.id}" aria-label="Ver ${escapeHtml(p.nombre)}">
          ${badge}
          ${productSvg(p)}
        </button>
        <div class="product__body">
          <p class="product__cat">${CATEGORIAS[p.categoria]}</p>
          <h3 class="product__name"><button data-open="${p.id}">${escapeHtml(p.nombre)}</button></h3>
          <div class="product__foot">
            <p class="price">${formatCOP(p.precio)}${p.precioAntes ? `<del>${formatCOP(p.precioAntes)}</del>` : ""}</p>
            <button class="product__add" ${needsSize ? `data-open="${p.id}"` : `data-quick-add="${p.id}"`}>
              ${needsSize ? "Elegir talla" : "Agregar"}
            </button>
          </div>
        </div>
      </article>`;
  }).join("");

  $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "producto" : "productos"}`;
  $("#emptyState").hidden = list.length > 0;
}

function setCategory(cat) {
  state.categoria = cat;
  $$(".chip").forEach((chip) => {
    const active = chip.dataset.cat === cat;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-selected", String(active));
  });
  renderCatalog();
}

/* =========================================================
   Capas: carrito y modales (con foco atrapado y tecla Esc)
   ========================================================= */
let activeLayer = null;
let returnFocusTo = null;

function openLayer(layer) {
  if (activeLayer) {
    activeLayer.hidden = true;
  } else {
    returnFocusTo = document.activeElement;
  }
  activeLayer = layer;
  $("#overlay").hidden = false;
  layer.hidden = false;
  document.body.classList.add("no-scroll");
  if (layer.id === "cartDrawer") $("#cartBtn").setAttribute("aria-expanded", "true");
  const first = $$("input, select, button:not([data-close]), [href]", layer).find((el) => el.offsetParent !== null)
    || layer.querySelector("button");
  if (first) first.focus({ preventScroll: true });
}

function closeLayer() {
  if (!activeLayer) return;
  const closing = activeLayer;
  closing.hidden = true;
  activeLayer = null;
  $("#overlay").hidden = true;
  document.body.classList.remove("no-scroll");
  $("#cartBtn").setAttribute("aria-expanded", "false");
  if (closing.id === "checkoutModal") resetCheckoutView();
  if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus({ preventScroll: true });
}

function trapFocus(e) {
  if (!activeLayer || e.key !== "Tab") return;
  const focusables = $$("button, [href], input, select, textarea", activeLayer)
    .filter((el) => !el.disabled && el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* =========================================================
   Ficha de producto
   ========================================================= */
const pm = {
  product: null,
  talla: null,
  qty: 1,
  personalizar: false,
  nombre: "",
  numero: "",
  vista: "front",
};

function openProduct(id) {
  const p = findProduct(id);
  if (!p) return;
  Object.assign(pm, { product: p, talla: null, qty: 1, personalizar: false, nombre: "", numero: "", vista: "front" });

  $("#pmCat").textContent = CATEGORIAS[p.categoria];
  $("#pmName").textContent = p.nombre;
  $("#pmDesc").textContent = p.descripcion;
  $("#pmQty").textContent = "1";
  $("#pmSizeError").textContent = "";
  $("#pmCustomError").textContent = "";

  // Tallas
  const tallas = TALLAS[p.tallas];
  $("#pmSizeGroup").hidden = tallas.length === 0;
  $("#pmSizeGroup legend").textContent = p.tallas === "nino" ? "Talla (años)" : "Talla";
  $("#pmSizes").innerHTML = tallas
    .map((t) => `<button type="button" class="size" data-size="${t}" aria-pressed="false">${t}</button>`)
    .join("");

  // Personalización
  $("#pmCustom").hidden = !p.personalizable;
  $("#pmViews").hidden = !p.personalizable;
  $("#pmCustomToggle").checked = false;
  $("#pmCustomFields").hidden = true;
  $("#pmCustomName").value = "";
  $("#pmCustomNumber").value = "";

  updateProductView();
  openLayer($("#productModal"));
}

function unitPrice() {
  return pm.product.precio + (pm.personalizar ? CONFIG.precioPersonalizacion : 0);
}

function updateProductView() {
  const p = pm.product;
  const back = p.personalizable && pm.vista === "back";
  $("#pmImg").innerHTML = productSvg(p, {
    back,
    nombre: pm.personalizar ? pm.nombre : "",
    numero: pm.personalizar ? pm.numero : "",
  });
  $$(".pm__view").forEach((btn) => {
    const active = btn.dataset.view === pm.vista;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  const old = p.precioAntes && !pm.personalizar ? `<del>${formatCOP(p.precioAntes)}</del>` : "";
  $("#pmPrice").innerHTML = `${formatCOP(unitPrice())}${old}`;
  $("#pmAdd").textContent = pm.qty > 1 ? `Agregar ${pm.qty} al carrito` : "Agregar al carrito";
}

function addFromModal() {
  const p = pm.product;
  let valid = true;

  if (p.tallas !== "unica" && !pm.talla) {
    $("#pmSizeError").textContent = "Elige una talla para continuar.";
    valid = false;
  }
  if (pm.personalizar) {
    const num = Number(pm.numero);
    if (!pm.nombre.trim() || !pm.numero || num < 1 || num > 99) {
      $("#pmCustomError").textContent = "Escribe un nombre y un número entre 1 y 99, o desactiva la personalización.";
      valid = false;
    }
  }
  if (!valid) return;

  addToCart({
    id: p.id,
    talla: pm.talla || "Única",
    nombre: pm.personalizar ? pm.nombre.trim().toUpperCase() : "",
    numero: pm.personalizar ? String(Number(pm.numero)) : "",
    qty: pm.qty,
    precioUnit: unitPrice(),
  });
  closeLayer();
  showToast(`${p.nombre} se agregó al carrito`);
}

/* =========================================================
   Carrito
   ========================================================= */
function cartKey(item) {
  return [item.id, item.talla, item.nombre, item.numero].join("|");
}

function addToCart(item) {
  const key = cartKey(item);
  const existing = state.carrito.find((i) => cartKey(i) === key);
  if (existing) existing.qty = Math.min(existing.qty + item.qty, 20);
  else state.carrito.push({ ...item });
  saveCart();
  renderCart();
  const count = $("#cartCount");
  count.classList.remove("bump");
  void count.offsetWidth; // reinicia la animación
  count.classList.add("bump");
}

function cartTotals() {
  const subtotal = state.carrito.reduce((sum, i) => sum + i.precioUnit * i.qty, 0);
  const envio = subtotal === 0 || subtotal >= CONFIG.envioGratisDesde ? 0 : CONFIG.costoEnvio;
  return { subtotal, envio, total: subtotal + envio, unidades: state.carrito.reduce((s, i) => s + i.qty, 0) };
}

function itemMeta(item) {
  const parts = [];
  if (item.talla !== "Única") parts.push(`Talla ${item.talla}`);
  if (item.nombre) parts.push(`${item.nombre} ${item.numero}`);
  return parts.join(", ");
}

function renderCart() {
  const { subtotal, envio, total, unidades } = cartTotals();
  const empty = state.carrito.length === 0;

  $("#cartCount").textContent = unidades;
  $("#cartBtn").setAttribute("aria-label", `Abrir carrito, ${unidades} ${unidades === 1 ? "producto" : "productos"}`);
  $("#cartEmpty").hidden = !empty;
  $("#cartFoot").hidden = empty;
  $("#cartList").hidden = empty;
  $("#shippingMeter").hidden = empty;

  $("#cartList").innerHTML = state.carrito.map((item, index) => {
    const p = findProduct(item.id);
    const meta = itemMeta(item);
    return `
      <li class="cart-item">
        <div class="cart-item__img">${productSvg(p, { back: !!item.nombre, nombre: item.nombre, numero: item.numero })}</div>
        <div>
          <p class="cart-item__name">${escapeHtml(p.nombre)}</p>
          ${meta ? `<p class="cart-item__meta">${escapeHtml(meta)}</p>` : ""}
          <div class="qty" aria-label="Cantidad de ${escapeHtml(p.nombre)}">
            <button type="button" data-cart-qty="-1" data-index="${index}" aria-label="Quitar uno">−</button>
            <output>${item.qty}</output>
            <button type="button" data-cart-qty="1" data-index="${index}" aria-label="Agregar uno">+</button>
          </div>
        </div>
        <div>
          <p class="cart-item__price">${formatCOP(item.precioUnit * item.qty)}</p>
          <button class="cart-item__remove" data-remove="${index}">Eliminar</button>
        </div>
      </li>`;
  }).join("");

  $("#cartSubtotal").textContent = formatCOP(subtotal);
  $("#cartShipping").textContent = envio === 0 ? "Gratis" : formatCOP(envio);
  $("#cartTotal").textContent = formatCOP(total);

  const faltante = CONFIG.envioGratisDesde - subtotal;
  $("#shippingText").innerHTML = faltante > 0
    ? `Te faltan <strong>${formatCOP(faltante)}</strong> para el envío gratis.`
    : "Tu pedido tiene <strong>envío gratis</strong>.";
  $("#shippingBar").style.width = `${Math.min(100, (subtotal / CONFIG.envioGratisDesde) * 100)}%`;
}

function changeCartQty(index, delta) {
  const item = state.carrito[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.carrito.splice(index, 1);
  if (item.qty > 20) item.qty = 20;
  saveCart();
  renderCart();
}

/* =========================================================
   Pago simulado
   ========================================================= */
function openCheckout() {
  if (!state.carrito.length) return;
  const { subtotal, envio, total } = cartTotals();
  $("#summaryList").innerHTML = state.carrito.map((item) => {
    const p = findProduct(item.id);
    const meta = itemMeta(item);
    return `<li><span>${item.qty} × ${escapeHtml(p.nombre)}${meta ? `<small>${escapeHtml(meta)}</small>` : ""}</span><strong>${formatCOP(item.precioUnit * item.qty)}</strong></li>`;
  }).join("");
  $("#sumSubtotal").textContent = formatCOP(subtotal);
  $("#sumShipping").textContent = envio === 0 ? "Gratis" : formatCOP(envio);
  $("#sumTotal").textContent = formatCOP(total);
  $("#payBtn").textContent = `Pagar ${formatCOP(total)}`;
  openLayer($("#checkoutModal"));
}

function validateCheckout(form) {
  const data = Object.fromEntries(new FormData(form));
  const errors = [];
  const mark = (name, bad) => {
    const fields = form.querySelectorAll(`[name="${name}"]`);
    fields.forEach((f) => f.setAttribute("aria-invalid", String(bad)));
  };

  const checks = [
    ["nombre", (data.nombre || "").trim().length >= 3, "Escribe tu nombre completo."],
    ["correo", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo || ""), "Escribe un correo válido, por ejemplo nombre@correo.com."],
    ["celular", /^3\d{9}$/.test((data.celular || "").replace(/\s/g, "")), "El celular debe tener 10 dígitos y empezar por 3."],
    ["direccion", (data.direccion || "").trim().length >= 5, "Escribe la dirección de entrega."],
    ["ciudad", (data.ciudad || "").trim().length >= 3, "Escribe la ciudad de entrega."],
    ["departamento", !!data.departamento, "Selecciona el departamento."],
    ["pago", !!data.pago, "Elige un método de pago."],
  ];

  checks.forEach(([name, ok, msg]) => {
    mark(name, !ok);
    if (!ok) errors.push({ name, msg });
  });
  return { ok: errors.length === 0, errors, data };
}

function handleCheckout(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const { ok, errors, data } = validateCheckout(form);
  const errorBox = $("#checkoutError");

  if (!ok) {
    errorBox.textContent = errors[0].msg;
    const field = form.querySelector(`[name="${errors[0].name}"]`);
    if (field) field.focus();
    return;
  }
  errorBox.textContent = "";

  const payBtn = $("#payBtn");
  payBtn.disabled = true;
  payBtn.textContent = "Procesando pago…";

  // Simulación del procesamiento del pago
  setTimeout(() => {
    const orden = "AE-" + Math.floor(100000 + Math.random() * 900000);
    const primerNombre = data.nombre.trim().split(/\s+/)[0];
    $("#orderNumber").textContent = orden;
    $("#successText").textContent =
      `Gracias, ${primerNombre}. Enviaremos tu pedido a ${data.direccion.trim()}, ${data.ciudad.trim()}. ` +
      `La confirmación llegará a ${data.correo.trim()}. Método de pago: ${data.pago}.`;

    form.hidden = true;
    $("#successView").hidden = false;
    $("#successView button").focus();

    state.carrito = [];
    saveCart();
    renderCart();
    form.reset();
    $$("[aria-invalid]", form).forEach((f) => f.removeAttribute("aria-invalid"));
    payBtn.disabled = false;
  }, 1400);
}

function resetCheckoutView() {
  $("#checkoutForm").hidden = false;
  $("#successView").hidden = true;
  $("#checkoutError").textContent = "";
}

/* =========================================================
   Eventos
   ========================================================= */
function bindEvents() {
  // Filtros por categoría
  $("#chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setCategory(chip.dataset.cat);
  });

  // Enlaces del menú y botones que llevan a una categoría
  $$("[data-cat-link]").forEach((link) => {
    link.addEventListener("click", () => {
      setCategory(link.dataset.catLink);
      closeMenu();
    });
  });

  // Búsqueda y orden
  $("#searchInput").addEventListener("input", (e) => {
    state.busqueda = e.target.value;
    renderCatalog();
  });
  $("#sortSelect").addEventListener("change", (e) => {
    state.orden = e.target.value;
    renderCatalog();
  });
  $("#clearSearch").addEventListener("click", () => {
    state.busqueda = "";
    $("#searchInput").value = "";
    setCategory("todos");
  });

  // Grilla: abrir ficha o agregar directo
  $("#productGrid").addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    const quick = e.target.closest("[data-quick-add]");
    if (open) openProduct(open.dataset.open);
    if (quick) {
      const p = findProduct(quick.dataset.quickAdd);
      addToCart({ id: p.id, talla: "Única", nombre: "", numero: "", qty: 1, precioUnit: p.precio });
      showToast(`${p.nombre} se agregó al carrito`);
    }
  });

  // Menú móvil
  $("#menuBtn").addEventListener("click", () => {
    const open = !$("#nav").classList.contains("is-open");
    $("#nav").classList.toggle("is-open", open);
    $("#menuBtn").setAttribute("aria-expanded", String(open));
    $("#menuBtn").setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Carrito
  $("#cartBtn").addEventListener("click", () => {
    closeMenu();
    renderCart();
    openLayer($("#cartDrawer"));
  });
  $("#cartList").addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-cart-qty]");
    const removeBtn = e.target.closest("[data-remove]");
    if (qtyBtn) changeCartQty(Number(qtyBtn.dataset.index), Number(qtyBtn.dataset.cartQty));
    if (removeBtn) {
      state.carrito.splice(Number(removeBtn.dataset.remove), 1);
      saveCart();
      renderCart();
    }
    if ((qtyBtn || removeBtn) && state.carrito.length === 0) $("#cartEmpty button").focus();
  });
  $("#checkoutBtn").addEventListener("click", openCheckout);

  // Ficha de producto
  $("#pmSizes").addEventListener("click", (e) => {
    const btn = e.target.closest(".size");
    if (!btn) return;
    pm.talla = btn.dataset.size;
    $$(".size").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    $("#pmSizeError").textContent = "";
  });
  $(".pm__buy .qty").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-qty]");
    if (!btn) return;
    pm.qty = Math.max(1, Math.min(20, pm.qty + Number(btn.dataset.qty)));
    $("#pmQty").textContent = pm.qty;
    updateProductView();
  });
  $("#pmViews").addEventListener("click", (e) => {
    const btn = e.target.closest(".pm__view");
    if (!btn) return;
    pm.vista = btn.dataset.view;
    updateProductView();
  });
  $("#pmCustomToggle").addEventListener("change", (e) => {
    pm.personalizar = e.target.checked;
    $("#pmCustomFields").hidden = !pm.personalizar;
    $("#pmCustomError").textContent = "";
    pm.vista = pm.personalizar ? "back" : "front";
    updateProductView();
    if (pm.personalizar) $("#pmCustomName").focus();
  });
  $("#pmCustomName").addEventListener("input", (e) => {
    // Solo letras (incluye tildes y Ñ), espacios y punto
    const clean = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ .]/g, "").slice(0, 12);
    e.target.value = clean;
    pm.nombre = clean;
    $("#pmCustomError").textContent = "";
    updateProductView();
  });
  $("#pmCustomNumber").addEventListener("input", (e) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 2);
    e.target.value = clean;
    pm.numero = clean;
    $("#pmCustomError").textContent = "";
    updateProductView();
  });
  $("#pmAdd").addEventListener("click", addFromModal);

  // Pago
  $("#checkoutForm").addEventListener("submit", handleCheckout);
  $("#checkoutForm").addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true") e.target.setAttribute("aria-invalid", "false");
  });

  // Cerrar capas
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close]");
    if (closer) {
      closeLayer();
      if (closer.hasAttribute("data-goto-catalog")) {
        document.getElementById("catalogo").scrollIntoView();
      }
    }
  });
  $("#overlay").addEventListener("click", closeLayer);
  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeLayer(); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (activeLayer) closeLayer();
      else closeMenu();
    }
    trapFocus(e);
  });
}

function closeMenu() {
  $("#nav").classList.remove("is-open");
  $("#menuBtn").setAttribute("aria-expanded", "false");
  $("#menuBtn").setAttribute("aria-label", "Abrir menú");
}

/* =========================================================
   Inicio
   ========================================================= */
function init() {
  // Camisetas decorativas del hero y de la sección de personalización
  const local = findProduct("camiseta-local-2026");
  const visitante = findProduct("camiseta-visitante-2026");
  $("#heroJersey").innerHTML = productSvg(local, { back: true, nombre: "HINCHA", numero: "12" });
  $("#customJersey").innerHTML = productSvg(visitante, { back: true, nombre: "EMBAJADOR", numero: "10" });

  // Departamentos del formulario de pago
  $("#deptSelect").insertAdjacentHTML(
    "beforeend",
    DEPARTAMENTOS.map((d) => `<option value="${d}">${d}</option>`).join("")
  );

  renderCatalog();
  renderCart();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
