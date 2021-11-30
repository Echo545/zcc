<script>
  import IconOpen from "./IconOpen.svelte";
  import IconPending from "./IconPending.svelte";
  import IconSolved from "./IconSolved.svelte";
  import IconClosed from "./IconClosed.svelte";
  import IconNew from "./IconNew.svelte";

  import Username from "./Username.svelte";

  export let subject;
  export let requester_id;
  export let created_at;
  export let priority;
  export let updated_at;
  export let status;

  // Convert dates to readable format
  let created_date = new Date(created_at);
  let updated_date = new Date(updated_at);
</script>

<tr>
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
  }
</style>
