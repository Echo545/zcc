<script>
  import { current_ticket } from "./stores.js";
  import IconOpen from "./IconOpen.svelte";
  import IconPending from "./IconPending.svelte";
  import IconSolved from "./IconSolved.svelte";
  import IconClosed from "./IconClosed.svelte";
  import IconNew from "./IconNew.svelte";

  import Username from "./Username.svelte";

  export let ticket;
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

  // Loads Ticket details for clicked ticket
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
    {#if status == "open"}
      <IconOpen />
    {:else if status == "solved"}
      <IconSolved />
    {:else if status == "pending"}
      <IconPending />
    {:else if status == "new"}
      <IconNew />
    {:else}
      <IconClosed />
    {/if}
  </td>
  <td>{subject}</td>
  <td>
    <Username {requester_id} />
  </td>
  <td>
    {created_date.toLocaleDateString()}
  </td>
  <td>
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
