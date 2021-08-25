<script lang="ts">
  import { amp } from '$app/env';
  import salmonfitFishLogo from '$assets/salmonfit-fish.png';
  import ImgPlaceholder from './ImgPlaceholder.svelte';
</script>

<svelte:head>
  <link rel="preload" as="image" href={salmonfitFishLogo} />
</svelte:head>

<h1 class="title">
  SALMON FIT
  {#if amp}
    <amp-img
      class="fish-logo"
      alt="salmon fit fish logo"
      src={salmonfitFishLogo}
      width="84"
      height="46"><ImgPlaceholder /></amp-img
    >
  {:else}
    <img
      class="fish-logo"
      alt="salmon fit fish logo"
      src={salmonfitFishLogo}
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
    padding-top: 44px;
    margin: 0;
  }
  .fish-logo {
    position: absolute;
    top: 9px;
    left: calc(50% - 50px);
  }
</style>
