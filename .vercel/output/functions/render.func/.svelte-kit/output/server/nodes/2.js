

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.8abc9b50.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bccb7b40.js"];
export const stylesheets = ["_app/immutable/assets/2.3f42888f.css"];
export const fonts = [];
