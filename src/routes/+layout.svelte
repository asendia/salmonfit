<script lang="ts">
	import '../app.css';
	import stackedPeaksImage from '$lib/assets/stacked-peaks-haikei.svg';
</script>

<svelte:head>
	<meta name="theme-color" content="#2c2c2c" />
	<link rel="manifest" href="/manifest.json" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
</svelte:head>

<div class="bg-cover bg-no-repeat" style="background-image: url({stackedPeaksImage})">
	<slot />
</div>
