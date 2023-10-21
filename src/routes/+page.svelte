<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ogImage from '$lib/assets/og-image-salmonfit.jpg';
	const title = 'Salmon Fit';
	const description =
		'Fusion salmon dishes, freshly made at our three locations: Kebon Jeruk, Sudirman & Haji Nawi. Available at Grab food, Go-food & Shopee Food!';
	import menuItems from '$lib/menuItems';
	import { protoDomain, urlHashFromName } from '$lib/url';
	import { homeVisit } from '$lib/stores/homeVisit';
	import Social from '$lib/components/Social.svelte';
	homeVisit.set(true);
	export const prerender = true;
	export const ogImageFullUrl = protoDomain + ogImage;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="food" />
	<meta property="og:url" content={protoDomain} />
	<meta property="og:image" content={ogImageFullUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@salmonfit" />
	<meta name="twitter:creator" content="@salmonfit" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageFullUrl} />
	<link rel="canonical" href={protoDomain} />
	{#each menuItems as cat, catID}
		{#each cat.items as item, id}
			{#if catID === 0 && item.thumbnailHref && id < 2}
				<link
					rel="preload"
					as="image"
					href={item.thumbnailHref}
					imagesrcset={`${item.thumbnailHref}, ${item.photoHref} 2x`}
				/>
			{/if}
		{/each}
	{/each}
</svelte:head>

<Header {title}>
	<span slot="description">
		{#each description.split('. ') as d}
			{d}<br />
		{/each}
	</span>
</Header>

<div class="flex flex-wrap px-5 w-[370px] lg:w-[580px] mx-auto justify-center">
	<Social />
</div>

<div class="w-full mx-auto sm:w-[640px] lg:w-[960px] 2xl:w-[1280px]">
	{#each menuItems as cat}
		<h2 class="text-center md:text-left text-2xl font-medium mt-3 mb-6">
			{cat.name}
		</h2>
		<ul class="mb-7 flex flex-wrap">
			{#each cat.items as item}
				<li
					class="list-none pb-3 mb-5 flex flex-col w-full md:w-[300px] bg-[#ffffff] md:rounded-md overflow-hidden md:mr-5 box-border md:border-gray-500 md:border dark:border-none dark:bg-[#0f151c] dark:rounded-tr-2xl dark:rounded-bl-2xl dark:rounded-tl-none dark:rounded-br-none"
				>
					<a class="flex" href="/food/{urlHashFromName(item.name)}">
						<img
							title={item.name}
							alt={item.name}
							srcset={`${item.thumbnailHref}, ${item.photoHref} 2x`}
							src={item.thumbnailHref}
							width="1000"
							height="1000"
							loading="lazy"
						/></a
					>
					<div class="px-4 flex flex-col justify-end">
						<a href="/food/{urlHashFromName(item.name)}" class="flex mt-2 outline-none">
							{item.name}
						</a>
						<ul class="flex mt-3 text-xs text-black dark:text-[#d5d6d7]">
							{#each item.info as info}
								<li class="mr-4 flex items-center">{info}</li>
							{/each}
						</ul>
						{#if item.description}
							<div class="py-2 text-[#95979a] text-xs">{item.description}</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/each}
</div>

<Footer />
