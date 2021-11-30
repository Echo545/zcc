<script>
    import OpenIcon from "./OpenIcon.svelte";
    import Username from "./Username.svelte";

    export let subject;
    export let requester_id;
    export let created_at;  //requested
    export let priority;
    export let updated_at;
    export let status;

    let created_date = new Date(created_at);
    let updated_date = new Date(updated_at);
</script>

<tr>
    <td>

        {#if status == "open"}
            <OpenIcon/>
        {/if}
    </td>
    <td>{subject}</td>
    <td>
        <Username requester_id={requester_id} />
    </td>
    <!-- <td>{created_at}</td> -->
    <td>{created_date.toLocaleDateString()}</td>
    <td>
        {#if priority}
            {priority}
        {:else}
            -
        {/if}
    </td>
    <td>{created_date.toLocaleDateString()}</td>
</tr>

