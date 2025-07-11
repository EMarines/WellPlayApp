

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.f0a4d3b6.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.6a6d9526.js"];
export const stylesheets = ["_app/immutable/assets/0.7c7e52d2.css"];
export const fonts = [];
