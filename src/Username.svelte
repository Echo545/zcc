<script>
  import {loadName} from "./Requests";

  export let requester_id;

  //   Find the name
  let userName = loadName(requester_id);
</script>

{#await userName}
  <i>loading...</i>
{:then n}
  {n}
{/await}
