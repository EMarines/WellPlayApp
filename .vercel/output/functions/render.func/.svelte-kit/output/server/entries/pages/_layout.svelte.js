import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const app = "";
const NavBar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ":root{--navbar-bg:rgba(255, 255, 255, 0.95);--navbar-shadow:0 2px 20px rgba(0, 0, 0, 0.1);--logo-color-1:#ffd700;--logo-color-2:#ff6b35;--primary-color:#667eea;--secondary-color:#764ba2;--text-color:#333;--nav-link-hover:#667eea;--border-radius:8px}.navbar.svelte-szyezb{position:fixed;top:0;left:0;right:0;background:var(--navbar-bg);backdrop-filter:blur(10px);box-shadow:var(--navbar-shadow);z-index:1000;padding:0.5rem 0}.navbar-container.svelte-szyezb{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;justify-content:space-between;align-items:center}.navbar-brand.svelte-szyezb{display:flex;align-items:center}.logo-link.svelte-szyezb{text-decoration:none;font-size:1.8rem;font-weight:700}.logo.svelte-szyezb{background:linear-gradient(45deg, var(--logo-color-1), var(--logo-color-2));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:2px 2px 4px rgba(0, 0, 0, 0.1);transition:all 0.3s ease}.logo.svelte-szyezb:hover{transform:scale(1.05)}.navbar-menu.svelte-szyezb{display:flex;align-items:center}.navbar-nav.svelte-szyezb{display:flex;list-style:none;margin:0;padding:0;align-items:center;gap:0.5rem}.nav-item.svelte-szyezb{margin:0}.nav-link.svelte-szyezb{display:block;padding:0.75rem 1rem;color:var(--text-color);text-decoration:none;font-weight:500;border-radius:var(--border-radius);transition:all 0.3s ease;position:relative}.nav-link.svelte-szyezb:hover{color:var(--nav-link-hover);background:rgba(102, 126, 234, 0.1);transform:translateY(-1px)}.nav-link.active.svelte-szyezb{color:var(--nav-link-hover);background:linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));border-bottom:2px solid var(--nav-link-hover)}.profile.svelte-szyezb{margin-left:1rem}.profile-avatar.svelte-szyezb{width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid var(--primary-color);cursor:pointer;transition:all 0.3s ease}.profile-avatar.svelte-szyezb:hover{transform:scale(1.1);box-shadow:0 4px 15px rgba(102, 126, 234, 0.3)}.avatar-img.svelte-szyezb{width:100%;height:100%;object-fit:cover;background:linear-gradient(135deg, var(--primary-color), var(--secondary-color))}.mobile-menu-btn.svelte-szyezb{display:none;background:none;border:none;padding:0.5rem;cursor:pointer;flex-direction:column;gap:3px}.hamburger.svelte-szyezb{width:25px;height:3px;background:var(--text-color);transition:all 0.3s ease}.hamburger.svelte-szyezb::before,.hamburger.svelte-szyezb::after{content:'';width:25px;height:3px;background:var(--text-color);display:block;transition:all 0.3s ease}.hamburger.svelte-szyezb::before{transform:translateY(-8px)}.hamburger.svelte-szyezb::after{transform:translateY(5px)}@media(max-width: 768px){.navbar-menu.svelte-szyezb{display:none}.mobile-menu-btn.svelte-szyezb{display:flex}.logo-link.svelte-szyezb{font-size:1.5rem}}body{padding-top:80px}",
  map: null
};
let name = "WellPlay";
function isActive(path) {
  if (typeof window !== "undefined") {
    return window.location.pathname === path;
  }
  return false;
}
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="navbar svelte-szyezb"><div class="navbar-container svelte-szyezb"> <div class="navbar-brand svelte-szyezb"><a href="/" class="logo-link svelte-szyezb"><span class="logo svelte-szyezb">${escape(name)}</span></a></div>  <div class="navbar-menu svelte-szyezb"><ul class="navbar-nav svelte-szyezb"><li class="nav-item svelte-szyezb"><a href="/" class="${["nav-link svelte-szyezb", isActive("/") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1bdbvta">Home</a></li> <li class="nav-item svelte-szyezb"><a href="/retos" class="${["nav-link svelte-szyezb", isActive("/retos") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-10cwh40">Retos</a></li> <li class="nav-item svelte-szyezb"><a href="/blog" class="${["nav-link svelte-szyezb", isActive("/blog") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-15r40xp">Blog</a></li> <li class="nav-item svelte-szyezb"><a href="/store" class="${["nav-link svelte-szyezb", isActive("/store") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1idk0w8">Store</a></li> <li class="nav-item svelte-szyezb"><a href="/chat" class="${["nav-link svelte-szyezb", isActive("/chat") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-fb7xbf">Chat</a></li> <li class="nav-item svelte-szyezb"><a href="/about" class="${["nav-link svelte-szyezb", isActive("/about") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-ibkzp0">About</a></li> <li class="nav-item profile svelte-szyezb" data-svelte-h="svelte-kdzs2j"><div class="profile-avatar svelte-szyezb"><img src="/profile-placeholder.svg" alt="Perfil" class="avatar-img svelte-szyezb"></div></li></ul></div>  <button class="mobile-menu-btn svelte-szyezb" aria-label="Toggle menu" data-svelte-h="svelte-14hrf3u"><span class="hamburger svelte-szyezb"></span></button></div> </nav>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1vrhygq{display:flex;flex-direction:column;min-height:100vh}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})} <main class="svelte-1vrhygq">${slots.default ? slots.default({}) : ``} </main>`;
});
export {
  Layout as default
};
