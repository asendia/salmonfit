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

	onMount(async () => {
		const res = await fetch('https://salmonping-g43hbqcpwq-as.a.run.app/api/history');
		const data = await res.json();
		const listingPings = data.listing_pings;
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
	});

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

<Footer />
