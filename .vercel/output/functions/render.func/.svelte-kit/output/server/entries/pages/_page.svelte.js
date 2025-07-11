import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--primary-color:#667eea;--secondary-color:#764ba2;--logo-color-1:#ffd700;--logo-color-2:#ff6b35;--text-color:white}section.svelte-1kht70a.svelte-1kht70a{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:100vh;padding:2rem;background:linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);color:var(--text-color)}h1.svelte-1kht70a.svelte-1kht70a{font-size:3rem;margin-bottom:1rem;font-weight:700}.logo.svelte-1kht70a.svelte-1kht70a{background:linear-gradient(45deg, var(--logo-color-1), var(--logo-color-2));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:2px 2px 4px rgba(0, 0, 0, 0.3)}p.svelte-1kht70a.svelte-1kht70a{font-size:1.2rem;margin-bottom:2rem;opacity:0.9}.features.svelte-1kht70a.svelte-1kht70a{display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:2rem;max-width:800px;width:100%}.feature.svelte-1kht70a.svelte-1kht70a{background:rgba(255, 255, 255, 0.1);backdrop-filter:blur(10px);border-radius:12px;padding:1.5rem;border:1px solid rgba(255, 255, 255, 0.2)}.feature.svelte-1kht70a h3.svelte-1kht70a{font-size:1.5rem;margin-bottom:0.5rem}.feature.svelte-1kht70a p.svelte-1kht70a{margin:0;font-size:1rem;opacity:0.8}@media(max-width: 768px){h1.svelte-1kht70a.svelte-1kht70a{font-size:2rem}.features.svelte-1kht70a.svelte-1kht70a{grid-template-columns:1fr}}",
  map: null
};
let name = "WellPlay";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1ovjnox_START -->${$$result.title = `<title>WellPlayApp</title>`, ""}<meta name="description" content="Bienvenido a WellPlayApp"><!-- HEAD_svelte-1ovjnox_END -->`, ""} <section class="svelte-1kht70a"><h1 class="svelte-1kht70a">Bienvenido a <span class="logo svelte-1kht70a">${escape(name)}</span></h1> <p class="svelte-1kht70a" data-svelte-h="svelte-ayc70w">¡Tu nueva aplicación SvelteKit está lista para comenzar!</p> <div class="features svelte-1kht70a" data-svelte-h="svelte-1ter8tg"><div class="feature svelte-1kht70a"><h3 class="svelte-1kht70a">🚀 SvelteKit</h3> <p class="svelte-1kht70a">Framework moderno y rápido</p></div> <div class="feature svelte-1kht70a"><h3 class="svelte-1kht70a">📱 Responsive</h3> <p class="svelte-1kht70a">Diseño adaptable</p></div> <div class="feature svelte-1kht70a"><h3 class="svelte-1kht70a">⚡ Performance</h3> <p class="svelte-1kht70a">Optimizado para velocidad</p></div></div> </section>`;
});
export {
  Page as default
};
