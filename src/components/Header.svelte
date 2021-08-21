<script lang="ts">
  import { amp } from '$app/env';
</script>

<svelte:head>
  <link rel="preload" as="image" href="/salmonfit-fish.png" />
</svelte:head>

<h1 class="title">
  SALMON FIT
  {#if amp}
    <amp-img
      class="fish-logo"
      alt="salmon fit fish logo"
      src="/salmonfit-fish.png"
      width="84"
      height="46"
    />
  {:else}
    <img
      class="fish-logo"
      alt="salmon fit fish logo"
      src="/salmonfit-fish.png"
      width="84"
      height="46"
    />
  {/if}
</h1>

<style>
  .title {
    text-align: center;
    font-weight: 300;
    font-size: 50px;
    color: #e74e35;
    position: relative;
    padding-top: 35px;
    margin: 9px 0 0;
  }
  .fish-logo {
    position: absolute;
    top: 0;
    left: calc(50% - 50px);
  }
</style>
