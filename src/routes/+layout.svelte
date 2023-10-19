<script lang="ts">
	import '../app.css';
	import Fonts from '$lib/components/Fonts.svelte';
</script>

<svelte:head>
	<meta name="theme-color" content="#06080f" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
	<Fonts />
</svelte:head>

<div class="bg-[#ffffff] text-black dark:bg-[#06080f] dark:text-white">
	<slot />
</div>
