// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}

declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLProps<K> {
		on?: string;
	}
}

declare module '@sveltejs/amp' {
	export function transform(html: string): string;
}
