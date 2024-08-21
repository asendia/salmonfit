<script lang="ts">
	import { PUBLIC_STATUS_API_PROTO_DOMAIN } from '$env/static/public';
	import gofoodLogo from '$lib/assets/social/gofood-small.svg';
	import grabLogo from '$lib/assets/social/grab-small.svg';
	import igLogo from '$lib/assets/social/instagram-small.svg';
	import shopeeLogo from '$lib/assets/social/shopee-small.svg';
	import whatsappLogo from '$lib/assets/social/whatsapp-small.svg';
	import { formatDate } from '$lib/date';
	import type { ListingPing } from '$lib/ping';
	import Modal from './Modal.svelte';

	const socialLinks = [
		{
			url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-tanjung-duren-06f0dcc6-14f4-4092-810f-2bcc81214d23',
			alt: 'gofood',
			imgSrc: gofoodLogo,
			text: 'gofood'
		},
		{
			url: 'https://food.grab.com/id/id/restaurant/salmon-fit-tanjung-duren-utara-delivery/6-C2XUWAX3PEU1JT',
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
			url: 'https://www.instagram.com/salmonfit.id/',
			alt: 'instagram',
			imgSrc: igLogo,
			text: 'Instagram'
		},
		{
			url: 'https://wa.me/6282172407750',
			alt: 'whatsapp',
			imgSrc: whatsappLogo,
			text: 'WhatsApp'
		}
	];

	const branchMap: Record<
		string,
		{ title: string; links: { url: string; text: string; subtext?: string }[] }
	> = {
		gofood: {
			title: 'Go-Food',
			links: [
				{
					url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-tanjung-duren-06f0dcc6-14f4-4092-810f-2bcc81214d23',
					text: 'Tanjung Duren',
					subtext: 'previously Kebon Jeruk'
				},
				{
					url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-kebon-sirih-815b2b33-584e-46d6-b12e-2d6da2f46f96',
					text: 'Kebon Sirih (Thamrin)',
					subtext: 'previously Sudirman'
				},
				{
					url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-haji-nawi-9d68471b-5d49-468c-a162-091b1ea9b468',
					text: 'Haji Nawi'
				}
			]
		},
		GrabFood: {
			title: 'Grab Food',
			links: [
				{
					url: 'https://food.grab.com/id/id/restaurant/salmon-fit-tanjung-duren-utara-delivery/6-C2XUWAX3PEU1JT',
					text: 'Tanjung Duren',
					subtext: 'previously Kebon Jeruk'
				},
				{
					url: 'https://food.grab.com/id/id/restaurant/salmon-fit-kebon-sirih-delivery/6-C36EKGLYHB42DA',
					text: 'Kebon Sirih (Thamrin)',
					subtext: 'previously Sudirman'
				},
				{
					url: 'https://food.grab.com/id/id/restaurant/salmon-fit-haji-nawi-delivery/6-C4LJLRKEKAEVME',
					text: 'Haji Nawi'
				}
			]
		},
		Shopee: {
			title: 'Shopee Food (mobile only)',
			links: [
				{
					url: 'https://shopee.co.id/universal-link/now-food/shop/20262634?deep_and_deferred=1&shareChannel=copy_link',
					text: 'Tanjung Duren',
					subtext: 'previously Kebon Jeruk'
				},
				{
					url: 'https://shopee.co.id/universal-link/now-food/shop/21330143?deep_and_deferred=1&shareChannel=copy_link',
					text: 'Kebon Sirih (Thamrin)',
					subtext: 'previously Sudirman'
				},
				{
					url: 'https://shopee.co.id/universal-link/now-food/shop/21394731?deep_and_deferred=1&shareChannel=copy_link',
					text: 'Haji Nawi'
				}
			]
		}
	};

	let branches: { url: string; text: string; subtext?: string }[] = [];
	let shopTitle: string | undefined;

	const handleLinkClick =
		(s: { url: string; alt: string; imgSrc: string; text: string }) => (e: MouseEvent) => {
			const branch = branchMap[s.text];
			if (!branch) return;
			shopTitle = branch.title;
			branches = branch.links;
			if (branches) {
				e.preventDefault();
			} else {
				shopTitle = undefined;
			}
		};

	let listingPingMap: Map<string, ListingPing> = new Map();
	let lastFetchAt = 0;

	$: {
		const minutesFromFirstPing = (Date.now() - lastFetchAt) / 1000 / 60;
		if (branches.length > 0 && minutesFromFirstPing > 2) {
			(async () => {
				const apiURL = new URL(`${PUBLIC_STATUS_API_PROTO_DOMAIN}/api/history`);
				const today_00_00 = new Date();
				today_00_00.setHours(0, 0, 0, 0);
				const yesterday_00_00 = new Date(today_00_00);
				yesterday_00_00.setDate(today_00_00.getDate() - 1);
				apiURL.searchParams.set('start', formatDate(yesterday_00_00));
				apiURL.searchParams.set('end', formatDate(today_00_00));
				const res = await fetch(apiURL);
				const d = await res.json();
				lastFetchAt = Date.now();
				const listingPings: ListingPing[] = d.listing_pings;
				// Clear all keys from listingPingMap
				listingPingMap.clear();
				for (const p of listingPings) {
					if (listingPingMap.has(p.url)) continue;
					listingPingMap.set(p.url, p);
				}
				listingPingMap = listingPingMap;
			})();
		}
	}
</script>

{#each socialLinks as s}
	<a
		class="flex active:scale-95 transition-transform justify-center w-[100px] text-black dark:text-white font-medium py-1 px-2 rounded-full shadow-md leading-6 text-xs mr-2 mb-2 bg-[#ffffff] dark:bg-[#0f151c]"
		target="_blank"
		href={s.url}
		on:click={handleLinkClick(s)}
		rel="noreferrer"
	>
		<img class="mr-2" alt={s.alt} src={s.imgSrc} width="24" height="24" loading="lazy" />{s.text}
	</a>
{/each}

<Modal isVisible={branches.length > 0}>
	<div slot="title">{shopTitle ?? ''}</div>
	<ul slot="body" class="my-4 space-y-3">
		{#each branches as b}
			<li>
				<a
					class="flex items-center justify-between active:scale-95 transition-transform p-3 text-base font-bold rounded-md group hover:shadow bg-salmon dark:bg-opacity-50 hover:bg-white hover:text-black text-white"
					href={b.url}
					target="_blank"
					rel="noreferrer"
					><div class="flex flex-col ml-3 h-10 justify-center">
						<span>{b.text}</span>
						{#if b.subtext}
							<span class="text-gray-200 text-xs">{b.subtext}</span>
						{/if}
					</div>
					<span class="mr-3">({listingPingMap.get(b.url)?.status ?? '...'})</span></a
				>
			</li>
		{/each}
	</ul>
</Modal>
