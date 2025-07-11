import { c as create_ssr_component } from "../../chunks/ssr.js";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1vrhygq{display:flex;flex-direction:column;min-height:100vh}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-1vrhygq">${slots.default ? slots.default({}) : ``} </main>`;
});
export {
  Layout as default
};
