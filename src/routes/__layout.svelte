<script>
  import Fonts from '$components/Fonts.svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
</script>

<svelte:head>
  <meta name="theme-color" content="#e74e35" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
  <Fonts />
</svelte:head>

<Header />
<slot />
<Footer />

<style>
  :global(body) {
    margin: 0;
  }
</style>
