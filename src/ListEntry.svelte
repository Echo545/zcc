<script>
  import { current_ticket } from "./stores.js";
  import Icon from "./Icon.svelte";
  import Username from "./Username.svelte";

  export let ticket;

  //   Initial setup
  current_ticket.set(ticket);
  let subject = $current_ticket.subject;
  let requester_id = $current_ticket.requester_id;
  let created_at = $current_ticket.created_at;
  let priority = $current_ticket.priority;
  let updated_at = $current_ticket.updated_at;
  let status = $current_ticket.status;

  // Convert dates to readable format
  let created_date = new Date(created_at);
  let updated_date = new Date(updated_at);

  /**
   * Click handler to load ticket details for selected ticket when clicked
   */
  function handleClick() {
    current_ticket.set(ticket);
  }
</script>

<tr
  on:click={handleClick}
  data-bs-target="#ticket-modal"
  data-bs-toggle="modal"
>
  <td>
    <!-- Display the ticket's icon -->
    <Icon {status}/>
  </td>
  <td>{subject}</td>
  <td>
    <Username {requester_id} />
  </td>
  <td>
    <!-- Display the date in local time -->
    {created_date.toLocaleDateString()}
  </td>
  <td>
    <!-- Display priority if there is one -->
    {#if priority}
      {priority}
    {:else}
      -
    {/if}
  </td>
  <td>{updated_date.toLocaleDateString()}</td>
</tr>

<style>
  tr:hover {
    background-color: rgba(173, 216, 230, 0.35);
    cursor: pointer;
  }
</style>
