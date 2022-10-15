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

<h1 class="text-center font-light text-5xl text-salmon relative pt-11">
	<span class="relative uppercase z-10">{title}</span>
	<amp-img
		class="absolute top-[9px] bg-maygray"
		style="left: calc(50% - 50px);"
		alt="salmon fit fish logo"
		src={salmonfitFishLogo}
		width="84"
		height="46"><ImgPlaceholder /></amp-img
	>
</h1>
<p class="text-center font-light mb-3 px-7 text-xs text-salmon">{description}</p>
<Social />
