<script lang="ts">
	import { getForegroundColor, stringToColor } from '$lib/color';

	export let name: string;

	const [platform, rest] = name.split(': ');
	const [brand, location] = rest.split('Salmon Fit ');
	const platformBG = stringToColor(platform);
	const platformFG = getForegroundColor(platformBG);
	const locationBG = stringToColor(location);
	const locationFG = getForegroundColor(locationBG);
</script>

<span class="rounded-sm px-1" style={`background: ${platformBG}; color: ${platformFG}`}
	>{platform}</span
>:
<span>
	{#if brand === ''}
		Salmon Fit
	{:else}
		{brand}
	{/if}
</span>
<span class="rounded-sm px-1" style={`background: ${locationBG}; color: ${locationFG}`}
	>{location}</span
>
