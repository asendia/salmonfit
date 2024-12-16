<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_PROTO_DOMAIN, PUBLIC_STATUS_API_PROTO_DOMAIN } from '$env/static/public';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { formatDate } from '$lib/date';
	import type { ListingPing } from '$lib/ping';
	import { onMount } from 'svelte';
	import ListingName from './ListingName.svelte';

	interface ListingPingGroup {
		date: string;
		listingPings: ListingPing[];
	}

	const title = 'Status';
	const description = 'Status of Salmon Fit online stores, grouped by date & time';
	let tables: Record<string, ListingPingGroup> | undefined = undefined;
	let startedAt: Date | undefined = undefined;
	let endedAt: Date | undefined = undefined;
	let currentPage = 1;
	let names = [
		{ name: 'Haji Nawi', checked: true },
		{ name: 'Kebon Sirih', checked: true },
		{ name: 'Tanjung Duren', checked: true },
		{ name: 'Kebon Jeruk', checked: true },
		{ name: 'Sudirman', checked: true }
	];
	let platforms = [
		{ name: 'gofood', checked: true },
		{ name: 'grabfood', checked: true }
	];
	let statuses = [
		{ name: 'Open', checked: true },
		{ name: 'Closed', checked: true },
		{ name: 'Unknown', checked: true }
	];
	let isFilterVisible = false;
	let bottomElementRef: HTMLDivElement | null = null;
	let isFetching = false;
	const pingKeys = new Set<string>();

	onMount(() => {
		const url = new URL(window.location.href);
		const start = url.searchParams.get('start');
		const end = url.searchParams.get('end');
		const name = url.searchParams.get('name');
		const platform = url.searchParams.get('platform');
		const status = url.searchParams.get('status');
		const page = url.searchParams.get('page');
		searchParamsToState(start, end, name, platform, status, page);
		fetchHistory();

		// Detect if bottomElementRef is visible for pagination
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetching) {
					currentPage++;
					fetchHistory();
				}
			},
			{ threshold: 1 }
		);
		if (bottomElementRef) observer.observe(bottomElementRef);

		return () => {
			observer.disconnect();
		};
	});

	function searchParamsToState(
		start: string | null,
		end: string | null,
		name: string | null,
		platform: string | null,
		status: string | null,
		page: string | null
	) {
		if (start) {
			startedAt = new Date(start);
		} else {
			// Default to 7 days ago
			startedAt = new Date();
			startedAt.setHours(0, 0, 0, 0);
			startedAt.setDate(startedAt.getDate() - 7);
			startedAt = startedAt;
		}
		if (end) {
			endedAt = new Date(end);
		} else {
			endedAt = new Date();
			endedAt.setHours(0, 0, 0, 0);
			endedAt = endedAt;
		}
		if (name) {
			const nameQuery = name.split(',');
			for (const n of names) {
				n.checked = nameQuery.includes(n.name);
			}
		} else {
			for (const n of names) {
				n.checked = true;
			}
		}
		names = names;
		if (platform) {
			const platformQuery = platform.split(',');
			for (const p of platforms) {
				p.checked = platformQuery.includes(p.name);
			}
		} else {
			for (const p of platforms) {
				p.checked = true;
			}
		}
		platforms = platforms;
		if (status) {
			const statusQuery = status.split(',');
			for (const s of statuses) {
				s.checked = statusQuery.includes(s.name.toLowerCase());
			}
		} else {
			for (const s of statuses) {
				s.checked = true;
			}
		}
		statuses = statuses;
		if (page) {
			currentPage = parseInt(page, 10);
		} else {
			currentPage = 1;
		}
	}

	async function fetchHistory() {
		if (isFetching) return;
		if (currentPage === 1) {
			tables = undefined;
			pingKeys.clear();
		}
		isFetching = true;
		const apiURL = new URL(`${PUBLIC_STATUS_API_PROTO_DOMAIN}/api/history`);
		if (startedAt) apiURL.searchParams.set('start', formatDate(startedAt));
		if (endedAt) {
			apiURL.searchParams.set('end', formatDate(endedAt));
		}
		apiURL.searchParams.set(
			'name',
			names
				.filter((s) => s.checked)
				.map((s) => s.name)
				.join(',')
		);
		apiURL.searchParams.set(
			'platform',
			platforms
				.filter((s) => s.checked)
				.map((s) => s.name)
				.join(',')
		);
		apiURL.searchParams.set(
			'status',
			statuses
				.filter((s) => s.checked)
				.map((s) => s.name.toLowerCase())
				.join(',')
		);
		apiURL.searchParams.set('page', currentPage.toString());
		const res = await fetch(apiURL);
		const data = await res.json();
		const listingPings = data.listing_pings ?? [];
		// Group by date and insert to tables
		const newTables: Record<string, ListingPingGroup> = listingPings.reduce(
			(acc: Record<string, ListingPingGroup>, curr: ListingPing) => {
				const key = curr.name + curr.created_at;
				if (pingKeys.has(key)) return acc;
				pingKeys.add(curr.url);
				const date = new Date(curr.created_at).toLocaleDateString();
				let group = acc[date];
				if (group === undefined) {
					group = { date, listingPings: [] };
					acc[date] = group;
				}
				group.listingPings.push(curr);
				return acc;
			},
			{}
		);

		if (currentPage === 1) {
			tables = newTables;
		} else if (tables) {
			// Iterate over newTables and append to tables
			for (const [key, value] of Object.entries(newTables)) {
				if (tables[key]) {
					tables[key].listingPings.push(...value.listingPings);
				} else {
					tables[key] = value;
				}
			}
			tables = tables;
		}
		isFetching = false;
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
		currentPage = 1;
		fetchHistory();
		const searchParams = new URLSearchParams(window.location.search);
		if (startedAt) searchParams.set('start', formatDate(startedAt));
		if (endedAt) searchParams.set('end', formatDate(endedAt));
		goto('/status?' + searchParams.toString());
	};

	function statusToColorClass(status: string) {
		switch (status) {
			case 'open':
				return 'bg-cyan-200 dark:bg-cyan-900';
			case 'closed':
				return 'bg-red-200 dark:bg-red-900';
			case 'unknown':
				return 'bg-yellow-200 dark:bg-yellow-700';
			default:
				return '';
		}
	}

	async function resetFilter() {
		searchParamsToState(null, null, null, null, null, null);
		await fetchHistory();
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={PUBLIC_PROTO_DOMAIN} />
	<meta name="twitter:site" content="@salmonfit" />
	<meta name="twitter:creator" content="@salmonfit" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<link rel="canonical" href={PUBLIC_PROTO_DOMAIN + page.url.pathname} />
</svelte:head>

<Header {title}>
	<span slot="description">{description}</span></Header
>

<div class="flex justify-center">
	<button
		class="bg-salmon text-white active:scale-95 font-bold text-sm h-8 px-4 rounded-sm shadow-md"
		on:click={() => {
			isFilterVisible = !isFilterVisible;
		}}>Filter</button
	>
	<a
		class="flex items-center bg-gray-600 dark:bg-gray-400 active:scale-95 text-white text-sm dark:text-black font-bold h-8 py-0 px-4 rounded shadow-md ml-2"
		href="/status"
		on:click={async () => {
			await resetFilter();
		}}>Reset</a
	>
</div>

<div class="min-h-[70vh] max-w-[800px] m-auto">
	{#if tables === undefined}
		<div class="text-center mt-10">Loading...</div>
	{:else if Object.keys(tables).length === 0}
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
	{#each Object.entries(tables ?? {}) as [_, t]}
		<h2 class="mt-3 mb-1 ml-2">{t.date}</h2>
		<table
			class="w-full rounded-sm overflow-hidden text-sm text-center text-gray-500 dark:text-gray-400"
		>
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th>time</th>
					<th>platform</th>
					<th>location</th>
					<th>status</th>
				</tr>
			</thead>
			<tbody>
				{#each t.listingPings as lp}
					<tr
						class="bg-white even:bg-slate-100 border-b dark:bg-gray-900 dark:even:bg-gray-800 dark:border-gray-700"
					>
						<td>{new Date(lp.created_at).toLocaleTimeString()}</td>
						<td>{lp.platform}</td>
						<td
							><a target="_blank" rel="noreferrer" href={lp.url} class="underline"
								><ListingName name={lp.name} /></a
							></td
						>
						<td
							><span class={`${statusToColorClass(lp.status)} px-1 rounded-sm dark:text-white`}
								>{lp.status}</span
							></td
						>
					</tr>{/each}
			</tbody>
		</table>
	{/each}
	<div bind:this={bottomElementRef}></div>
</div>

<Modal bind:isVisible={isFilterVisible}>
	<div slot="title">Filter</div>
	<div slot="body">
		{#if startedAt && endedAt}
			<div class="flex items-center mb-4">
				<input
					class="flex items-center justify-center px-1 bg-gray-200 text-black rounded-sm shadow-sm"
					placeholder="Start"
					type="date"
					on:change={handleChangeDatepicker('start')}
					value={formatDate(startedAt)}
				/>
				<span class="mx-3 text-gray-500">to</span>
				<input
					class="flex items-center justify-center px-1 bg-gray-200 text-black rounded-sm shadow-sm"
					placeholder="End"
					type="date"
					on:change={handleChangeDatepicker('end')}
					value={formatDate(endedAt)}
				/>
			</div>
			<table>
				<tbody>
					<tr>
						<td class="align-top">Status:</td>
						<td class="pb-2">
							<div class="flex justify-start flex-wrap">
								{#each statuses as status}
									<div class="flex ml-3">
										<input
											type="checkbox"
											id={`checkbox-${status.name}`}
											name={`checkbox-${status.name}`}
											class="h-5 w-5 text-salmon rounded"
											checked={status.checked}
											on:change={() => {
												status.checked = !status.checked;
												statuses = statuses;
												currentPage = 1;
												fetchHistory();
												const searchParams = new URLSearchParams(window.location.search);
												searchParams.set(
													'status',
													statuses
														.filter((s) => s.checked)
														.map((s) => s.name.toLowerCase())
														.join(',')
												);
												goto('/status?' + searchParams.toString());
											}}
										/>
										<label
											for={`checkbox-${status.name}`}
											class="ml-2 block text-gray-700 dark:text-gray-400">{status.name}</label
										>
									</div>
								{/each}
							</div>
						</td>
					</tr>
					<tr>
						<td class="align-top">Location:</td>
						<td class="pb-2">
							<div class="flex justify-start flex-wrap">
								{#each names as name, id}
									<div class="flex ml-3">
										<input
											type="checkbox"
											id={`checkbox-name-${id}`}
											name={`checkbox-name-${id}`}
											class="h-5 w-5 text-salmon rounded"
											checked={name.checked}
											on:change={() => {
												name.checked = !name.checked;
												names = names;
												currentPage = 1;
												fetchHistory();
												const searchParams = new URLSearchParams(window.location.search);
												searchParams.set(
													'name',
													names
														.filter((s) => s.checked)
														.map((s) => s.name)
														.join(',')
												);
												goto('/status?' + searchParams.toString());
											}}
										/>
										<label
											for={`checkbox-name-${id}`}
											class="ml-2 block text-gray-700 dark:text-gray-400">{name.name}</label
										>
									</div>
								{/each}
							</div>
						</td>
					</tr>
					<tr>
						<td class="align-top">Platform:</td>
						<td class="pb-2">
							<div class="flex justify-start flex-wrap">
								{#each platforms as platform}
									<div class="flex ml-3">
										<input
											type="checkbox"
											id={`checkbox-platform-${platform.name}`}
											name={`checkbox-platform-${platform.name}`}
											class="h-5 w-5 text-salmon rounded"
											checked={platform.checked}
											on:change={() => {
												platform.checked = !platform.checked;
												platforms = platforms;
												currentPage = 1;
												fetchHistory();
												const searchParams = new URLSearchParams(window.location.search);
												searchParams.set(
													'platform',
													platforms
														.filter((s) => s.checked)
														.map((s) => s.name)
														.join(',')
												);
												goto('/status?' + searchParams.toString());
											}}
										/>
										<label
											for={`checkbox-platform-${platform.name}`}
											class="ml-2 block text-gray-700 dark:text-gray-400">{platform.name}</label
										>
									</div>
								{/each}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="mt-8"></div>
			<a
				class="bg-gray-600 dark:bg-gray-400 active:scale-95 text-white dark:text-black font-bold py-1.5 px-4 rounded shadow-md"
				href="/status"
				on:click={async () => {
					await resetFilter();
				}}>Reset</a
			>
		{/if}
	</div>
</Modal>

<Footer sourceCodeURL="https://github.com/asendia/salmonping" />
