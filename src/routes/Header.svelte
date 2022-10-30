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
	<a href="/">
		<span class="relative uppercase z-10">{title}</span>
		<amp-img
			class="absolute top-[9px] bg-[#06080f]"
			style="left: calc(50% - 50px);"
			alt="salmon fit fish logo"
			src={salmonfitFishLogo}
			width="84"
			height="46"><ImgPlaceholder /></amp-img
		>
	</a>
</h1>
<p class="text-center font-light mt-1 mb-3 px-7 text-xs text-salmon">{description}</p>

<div class="flex flex-wrap px-5 w-[370px] lg:w-[688px] mx-auto">
	<Social />
</div>
