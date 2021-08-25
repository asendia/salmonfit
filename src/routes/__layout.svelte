<script>
  import Fonts from '$components/Fonts.svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import { amp, dev } from '$app/env';
  import stackedPeaksImage from '$assets/stacked-peaks-haikei.svg';
</script>

<svelte:head>
  <meta name="theme-color" content="#e74e35" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
  <Fonts />
</svelte:head>

<div class="background" style="--stacked-peaks-image: url({stackedPeaksImage})">
  <Header />
  <slot />
  <Footer />
</div>
{#if amp && !dev}
  <amp-install-serviceworker
    src="/service-worker.js"
    data-iframe-src="https://salmonfit.com"
    layout="nodisplay"
  />
{/if}

<style>
  :global(body) {
    margin: 0;
    color: #fff;
    background-color: #2c2c2c;
  }
  .background {
    background-image: var(--stacked-peaks-image);
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
