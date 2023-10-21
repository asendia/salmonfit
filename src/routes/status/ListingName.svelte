<script lang="ts">
	export let name: string;

	const [_1, rest] = name.split(': ');
	const [_2, location] = rest.split('Salmon Fit ');
</script>

<span class={'rounded-sm px-1'}>{location}</span>
