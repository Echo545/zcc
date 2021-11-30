<script>

import { onMount } from "svelte";

export let url;
export let token;

var headers = new Headers();
headers.append("Authorization", "Bearer " + token);

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

let results = [];

onMount(async () => {
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => results=result)
    .catch((error) => console.log("error", error));
});

</script>