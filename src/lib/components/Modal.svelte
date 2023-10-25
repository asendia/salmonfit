<script lang="ts">
	export let isVisible = false;

	const handleClosePopup =
		(forceClose: boolean = false) =>
		(e: MouseEvent) => {
			if (!forceClose && e.target !== e.currentTarget) return;
			e.preventDefault();
			isVisible = false;
		};
</script>

<div
	aria-hidden="true"
	class={`fixed top-0 left-0 right-0 bottom-0 h-[100vh] bg-opacity-50 bg-white dark:bg-black dark:bg-opacity-50 z-50 ${
		isVisible ? 'flex' : 'hidden'
	} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
	on:click={handleClosePopup()}
>
	<div class="relative w-full max-w-md max-h-full m-auto">
		<!-- Modal content -->
		<div class="relative rounded-lg shadow bg-white dark:bg-black border dark:border-gray-600">
			<button
				type="button"
				class="absolute active:scale-95 transition-transform top-3 right-2.5 dark:text-gray-400 bg-transparent dark:hover:bg-gray-200 dark:hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
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
			<div class="px-6 py-4 border-b rounded-t dark:dark:border-gray-800">
				<h3 class="text-base font-semibold lg:text-xl dark:text-white">
					<slot name="title" />
				</h3>
			</div>
			<!-- Modal body -->
			<div class="p-6">
				<slot name="body" />
			</div>
		</div>
	</div>
</div>
