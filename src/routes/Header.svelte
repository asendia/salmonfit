<script lang="ts">
	import salmonfitFishLogo from '$lib/assets/salmonfit-fish.png';
	import ImgPlaceholder from './ImgPlaceholder.svelte';
	import Social from './Social.svelte';
	export let title: string;
	export let description: string;
</script>

<svelte:head>
	<link rel="preload" as="image" href={salmonfitFishLogo} />
</svelte:head>

<h1 class="title">
	<span class="title-text">{title}</span>
	<amp-img
		class="fish-logo"
		alt="salmon fit fish logo"
		src={salmonfitFishLogo}
		width="84"
		height="46"><ImgPlaceholder /></amp-img
	>
</h1>
<p class="headline">{description}</p>
<Social />

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
	.title-text {
		position: relative;
		text-transform: uppercase;
		z-index: 1;
	}
	.fish-logo {
		position: absolute;
		top: 9px;
		left: calc(50% - 50px);
		background: #2c2c2c;
	}
	.headline {
		text-align: center;
		font-weight: 300;
		margin: 0 0 11px;
		padding: 0 30px;
		font-size: 12px;
		color: #e74e35;
	}
</style>
