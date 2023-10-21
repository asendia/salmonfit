<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { protoDomain } from '$lib/url';
	import { onMount } from 'svelte';

	interface ListingPing {
		created_at: string;
		status: string;
		name: string;
		platform: string;
		url: string;
	}
	interface ListingPingGroup {
		date: string;
		listingPings: ListingPing[];
	}

	const title = 'Status';
	const description = 'Status of Salmon Fit online stores, grouped by date & time';
	let tables: ListingPingGroup[] = [];
	let startedAt: Date | undefined = undefined;
	let endedAt: Date | undefined = undefined;
	let startDatepicker: HTMLInputElement | undefined = undefined;
	let endDatepicker: HTMLInputElement | undefined = undefined;

	onMount(async () => {
		const url = new URL(window.location.href);
		const start = url.searchParams.get('start');
		const end = url.searchParams.get('end');
		searchParamsToState(start, end);
		fetchHistory();
	});

	function searchParamsToState(start: string | null, end: string | null) {
		if (start) {
			startedAt = new Date(start);
		} else {
			// Default to yesterday
			startedAt = new Date();
			startedAt.setDate(startedAt.getDate() - 1);
		}
		if (end) {
			endedAt = new Date(end);
		} else {
			endedAt = new Date();
		}
	}

	async function fetchHistory() {
		const apiURL = new URL('https://salmonping-g43hbqcpwq-as.a.run.app/api/history');
		if (startedAt) apiURL.searchParams.set('start', formatDate(startedAt));
		if (endedAt) {
			// Clone date to avoid mutating the original date
			const endedAtTmp = new Date(endedAt.getTime());
			endedAtTmp.setDate(endedAtTmp.getDate() + 1);
			apiURL.searchParams.set('end', formatDate(endedAtTmp));
		}
		const res = await fetch(apiURL);
		const data = await res.json();
		const listingPings = data.listing_pings ?? [];
		// Group by date and insert to tables
		tables = listingPings.reduce((acc: ListingPingGroup[], curr: ListingPing) => {
			const date = new Date(curr.created_at).toLocaleDateString();
			const index = acc.findIndex((item) => item.date === date);
			if (index === -1) {
				acc.push({ date, listingPings: [curr] });
			} else {
				acc[index].listingPings.push(curr);
			}
			return acc;
		}, []);
	}

	const handleChangeDatepicker = (kind: string) => (event: Event) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		if (kind === 'start') {
			startedAt = new Date(value);
			if (endedAt && startedAt > endedAt) {
				endedAt = new Date(startedAt.getTime());
			}
		} else if (kind === 'end') {
			endedAt = new Date(value);
			if (startedAt && endedAt < startedAt) {
				startedAt = new Date(endedAt.getTime());
			}
		}
		fetchHistory();
		const searchParams = new URLSearchParams(window.location.search);
		if (startedAt) searchParams.set('start', formatDate(startedAt));
		if (endedAt) searchParams.set('end', formatDate(endedAt));
		goto('/status?' + searchParams.toString());
	};

	function statusToClass(status: string) {
		switch (status) {
			case 'open':
				return 'bg-cyan-200 dark:bg-cyan-800';
			case 'closed':
				return 'bg-red-200 dark:bg-red-800';
			case 'unknown':
				return 'bg-yellow-200 dark:bg-yellow-800';
			default:
				return '';
		}
	}

	async function resetFilter() {
		searchParamsToState(null, null);
		await fetchHistory();
	}

	function formatDate(date: Date) {
		// Format with YYYY-MM-DD
		return date.toISOString().split('T')[0];
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={protoDomain} />
	<meta name="twitter:site" content="@salmonfit" />
	<meta name="twitter:creator" content="@salmonfit" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<link rel="canonical" href={protoDomain + $page.url.pathname} />
</svelte:head>

<Header {title}>
	<span slot="description">{description}</span></Header
>

<div class="h-10 flex justify-around">
	{#if startedAt && endedAt}
		<div date-rangepicker class="flex items-center">
			<div class="relative w-[130px]">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-3 h-3 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
						/>
					</svg>
				</div>
				<input
					value={formatDate(startedAt)}
					on:click={() => startDatepicker?.showPicker()}
					readonly
					name="start"
					type="text"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Select date start"
				/>
				<input
					bind:this={startDatepicker}
					class="w-0 h-0 block"
					placeholder="Start"
					type="date"
					on:change={handleChangeDatepicker('start')}
					value={formatDate(startedAt)}
				/>
			</div>
			<span class="mx-3 text-gray-500">to</span>
			<div class="relative w-[130px]">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-3 h-3 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
						/>
					</svg>
				</div>
				<input
					value={formatDate(endedAt)}
					on:click={() => endDatepicker?.showPicker()}
					readonly
					name="end"
					type="text"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Select date end"
				/>
				<input
					bind:this={endDatepicker}
					class="w-0 h-0 block"
					placeholder="End"
					type="date"
					on:change={handleChangeDatepicker('end')}
					value={formatDate(endedAt)}
				/>
			</div>
			<a
				class="underline ml-2"
				href="/status"
				on:click={async () => {
					await resetFilter();
				}}
			>
				<svg width="22px" height="22px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#e74e35"
						d="M13.9907,1.31133017e-07 C14.8816,1.31133017e-07 15.3277,1.07714 14.6978,1.70711 L13.8556,2.54922 C14.421,3.15654 14.8904,3.85028 15.2448,4.60695 C15.8028,5.79836 16.0583,7.109 15.9888,8.42277 C15.9193,9.73654 15.5268,11.0129 14.8462,12.1388 C14.1656,13.2646 13.2178,14.2053 12.0868,14.8773 C10.9558,15.5494 9.67655,15.9322 8.3623,15.9918 C7.04804,16.0514 5.73937,15.7859 4.55221,15.2189 C3.36505,14.652 2.33604,13.8009 1.55634,12.7413 C0.776635,11.6816 0.270299,10.446 0.0821822,9.14392 C0.00321229,8.59731 0.382309,8.09018 0.928918,8.01121 C1.47553,7.93224 1.98266,8.31133 2.06163,8.85794 C2.20272,9.83451 2.58247,10.7612 3.16725,11.556 C3.75203,12.3507 4.52378,12.989 5.41415,13.4142 C6.30452,13.8394 7.28602,14.0385 8.27172,13.9939 C9.25741,13.9492 10.2169,13.6621 11.0651,13.158 C11.9133,12.6539 12.6242,11.9485 13.1346,11.1041 C13.6451,10.2597 13.9395,9.30241 13.9916,8.31708 C14.0437,7.33175 13.8521,6.34877 13.4336,5.45521 C13.178,4.90949 12.8426,4.40741 12.4402,3.96464 L11.7071,4.69779 C11.0771,5.32776 9.99996,4.88159 9.99996,3.99069 L9.99996,1.31133017e-07 L13.9907,1.31133017e-07 Z M1.499979,4 C2.05226,4 2.499979,4.44772 2.499979,5 C2.499979,5.55229 2.05226,6 1.499979,6 C0.947694,6 0.499979,5.55228 0.499979,5 C0.499979,4.44772 0.947694,4 1.499979,4 Z M3.74998,1.25 C4.30226,1.25 4.74998,1.69772 4.74998,2.25 C4.74998,2.80229 4.30226,3.25 3.74998,3.25 C3.19769,3.25 2.74998,2.80228 2.74998,2.25 C2.74998,1.69772 3.19769,1.25 3.74998,1.25 Z M6.99998,0 C7.55226,0 7.99998,0.447716 7.99998,1 C7.99998,1.55229 7.55226,2 6.99998,2 C6.44769,2 5.99998,1.55229 5.99998,1 C5.99998,0.447716 6.44769,0 6.99998,0 Z"
					/>
				</svg>
			</a>
		</div>
	{/if}
</div>

<div class="min-h-[70vh] max-w-[800px] m-auto">
	{#if tables.length === 0}
		<div class="text-center mt-10">
			No data, <a
				class="underline"
				href="/status"
				on:click={async () => {
					await resetFilter();
				}}>reset filter</a
			>
		</div>
	{/if}
	{#each tables as t}
		<h2 class="mt-3 mb-1 ml-2">{t.date}</h2>
		<table
			class="w-full rounded-sm overflow-hidden text-sm text-center text-gray-500 dark:text-gray-400"
		>
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th>created_at</th>
					<th>name</th>
					<th>status</th>
				</tr>
			</thead>
			<tbody>
				{#each t.listingPings as lp}
					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<td>{new Date(lp.created_at).toLocaleTimeString()}</td>
						<td><a target="_blank" rel="noreferrer" href={lp.url}>{lp.name}</a></td>
						<td class={statusToClass(lp.status)}>{lp.status}</td>
					</tr>{/each}
			</tbody>
		</table>
	{/each}
</div>

<Footer />
