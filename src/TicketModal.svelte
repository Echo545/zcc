<script>
  import { current_ticket } from "./stores.js";

  import IconOpen from "./IconOpen.svelte";
  import IconPending from "./IconPending.svelte";
  import IconSolved from "./IconSolved.svelte";
  import IconClosed from "./IconClosed.svelte";
  import IconNew from "./IconNew.svelte";
  import Username from "./Username.svelte";
  import Comment from "./Comment.svelte";

  $: id = $current_ticket.id;
  $: subject = $current_ticket.subject;
  $: requester_id = $current_ticket.requester_id;
  $: created_at = $current_ticket.created_at;
  $: priority = $current_ticket.priority;
  $: updated_at = $current_ticket.updated_at;
  $: status = $current_ticket.status;
  $: description = $current_ticket.description;
  $: tags = $current_ticket.tags;
  $: follower_ids = $current_ticket.follower_ids;
  $: assignee_id = $current_ticket.assignee_id;
  $: submitter_id = $current_ticket.submitter_id;
</script>

{#if $current_ticket}
  <div class="modal fade" role="dialog" tabindex="-1" id="ticket-modal">
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
              Requester: <Username {requester_id} />
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

            <!-- If this ticket has comments -->
                    <!-- Loop through each, creating package for each and passing into comment -->
                    <!-- <Comment/> -->
            <!-- Else: elegently handle no comments -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
