<script>
  export let status;

  //   Displays the svg icon that goes with the given status
</script>

{#if status == "open"}
  <!-- Open -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icon-tabler-letter-o status open"
    data-bs-toggle="tooltip"
    data-bss-tooltip="Open"
    title="Open"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6"
    />
  </svg>
{:else if status == "solved"}
  <!-- Solved -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icon-tabler-letter-s status solved"
    data-bs-toggle="tooltip"
    data-bss-tooltip=""
    title="Solved"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M17 8a4 4 0 0 0 -4 -4h-2a4 4 0 0 0 0 8h2a4 4 0 0 1 0 8h-2a4 4 0 0 1 -4 -4"
    />
  </svg>
{:else if status == "pending"}
  <!-- Pending -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icon-tabler-letter-p status pending"
    data-bs-toggle="tooltip"
    data-bss-tooltip=""
    title="Pending"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 20v-16h5.5a4 4 0 0 1 0 9h-5.5" />
  </svg>
{:else if status == "new"}
  <!-- New -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icon-tabler-letter-n status new"
    data-bs-toggle="tooltip"
    data-bss-tooltip=""
    title="New"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 20v-16l10 16v-16" />
  </svg>
{:else}
  <!-- Closed -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icon-tabler-letter-c status closed"
    data-bs-toggle="tooltip"
    data-bss-tooltip=""
    title="Closed"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5"
    />
  </svg>
{/if}

<style>
  svg {
    width: "1em";
    height: "1em";
  }
</style>
