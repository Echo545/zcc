import { onMount } from "svelte";
import auth from "../Auth.js";

import { global_tickets } from "./stores.js";
import { has_more } from "./stores.js";
import { prev_page_url } from "./stores.js";
import { next_page_url } from "./stores.js";
import { ticket_count } from "./stores.js";
import { load_error } from "./stores.js";

var headers = new Headers();
headers.append("Authorization", "Bearer " + auth.token);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};


export function LoadTickets(url)
{
  let count_url =
    "https://zcccodingchallenge54.zendesk.com/api/v2/tickets/count";


  onMount(async () =>
  {
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
  });

  // onMount(async () =>
  // {
  //   try {
  //     // Make tickets request
  //     let response = fetch(url, requestOptions);

  //     //  Load tickets
  //     let result = response.json();
  //     global_tickets.set(result.tickets);

  //     // Page check
  //     has_more.set(result.meta.has_more);
  //     prev_page_url.set(result.links.prev);
  //     next_page_url.set(result.links.next);

  //     // Request counts
  //     response = fetch(count_url, requestOptions);
  //     result = response.json();
  //     ticket_count.set(result.count.value);

  //     // No errors, clear load_error
  //     load_error.set(null);

  //   } catch (err) {

  //     // Log and store error
  //     load_error.set(err);
  //     console.log(err);
  //   }
  // });
}