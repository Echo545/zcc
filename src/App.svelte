<script>
  import { current_ticket } from "./stores.js";
  import { global_tickets } from "./stores.js";
  import { next_page_url } from "./stores";
  import { prev_page_url } from "./stores";
  import { has_more } from "./stores";
  import { ticket_count } from "./stores.js";
  import { load_error } from "./stores";

  import { LoadTickets } from "./Requests.js";

  import ListEntry from "./ListEntry.svelte";
  import TicketModal from "./TicketModal.svelte";

  const PAGE_COUNT = 25;

  // lowerBound += page_count with each page turn forward
  $: lowerBound = 1;
  $: upperBound = PAGE_COUNT;

  //   current_page += 1 with every page turn forward and -= 1 for each backwards
  let current_page = 0;
  let tickets_url = `https://zcccodingchallenge54.zendesk.com/api/v2/tickets?page[size]=${PAGE_COUNT}`;

  export let key;

  let backButtonStatus = "disabled";
  let forwardButtonStatus = "";

  var headers = new Headers();
  headers.append("Authorization", "Bearer " + key);

  let loading = LoadTickets(tickets_url);

  function checkPage() {


    if ($has_more) {
      forwardButtonStatus = "enabled";
    } else {
		forwardButtonStatus = "disabled";
    }

    if (current_page > 0) {
		backButtonStatus = "enabled";
    } else {
		backButtonStatus = "disabled";
    }

	// Calculate bounds for display
	lowerBound = PAGE_COUNT * current_page + 1;
	upperBound = lowerBound + PAGE_COUNT;

	if (upperBound > PAGE_COUNT) {
		upperBound -= $ticket_count % PAGE_COUNT;
	}
	if (upperBound > $ticket_count) {
		upperBound = $ticket_count;
	}

  }

  function prevPage() {
    if (current_page > 0) {
      current_page -= 1;
      loading = LoadTickets($prev_page_url);
    }

    checkPage();
  }

  function nextPage() {
    if ($has_more) {
      current_page += 1;
      loading = LoadTickets($next_page_url);
    }

    checkPage();
  }

  checkPage();
</script>

<div id="wrapper">
  <div class="d-flex flex-column" id="content-wrapper">
    <div id="content">
      <nav
        class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top"
        style="opacity: 0.75;"
      >
        <div class="container-fluid">
          <h1 class="font-monospace text-start">Zendesk Ticket Viewer</h1>
        </div>
      </nav>
      <div class="container-fluid">
        <div class="card shadow">
          <div class="card-header py-3">
            {#if !$load_error}
              <p class="text-primary m-0 fw-bold">All Tickets</p>
            {:else}
              <h3>😢</h3>
            {/if}
          </div>
          {#if !$load_error}
            {#await loading}
              Loading, please wait...
            {:then loaded}
              <div class="card-body">
                <div
                  class="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table class="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Subject</th>
                        <th>Requester</th>
                        <th>Requested</th>
                        <th>Priority</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#if $global_tickets}
                        {#each $global_tickets as ticket}
                          <ListEntry {ticket} />
                        {:else}
                          <p>loading...</p>
                        {/each}
                      {:else}
                        <p>loading...</p>
                      {/if}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td><strong>Status</strong></td>
                        <td><strong>Subject</strong></td>
                        <td><strong>Requester</strong></td>
                        <td><strong>Requested</strong></td>
                        <td><strong>Priority</strong></td>
                        <td><strong>Updated</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="row d-flex justify-content-center">
                  <div
                    class="col-4 d-flex justify-content-end align-items-center"
                  >
                    <button
                      class="btn btn-primary {backButtonStatus}"
                      type="button"
                      id="back-button"
                      on:click={prevPage}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 19L8 12L15 5"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>Prev Page</button
                    >
                  </div>
                  <div
                    class="col-2 d-flex justify-content-center align-items-center"
                  >
                    <p class="text-secondary">
                      Displaying {lowerBound}-{upperBound} of

                      <!-- Total number of tickets -->
                      {#if $ticket_count}
                        {$ticket_count}
                      {:else}
                        <i>loading...</i>
                      {/if}
                    </p>
                  </div>
                  <div
                    class="col-4 d-flex justify-content-start align-items-center"
                  >
                    <button
                      class="btn btn-primary"
                      type="button"
                      {forwardButtonStatus}
                      on:click={nextPage}
                      >Next Page
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 5L16 12L9 19"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            {/await}
          {:else}
            <h4 id="error-message">
              Sorry, the API is currently unavailable
              <p>See the console for a detailed error message.</p>
            </h4>
          {/if}
        </div>
      </div>
    </div>
    <footer class="bg-white sticky-footer">
      <div class="container my-auto">
        <div class="text-center my-auto copyright" />
      </div>
    </footer>
  </div>

  {#if $current_ticket}
    <TicketModal />
  {/if}
</div>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
  }

  #error-message {
    margin-top: 5%;
    padding-bottom: 5%;
    text-align: center;
  }
</style>
