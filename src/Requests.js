import { token, domain } from "../Auth.js";
import { global_tickets } from "./stores.js";
import { has_more } from "./stores.js";
import { prev_page_url } from "./stores.js";
import { next_page_url } from "./stores.js";
import { ticket_count } from "./stores.js";
import { load_error } from "./stores.js";
import { names_cache } from "./stores.js";


// Build headers for request
let authorization = `Bearer ${token}`;

// Set request options
let requestOptions = {
  method: "GET",
  headers: {
    'Authorization': authorization},
  redirect: "follow",
};


/**
 * Finds the user's name using their id.
 *
 * @return the user's name as a string, or null if it doesn't exist.
 */
export async function loadName(requester_id)
{
  const USER_URL = `${domain}/api/v2/users/${requester_id}`;
  let cache;

  // Subscribe to names_cache
  names_cache.subscribe(m => {
    cache = m;
  });

  // Attempt to load name from cache first
  let name = cache.get(requester_id);

  try {
    if (!name) {
      const response = await fetch(USER_URL, requestOptions);
      let result = await response.json();

      name = result.user.name;

      // Cache name to reduce future API calls
      cache.set(requester_id, name);
      names_cache.set(cache);
    }
  } catch (error) {
    console.log(error);
    name = null;
  }

  return name;
}



/**
 * Requests all the comments for a given ticket.
 *
 * @param {int} ticket_id The ID of the ticket
 * @returns All the comments for a ticket aside from the original description
 */
export async function LoadComments(ticket_id)
{

  const URL = `${domain}/api/v2/tickets/${ticket_id}/comments`;
  let comments = [];

  try {
    let response = await fetch(URL, requestOptions);
    let result = await response.json();
    let comment_count = result.count;
    let all_comments = result.comments;

    // If there are comments beyond the original message
    if (comment_count > 1) {
      comments = all_comments;

      // Get all comments except the original message
      comments.shift();
    }

  } catch (error) {
    console.log(error);
  }

  return comments;
}


/**
 * Requests the tickets for a given page and stores them.
 *
 * @param {String} url The url to request tickets from
 */
export async function LoadTickets(url)
{
  let count_url = `${domain}/api/v2/tickets/count`;

  try {
    // Make tickets request
    let response = await fetch(url, requestOptions);

    //  Load tickets
    let result = await response.json();
    global_tickets.set(result.tickets);

    // Page check
    has_more.set(result.meta.has_more);
    prev_page_url.set(result.links.prev);
    next_page_url.set(result.links.next);

    // Request counts
    response = await fetch(count_url, requestOptions);
    result = await response.json();
    ticket_count.set(result.count.value);

    // No errors, clear load_error
    load_error.set(null);

  } catch (err) {

    // Log and store error
    load_error.set(err);
    console.log(err);
  }
}
