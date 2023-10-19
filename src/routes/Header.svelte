<script lang="ts">
	import salmonfitFishLogo from '$lib/assets/salmonfit-fish.png';
	import Social from '$lib/components/Social.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	export let title: string;
	export let description: string;

	const [d1, d2] = description.split('Available');
</script>

<div class="absolute right-4 top-2 z-10">
	<ThemeSwitcher />
</div>

<svelte:head>
	<link rel="preload" as="image" href={salmonfitFishLogo} />
</svelte:head>

<h1 class="text-center font-light text-5xl text-salmon relative pt-11">
	<a href="/">
		<span class="relative uppercase z-10">{title}</span>
		<img
			class="absolute top-[9px] bg-[#ffffff] dark:bg-[#06080f] left-[calc(50%-50px)]"
			alt="salmon fit fish logo"
			src={salmonfitFishLogo}
			width="84"
			height="46"
			loading="lazy"
		/>
	</a>
</h1>
<p class="text-center font-light mt-1 mb-3 px-7 text-xs text-salmon">{d1}<br />Available{d2}</p>

<div class="flex flex-wrap px-5 w-[370px] lg:w-[580px] mx-auto justify-center">
	<Social />
</div>
