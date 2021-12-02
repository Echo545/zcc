import { token, domain } from "../Auth.js";
import { global_tickets } from "./stores.js";
import { has_more } from "./stores.js";
import { prev_page_url } from "./stores.js";
import { next_page_url } from "./stores.js";
import { ticket_count } from "./stores.js";
import { load_error } from "./stores.js";


// Build headers for request
var headers = new Headers();
headers.append("Authorization", "Bearer " + token);

// Set request options
var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};


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
