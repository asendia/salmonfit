<script lang="ts">
	import type { Food } from '$lib/menuItems';
	import chevronLeft from '$lib/assets/chevron-left.svg';
	import Social from '$lib/components/Social.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { protoDomain } from '$lib/url';
	import { homeVisit } from '$lib/stores/homeVisit';
	export let data: { food: Food };
	export const food = data.food;
	export const ogImageFullUrl = protoDomain + food.photoHref;
	const infoInline = food.info.join(', ');
	export const descriptionWithInfo = food.description + ` (${infoInline})`;
	export const prerender = true;
	export let hasVisitedHome = false;
	homeVisit.subscribe((val) => {
		hasVisitedHome = val;
	});
</script>

<svelte:head>
	<title>{food.name}</title>
	<meta name="description" content={descriptionWithInfo} />
	<meta property="og:title" content={food.name} />
	<meta property="og:description" content={descriptionWithInfo} />
	<meta property="og:type" content="food" />
	<meta property="og:url" content={protoDomain} />
	<meta property="og:image" content={ogImageFullUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@salmonfit" />
	<meta name="twitter:creator" content="@salmonfit" />
	<meta name="twitter:title" content={food.name} />
	<meta name="twitter:description" content={descriptionWithInfo} />
	<meta name="twitter:image" content={ogImageFullUrl} />
	<link rel="canonical" href={protoDomain} />
</svelte:head>

<div class="w-full md:max-w-[800px] 2xl:max-w-[1500px] mx-auto relative min-h-[80vh]">
	<img
		layout="responsive"
		class="lg:rounded-lg"
		src={food.photoHref}
		title={food.name}
		alt={food.name}
		width="1500"
		height="1000"
		loading="lazy"
	/>
	<a
		href="/"
		class="absolute block top-4 left-4 bg-white bg-opacity-50 rounded-full w-[30px] h-[30px] pt-[5px] pl-[4px] cursor-pointer"
		on:click={() => {
			if (hasVisitedHome) {
				window.history.back();
			}
		}}
	>
		<img src={chevronLeft} alt="Home" title="Home" width="20" height="20" loading="lazy" />
	</a>
	<div class="px-6">
		<h1 class="text-xl mt-4">{food.name}</h1>
		<ul class="flex list-disc mt-2 marker:text-salmon text-xs text-[#d5d6d7] pl-4">
			{#each food.info as info}
				<li>{info}</li>
			{/each}
		</ul>
		<p class="py-2 text-[#95979a]">
			{food.description}
		</p>
		<div class="lg:flex items-center">
			<h2 class="lg:mb-3">Order now:</h2>
			<div class="flex flex-wrap mt-3 lg:mt-0">
				<Social />
			</div>
		</div>
	</div>
</div>
<Footer />
