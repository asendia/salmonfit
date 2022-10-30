<script lang="ts">
	import igLogo from '$lib/assets/social/instagram-small.svg';
	import whatsappLogo from '$lib/assets/social/whatsapp-small.svg';
	import grabLogo from '$lib/assets/social/grab-small.svg';
	import gofoodLogo from '$lib/assets/social/gofood-small.svg';
	import travelokaLogo from '$lib/assets/social/traveloka-small.svg';
	import shopeeLogo from '$lib/assets/social/shopee-small.svg';
	import ImgPlaceholder from './ImgPlaceholder.svelte';

	const socialLinks = [
		{
			url: 'https://www.instagram.com/salmonfit.id/',
			alt: 'instagram',
			imgSrc: igLogo,
			text: 'Instagram'
		},
		{
			url: 'https://wa.me/6281310832474',
			alt: 'whatsapp',
			imgSrc: whatsappLogo,
			text: 'WhatsApp'
		},
		{
			url: 'https://gofood.co.id/english/jakarta/restaurant/salmon-fit-apartemen-menara-kebon-jeruk-06f0dcc6-14f4-4092-810f-2bcc81214d23',
			alt: 'gofood',
			imgSrc: gofoodLogo,
			text: 'gofood'
		},
		{
			url: 'https://food.grab.com/id/id/restaurant/salmon-fit-duri-kepa-delivery/6-C2XUWAX3PEU1JT',
			alt: 'grabfood',
			imgSrc: grabLogo,
			text: 'GrabFood'
		},
		{
			url: 'https://shopee.co.id/universal-link/now-food/shop/20262634',
			alt: 'Shopee',
			imgSrc: shopeeLogo,
			text: 'Shopee'
		},
		{
			url: 'https://www.traveloka.com/id-id/restaurants/indonesia/detail/salmon-fit-free-delivery-162720',
			alt: 'traveloka eats',
			imgSrc: travelokaLogo,
			text: 'Traveloka'
		}
	];
</script>

{#each socialLinks as s}
	<a
		class="flex justify-center w-[100px] text-white font-medium py-1 px-2 rounded-full shadow-md leading-6 text-xs mr-2 mb-2 bg-[#0f151c]"
		target="_blank"
		href={s.url}
		rel="noreferrer"
	>
		<amp-img class="mr-2" alt={s.alt} src={s.imgSrc} width="24" height="24"
			><ImgPlaceholder /></amp-img
		>{s.text}
	</a>
{/each}
