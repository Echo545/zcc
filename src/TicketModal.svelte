<script>

  import IconOpen from "./IconOpen.svelte";
  import IconPending from "./IconPending.svelte";
  import IconSolved from "./IconSolved.svelte";
  import IconClosed from "./IconClosed.svelte";
  import IconNew from "./IconNew.svelte";
  import Username from "./Username.svelte";

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

</script>

<!-- <div class="modal fade show" style="display:block;" role="dialog" tabindex="-1" id="ticket-modal-{id}"> -->
<div class="modal fade" role="dialog" tabindex="-1" id="ticket-modal-{id}">
  <div
    class="modal-dialog modal-xl modal-dialog-centered"
    role="document"
    id="modal-diag"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">
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
          Subject: {subject}
        </h3>

        {#if priority}
          <span class="font-monospace" id="priority">
            {priority}
          </span>
        {/if}

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div class="modal-body comment" id="modal-b">
        <div class="container">
          <h5>
            Requester: <Username {requester_id}/>
          </h5>

          <div id="ticket-body-organizer">
            <div class="row">
              <div class="col-7">
                <p id="description">
                  {description}
                </p>
              </div>
              <div class="col" id="meta-col">
                <div class="ticket-details">
                  <p>Submitter: <Username requester_id={submitter_id} /></p>

                  <p>Assignee: <Username requester_id={assignee_id} /></p>

                  <p>
                    Followers:
                    {#if follower_ids}
                      {#each follower_ids as f_id}
                        <Username {f_id} />,
                      {/each}
                    {/if}
                  </p>

                  <p>
                    Tags:
                    {#if tags}
                      {#each tags as tag}
                        {tag},
                      {/each}
                    {/if}
                  </p>

                  <!-- TODO: make these dates readable -->
                  <p>Created: {created_at}</p>
                  <p>Updated: {updated_at}</p>
                </div>
              </div>
            </div>
          </div>
          <h5>Comments</h5>
          <hr class="comment-hr" />
          <div id="comment-organizer">
            <!-- TODO: comments -->

            <div class="comment">
              <h5>Evan Richards</h5>
              <div class="comment-body">
                <h6>11/26/21 5:30pm</h6>
                <p>
                  This is a serious problem and we must work quickly to resolve
                  it. What ever will we do?! This is a serious problem and we
                  must work quickly to resolve it. What ever will we do?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>

  </script>
</div>

