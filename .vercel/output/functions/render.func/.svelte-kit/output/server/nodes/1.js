

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.52480693.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bccb7b40.js","_app/immutable/chunks/singletons.fb8ca5a3.js"];
export const stylesheets = [];
export const fonts = [];
