<script>
  import IconOpen from "./IconOpen.svelte";
  import IconPending from "./IconPending.svelte";
  import IconSolved from "./IconSolved.svelte";
  import IconClosed from "./IconClosed.svelte";
  import IconNew from "./IconNew.svelte";

  import Username from "./Username.svelte";
  import TicketModal from "./TicketModal.svelte";

  $: clicked = false;

  export let subject;
  export let id;
  export let requester_id;
  export let created_at;
  export let priority;
  export let updated_at;
  export let status;
  export let description;
  export let tags;
  export let follower_ids;
  export let assignee_id;
  export let submitter_id;

  $: modalDetails = {
    subject: subject,
    requester_id: requester_id,
    created_at: created_at,
    priority: priority,
    updated_at: updated_at,
    status: status,
    id: id,
    description: description,
    tags: tags,
    follower_ids: follower_ids,
    assignee_id: assignee_id,
    submitter_id: submitter_id,
  };

  // Convert dates to readable format
  let created_date = new Date(created_at);
  let updated_date = new Date(updated_at);

  document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('#ticket-modal-${id}').classList.add("show");

});

  // Loads Ticket details for clicked ticket
  function handleClick() {
    console.log("details:");
    console.log(modalDetails);
    clicked = true;
  }
</script>

<!-- <tr
  on:click={handleClick}
  data-bs-toggle="modal"
  data-bs-target="#ticket-modal-{id}"
> -->

<!-- {#if clicked} -->
<TicketModal {...modalDetails} />
<!-- {/if} -->

<tr
  on:click={handleClick}
  data-bs-target="#ticket-modal-{id}"
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
