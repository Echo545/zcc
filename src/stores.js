import { writable } from 'svelte/store';

export const current_ticket = writable(null);
export const global_tickets = writable(null);
export const has_more = writable(null);
export const prev_page_url = writable(null);
export const next_page_url = writable(null);
export const ticket_count = writable(null);
export const load_error = writable(null);

export const names_cache = writable(new Map());