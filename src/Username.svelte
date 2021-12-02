<script>
  import { token, domain } from "../Auth.js";
  import { names_cache } from "./stores";

  export let requester_id;

  //   Prepare headers for request
  var headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };


  /**
   * Finds the user's name using their id.
   *
   * @return the user's name as a string, or null if it doesn't exist.
   */
  async function loadName() {
    const USER_URL = `${domain}/api/v2/users/${requester_id}`;

    // Attempt to load name from cache first
    let name = $names_cache.get(requester_id);

    try {
      if (!name) {
        const response = await fetch(USER_URL, requestOptions);
        let result = await response.json();

        name = result.user.name;

        // Cache name
        $names_cache = $names_cache.set(requester_id, name);
      }
    } catch (error) {
      console.log(error);
      name = null;
    }

    return name;
  }

  //   Find the name
  let userName = loadName();
</script>

{#await userName}
  <i>loading...</i>
{:then n}
  {n}
{/await}
