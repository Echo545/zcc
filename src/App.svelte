<script>
  import { onMount } from "svelte";
  import ListEntry from "./ListEntry.svelte";

  const PAGE_COUNT = 25;
  let tickets_url = `https://zcccodingchallenge54.zendesk.com/api/v2/tickets?page[size]=${PAGE_COUNT}`;

  export let key;

  let result = [];
  let error = null;
  let tickets = null;

  var headers = new Headers();
  headers.append("Authorization", "Bearer " + key);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  onMount(async () => {
    try {
      const response = await fetch(tickets_url, requestOptions);
      result = await response.json();
      tickets = result.tickets;
    } catch (e) {
      error = e;
      //   console.log(e);
    }
  });

function listEntryPackage(ticket) {
	return {
		subject: ticket.subject,
		requester_id: ticket.requester_id,
		created_at: ticket.created_at,
		priority: ticket.priority,
		updated_at: ticket.updated_at,
		status: ticket.status,
	};
  };
  //   function getPage(url, key) {
  //     let result = [];

  //     var headers = new Headers();
  //     headers.append("Authorization", "Bearer " + key);

  //     var requestOptions = {
  //       method: "GET",
  //       headers: headers,
  //       redirect: "follow",
  //     };

  //     return fetch(url, requestOptions);
  //   }

  //   let r = getPage(tickets_url, key);
  //   let abc;
</script>

<!-- <main> -->
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
            {#if !error}
              <p class="text-primary m-0 fw-bold">All Tickets</p>
            {:else}
              <h3>😢</h3>
            {/if}
          </div>
          {#if !error}
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
                    {#if tickets}
                      {#each tickets as ticket}
                        <ListEntry {...listEntryPackage(ticket)} />
                      {:else}
                        <p>loading</p>
                      {/each}
                    {:else}
                      API Unavailable
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
              <div class="row d-xl-flex justify-content-xl-center">
                <div
                  class="col-xl-4 d-xl-flex justify-content-xl-end align-items-xl-center"
                >
                  <button class="btn btn-primary" type="button">
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
                    </svg>Previous Page</button
                  >
                </div>
                <div
                  class="col-xl-2 d-xl-flex justify-content-xl-center align-items-xl-center"
                >
                  <p class="lead text-secondary d-xl-flex">
                    Displaying 1-25 of 100
                  </p>
                </div>
                <div
                  class="col-xl-4 d-xl-flex justify-content-xl-start align-items-xl-center"
                >
                  <button class="btn btn-primary" type="button"
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
</div>
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script> -->
<!-- <script src="assets/js/bs-init.js"></script> -->
<!-- <script src="assets/js/theme.js"></script> -->

<!-- {#await r}
    Loading, please wait...
  {:then results}
	  {console.log(r)}
	  Results: {console.log(results)}

	  {abc = results.json()}
	  {abc}

	  {#await results.json()}
	  	Loading tickets into JSON
  		{:then tickets}


		{:catch error}
		  Something went wrong: {error.message}
		{/await} -->

<!-- {#each tickets as ticket}
      <p>
        {#if ticket.status == "open"}
          O:
        {:else if (ticket.status = "closed")}
          C:
        {:else if (ticket.status = "pending")}
          P:
        {:else if (ticket.status = "new")}
          N:
        {:else}
          S:
        {/if}

        <a href={ticket.url}> {ticket.id} : {ticket.subject}</a>
      </p>
    {/each} -->
<!-- {:catch error}
    Something went wrong: {error.message}
  {/await} -->

<!-- <Request url="{tickets_url}," token={key} /> -->

<!-- </main> -->
<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    /* font-size: 4em; */
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  #error-message {
    margin-top: 5%;
    padding-bottom: 5%;
    text-align: center;
  }
</style>
