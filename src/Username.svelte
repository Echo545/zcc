<script>
  import auth from "../Auth.js";
  import { names_cache } from "./stores";

  export let requester_id;

  const user_url = `https://zcccodingchallenge54.zendesk.com/api/v2/users/${requester_id}`;

  let result = [];

  var headers = new Headers();
  headers.append("Authorization", "Bearer " + auth.token);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  async function loadName() {

    // Attempt to load name from cache first
    let name = $names_cache.get(requester_id);

      try {
        if (!name) {

            const response = await fetch(user_url, requestOptions);
            result = await response.json();

            name = result.user.name;

            // Cache name
            $names_cache = $names_cache.set(requester_id, name);
        }

      } catch (error) {
        console.log(error);
      }

    return name;
  }

  let userName = loadName();

</script>

{#await userName}
  <i>loading...</i>
{:then n}
  {n}
{/await}
