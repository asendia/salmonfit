<script lang="ts">
	function handleToggleTheme(e: Event) {
		const isDark = document.documentElement.classList.contains('dark');
		if (isDark) {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		} else {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		}
	}
</script>

<label for="toggle" class="flex items-center cursor-pointer sticky top-2">
	<div class="relative">
		<input id="toggle" type="checkbox" class="sr-only" on:change={handleToggleTheme} />
		<div class="block bg-gray-800 dark:bg-gray-100 w-8 h-4 rounded-full" />
		<div
			class="dot absolute left-0.5 top-0.5 bg-white dark:bg-black w-3 h-3 rounded-full transition dark:translate-x-0 translate-x-4"
		/>
	</div>
</label>
