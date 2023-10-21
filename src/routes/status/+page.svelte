<script lang="ts">
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
		fetchHistory();
	});

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
		const url = new URL(protoDomain + '/status');
		if (startedAt) url.searchParams.set('start', startedAt.toISOString());
		if (endedAt) url.searchParams.set('end', endedAt.toISOString());
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
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
				/>
			</div>
			<span class="mx-1 text-gray-500">to</span>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
				/>
			</div>
		</div>
	{/if}
</div>

<div class="min-h-[70vh]">
	{#each tables as t}
		<h2 class="mt-3 mb-1 ml-2">{t.date}</h2>
		<table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
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
