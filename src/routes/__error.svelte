<script lang="ts" context="module">
  import Error from '$components/Error.svelte';

  export function load({ status }) {
    return {
      props: {
        status
      }
    };
  }
</script>

<script lang="ts">
  export let status;
</script>

<Error {status} />
