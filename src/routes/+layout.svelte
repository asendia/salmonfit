<script lang="ts">
	import Fonts from './Fonts.svelte';
	import stackedPeaksImage from '$lib/assets/stacked-peaks-haikei.svg';
</script>

<svelte:head>
	<meta name="theme-color" content="#2c2c2c" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
	<Fonts />
</svelte:head>

<div class="background" style="--stacked-peaks-image: url({stackedPeaksImage})">
	<slot />
</div>

<style>
	:global(body) {
		margin: 0;
		color: #fff;
		background-color: #2c2c2c;
	}
	:global(amp-img) {
		background-color: #7c4641;
	}
	.background {
		background-image: var(--stacked-peaks-image);
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
