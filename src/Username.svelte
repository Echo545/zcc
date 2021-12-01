<script>
  import auth from "../Auth.js";
  import { onMount } from "svelte";

  export let requester_id;
  const user_url = `https://zcccodingchallenge54.zendesk.com/api/v2/users/${requester_id}/identities`;

  let result = [];
  let user_data = null;
  let invalid_user = false;

  var headers = new Headers();
  headers.append("Authorization", "Bearer " + auth.token);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  onMount(async () => {
    try {
      const response = await fetch(user_url, requestOptions);
      result = await response.json();
      user_data = result.identities[0];
    } catch (error) {
      invalid_user = true;
      console.log(error);
    }
  });
</script>

{#if user_data}
  {user_data.value}
{:else if invalid_user}
  N/A
{:else}
  <i>loading...</i>
{/if}
