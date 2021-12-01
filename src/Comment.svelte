<script>
  import Username from "./Username.svelte";

  //   Class to add styling if comment is internal
  $: privateStatus = public_comment ? "" : "comment-body-private";

  export let author_id;
  export let plain_body;
  export let public_comment;
  export let created_at;
</script>

<div class="comment">
  <h5>
    <!-- Find username -->
    <Username requester_id={author_id} />

    <!-- Add label for internal comment -->
    {#if !public_comment}
      <span class="private">private</span>
    {/if}
  </h5>
  <div class="comment-body {privateStatus}">
    <h6>{created_at}</h6>
    <p>
      {plain_body}
    </p>
  </div>
</div>

<style>
  .private {
    font-size: small;
    margin-left: 5%;
    border: 1px solid var(--bs-danger);
    padding-left: 1%;
    padding-right: 1%;
  }

  .comment-body {
    padding-left: 1%;
    border-left: 2px solid rgb(62, 140, 228);
  }

  .comment-body-private.comment-body {
    border-left: 2px solid rgb(228, 62, 76);
    background-color: rgba(255, 30, 30, 0.055);
  }
</style>
