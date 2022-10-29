<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import ogImage from '$lib/assets/og-image-salmonfit.jpg';
	const title = 'Salmon Fit';
	const description =
		'Fusion salmon dishes from Kebon Jeruk. Available at Grab food, Go-food & Shopee Food!';
	import menuItems from '$lib/menuItems';
	import ImgPlaceholder from './ImgPlaceholder.svelte';
	import { urlHashFromName } from './url';
	export const csr = false;
	export const prerender = true;
	export const protoDomain = 'https://salmonfit.com';
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
			{#if catID === 0 && item.imgHref && id < 2}
				<link rel="preload" as="image" href={item.imgHref} />
			{/if}
		{/each}
	{/each}
</svelte:head>

<Header {title} {description} />
<div class="w-[300px] mx-auto sm:w-[640px] lg:w-[960px] 2xl:w-[1280px]">
	{#each menuItems as cat, catID}
		<h3 id={urlHashFromName(cat.name)} class="text-2xl font-medium mt-3 mb-6">
			<a href="#{urlHashFromName(cat.name)}">{cat.name}</a>
		</h3>
		<ul class="mb-7 flex flex-wrap">
			{#each cat.items as item, itemID}
				<li
					id={urlHashFromName(item.name)}
					class="list-none pb-3 mb-5 flex flex-col w-[300px] bg-[#0f151c] rounded-tr-2xl rounded-bl-2xl overflow-hidden sm:mr-5"
				>
					<amp-img title={item.name} alt={item.name} src={item.imgHref} width="300" height="200"
						><ImgPlaceholder /></amp-img
					>
					<div class="px-4 flex flex-col justify-end">
						<a
							href="#{urlHashFromName(item.name)}"
							class="flex mt-2 outline-none"
							tabindex={catID * 20 + itemID}
						>
							{item.name}
						</a>
						<ul class="flex list-disc mt-3 marker:text-salmon text-xs text-[#d5d6d7] pl-4">
							{#each item.info as info}
								<li>{info}</li>
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
