<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import ogImage from '$lib/assets/og-image-salmonfit.jpg';
	const title = 'Salmon Fit';
	const description =
		'Fusion salmon dishes from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!';
	import menuItems from '$lib/menuItems';
	import ImgPlaceholder from './ImgPlaceholder.svelte';
	export const csr = false;
	export const prerender = true;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="food" />
	<meta property="og:url" content="https://salmonfit.com" />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@asendiaMayco" />
	<meta name="twitter:creator" content="@asendiaMayco" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<link rel="canonical" href="https://salmonfit.com" />
	{#each menuItems as cat}
		{#each cat.items as item, id}
			{#if item.imgHref && id === 0}
				<link rel="preload" as="image" href={item.imgHref} />
			{/if}
		{/each}
	{/each}
</svelte:head>

<Header {title} {description} />
{#each menuItems as cat, catID}
	<h3 class="text-center font-serif text-2xl font-medium mt-3">{cat.name}</h3>
	<div class="max-w-[1440px] m-auto relative">
		{#if cat.itemIdsWithImages.length > 0}
			<amp-carousel
				id="carousel-{catID}"
				class="relative block rounded-lg my-4 mx-auto"
				height="200"
				aria-label="Carousel for {cat.name}"
			>
				<div class="w-7" />
				{#each cat.itemIdsWithImages as imgId}
					<amp-img
						class="rounded-lg"
						title={cat.items[imgId].name}
						alt={cat.items[imgId].name}
						src={cat.items[imgId].imgHref}
						width="300"
						height="200"><ImgPlaceholder /></amp-img
					>
				{/each}
			</amp-carousel>
		{/if}
		<ul class="mb-7 px-10">
			{#each cat.items as item, itemID}
				<li class="list-none mb-5">
					<div
						class="mb-2 font-light bg-bottom bg-repeat-x cursor-pointer outline-none"
						style="background-image: linear-gradient(to right, #cacaca 33%, rgba(255, 255, 255, 0) 0%); background-size: 7px 1px;"
						role="button"
						tabindex={catID * 20 + itemID}
						on="tap:carousel-{catID}.goToSlide(index={cat.itemIdsWithImages.indexOf(itemID + 1)})"
					>
						{item.name}
					</div>
					{#if item.description}
						<div class="py-2 text-gray-300 text-xs">{item.description}</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/each}
<Footer />
