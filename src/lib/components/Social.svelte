<script lang="ts">
	import gofoodLogo from '$lib/assets/social/gofood-small.svg';
	import grabLogo from '$lib/assets/social/grab-small.svg';
	import igLogo from '$lib/assets/social/instagram-small.svg';
	import shopeeLogo from '$lib/assets/social/shopee-small.svg';
	import whatsappLogo from '$lib/assets/social/whatsapp-small.svg';

	const socialLinks = [
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
		},
		{
			url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-apartemen-menara-kebon-jeruk-06f0dcc6-14f4-4092-810f-2bcc81214d23',
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
		}
	];

	const branchMap: Record<string, { url: string; text: string }[]> = {
		gofood: [
			{
				url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-apartemen-menara-kebon-jeruk-06f0dcc6-14f4-4092-810f-2bcc81214d23',
				text: 'Gofood Kebon Jeruk'
			},
			{
				url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-sudirman-815b2b33-584e-46d6-b12e-2d6da2f46f96',
				text: 'Gofood Sudirman'
			},
			{
				url: 'https://gofood.co.id/jakarta/restaurant/salmon-fit-haji-nawi-9d68471b-5d49-468c-a162-091b1ea9b468',
				text: 'Gofood Haji Nawi'
			}
		]
	};

	let branches: { url: string; text: string }[] = [];
	let branchKey: string | undefined;

	const handleLinkClick =
		(s: { url: string; alt: string; imgSrc: string; text: string }) => (e: MouseEvent) => {
			branchKey = s.alt;
			branches = branchMap[s.alt];
			if (branches) {
				e.preventDefault();
			} else {
				branchKey = undefined;
			}
		};

	const handleClosePopup =
		(forceClose: boolean = false) =>
		(e: MouseEvent) => {
			if (!forceClose && e.target !== e.currentTarget) return;
			e.preventDefault();
			branches = [];
			branchKey = undefined;
		};
</script>

{#each socialLinks as s}
	<a
		class="flex justify-center w-[100px] text-white font-medium py-1 px-2 rounded-full shadow-md leading-6 text-xs mr-2 mb-2 bg-[#0f151c]"
		target="_blank"
		href={s.url}
		on:click={handleLinkClick(s)}
		rel="noreferrer"
	>
		<img class="mr-2" alt={s.alt} src={s.imgSrc} width="24" height="24" loading="lazy" />{s.text}
	</a>
{/each}

<div
	aria-hidden="true"
	class={`fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black z-50 ${
		branches.length === 0 ? 'hidden' : 'flex'
	} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
	on:click={handleClosePopup()}
>
	<div class="relative w-full max-w-md max-h-full m-auto">
		<!-- Modal content -->
		<div class="relative rounded-lg shadow bg-black">
			<button
				type="button"
				class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
				on:click={handleClosePopup(true)}
			>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span class="sr-only">Close modal</span>
			</button>
			<!-- Modal header -->
			<div class="px-6 py-4 border-b rounded-t dark:border-gray-800">
				<h3 class="text-base font-semibold lg:text-xl text-white">
					{branchKey}
				</h3>
			</div>
			<!-- Modal body -->
			<div class="p-6">
				<ul class="my-4 space-y-3">
					{#each branches as b}
						<li>
							<a
								class="flex items-center p-3 text-base font-bold rounded-md group hover:shadow bg-salmon hover:bg-white hover:text-black text-white"
								href={b.url}
								target="_blank"
								rel="noreferrer"><span class="flex-1 ml-3 whitespace-nowrap">{b.text}</span></a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
