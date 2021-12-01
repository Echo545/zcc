<script>
  import Username from "./Username.svelte";


export let author_id;
export let plain_body;
export let public_comment; // public in API
export let created_at;


</script>

<div class="comment">
  <h5><Username requester_id={author_id}/></h5>
  <div class="comment-body">
    <h6>{created_at}</h6>
    <p>
      {plain_body}
    </p>
  </div>
</div>


{#if !public_comment}
<style>
    .comment {
        background-color: "--light-red";
    }
</style>
{/if}