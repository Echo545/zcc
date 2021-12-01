import { writable } from 'svelte/store';

export const current_ticket = writable(null);
export const global_tickets = writable(null);
export const has_more = writable(null);
export const prev_page_url = writable(null);
export const next_page_url = writable(null);
export const ticket_count = writable(null);
export const load_error = writable(null);

function cache () {
    const m = new Map();
    const {subscribe, set, update} = writable(m);

    // return {
	// 	subscribe,
	// 	set: (k ,v) => {m.set(k, v)},
    //     isCached: (v) => {return m.has(v);}
	// };
    return {
		subscribe,
		// set: (k ,v) => update(m => m.set(k, v)),
		set: (k ,v) => {m => m.set(k, v)},
        has: (v) => {return m.has(v);}
	};
}

// export const names_cache = writable(new Map());
export const names_cache = cache();