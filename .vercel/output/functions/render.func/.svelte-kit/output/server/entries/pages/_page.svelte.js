import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--primary-color:#667eea;--secondary-color:#764ba2;--logo-color-1:#ffd700;--logo-color-2:#ff6b35;--text-color:white}section.svelte-1v96q3j.svelte-1v96q3j{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:calc(100vh - 80px);padding:2rem;background:linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);color:var(--text-color)}h1.svelte-1v96q3j.svelte-1v96q3j{font-size:3rem;margin-bottom:1rem;font-weight:700}.logo.svelte-1v96q3j.svelte-1v96q3j{background:linear-gradient(45deg, var(--logo-color-1), var(--logo-color-2));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:2px 2px 4px rgba(0, 0, 0, 0.3)}p.svelte-1v96q3j.svelte-1v96q3j{font-size:1.2rem;margin-bottom:2rem;opacity:0.9}.features.svelte-1v96q3j.svelte-1v96q3j{display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:2rem;max-width:800px;width:100%}.feature.svelte-1v96q3j.svelte-1v96q3j{background:rgba(255, 255, 255, 0.1);backdrop-filter:blur(10px);border-radius:12px;padding:1.5rem;border:1px solid rgba(255, 255, 255, 0.2)}.feature.svelte-1v96q3j h3.svelte-1v96q3j{font-size:1.5rem;margin-bottom:0.5rem}.feature.svelte-1v96q3j p.svelte-1v96q3j{margin:0;font-size:1rem;opacity:0.8}@media(max-width: 768px){h1.svelte-1v96q3j.svelte-1v96q3j{font-size:2rem}.features.svelte-1v96q3j.svelte-1v96q3j{grid-template-columns:1fr}}",
  map: null
};
let name = "WellPlay";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1ovjnox_START -->${$$result.title = `<title>WellPlayApp</title>`, ""}<meta name="description" content="Bienvenido a WellPlayApp"><!-- HEAD_svelte-1ovjnox_END -->`, ""} <section class="svelte-1v96q3j"><h1 class="svelte-1v96q3j">Bienvenido a <span class="logo svelte-1v96q3j">${escape(name)}</span></h1> <p class="svelte-1v96q3j" data-svelte-h="svelte-130lekp">¡La Salud Es La Meta!</p> <div class="features svelte-1v96q3j" data-svelte-h="svelte-jj3t0y"><div class="feature svelte-1v96q3j"><h3 class="svelte-1v96q3j">🚀 Retos</h3> <p class="svelte-1v96q3j">Demuestra que eres el Mejo</p></div> <div class="feature svelte-1v96q3j"><h3 class="svelte-1v96q3j">📱 Blog</h3> <p class="svelte-1v96q3j">Tips, Novedades, Consejos</p></div> <div class="feature svelte-1v96q3j"><h3 class="svelte-1v96q3j">⚡ Store</h3> <p class="svelte-1v96q3j">Tu tienda especializada en tu palma de la mano</p></div> <div class="feature svelte-1v96q3j"><h3 class="svelte-1v96q3j">⚡ Chat</h3> <p class="svelte-1v96q3j">Conéctate con otros usuarios y comparte tus experiencias</p></div></div> </section>`;
});
export {
  Page as default
};
