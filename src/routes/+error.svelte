<script lang="ts">
	export const status = 404;
	// https://github.com/sveltejs/kit/issues/5980
	export let data;
	if (Object.keys(data).length !== 0) {
		console.error({ data });
	}
	export let form;
	if (form !== null) {
		console.error({ form });
	}
	import Footer from '$lib/components/Footer.svelte';
	const message = status === 404 ? 'Page not found' : 'Unknown';
	let bubbles = [...Array(12).keys()].map((i) => ({ id: i + 1, visible: true }));
	function createBubbleClickHandler(id: number) {
		let timeoutID: number;
		return () => {
			bubbles = bubbles.map((b) => {
				if (id === b.id) {
					b.visible = false;
				}
				return b;
			});
			if (timeoutID !== undefined) {
				clearTimeout(timeoutID);
			}
			timeoutID = window.setTimeout(() => {
				bubbles = bubbles.map((b) => {
					if (id === b.id) {
						b.visible = true;
					}
					return b;
				});
			}, 5000);
		};
	}
</script>

<svelte:head>
	<title>salmonfit - {status}</title>
	<link rel="canonical" href="https://salmonfit.com/error" />
	<meta name="robots" content="noindex" />
</svelte:head>
<div class="main">
	<!-- Copied from: https://codepen.io/codypearce/pen/VwYOGzq -->
	<div class="ocean">
		<div id="octocat" class="bg-[url('/octomon.png')] bg-left" />
		{#each bubbles as bubble}
			{#if bubble.visible}
				<div
					class="bubble bubble--{bubble.id}"
					on:click={createBubbleClickHandler(bubble.id)}
					on:keypress={() => null}
				/>
			{/if}
		{/each}
	</div>
	<slot />
	<div class="error-container">
		<p>Sad salmon is sad, back to <a href="/" class="underline">home page</a></p>
		<p>Error - {message}</p>
		<Footer />
	</div>
</div>

<style>
	.main {
		text-align: center;
	}
	.error-container {
		position: absolute;
		bottom: 6vh;
		width: 100%;
	}
	p {
		font-weight: 300;
	}
	#octocat {
		height: 300px;
		width: 200px;
		animation: animateSprite 15s steps(1) infinite, swim 15s ease-in-out infinite;
		position: absolute;
		right: -200px;
		top: 50%;
		margin-top: -150px;
	}

	@keyframes animateSprite {
		0% {
			background-position: -600px; /* Starting position moving left sprite */
		}
		20% {
			background-position: 0px; /* Straight on sprite */
		}
		25% {
			background-position: -200px; /* Moving up sprite */
		}
		35% {
			background-position: -400px; /* Moving right sprite */
		}
		40% {
			background-position: -400px;
		}
		50% {
			background-position: -200px; /* Moving up sprite */
		}
		60% {
			background-position: -0px; /* Straight on sprite */
		}
		67% {
			background-position: -600px; /* Moving up sprite */
		}

		100% {
			background-position: -600px;
		}
	}

	@keyframes swim {
		0% {
			transform: translate(0, 0); /* Starting position */
		}
		20% {
			transform: translate(calc(-50vw - 100px), 0); /* Animate to center of screen */
		}
		25% {
			transform: translate(calc(-50vw - 100px), 0); /* Stay at the center for 1 second */
		}
		35% {
			transform: translate(calc(-50vw - 100px), -20vh); /* Animate up for 2 seconds */
		}
		50% {
			transform: translate(-25vw, 15vh); /* Animate bottom right for 3 seconds */
		}
		60% {
			transform: translate(-25vw, -20vh); /* Animate up at right of the screen */
		}
		67% {
			transform: translate(-25vw, -20vh);
		}

		100% {
			transform: translate(calc(-100vw - 300px), 0); /* Animate past left past the screen */
		}
	}
	.ocean {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.bubble {
		width: 30px;
		height: 30px;
		border-radius: 100%;
		position: absolute;
		background-color: black;
		bottom: -30px;
		opacity: 0.2;
		animation: bubble 15s ease-in-out infinite, sideWays 4s ease-in-out infinite alternate;
		cursor: pointer;
	}

	:global(.dark) .bubble {
		background-color: white;
	}

	@keyframes bubble {
		0% {
			transform: translateY(0%);
			opacity: 0.06;
		}
		100% {
			transform: translateY(-120vh);
		}
	}

	@keyframes sideWays {
		0% {
			margin-left: 0px;
		}
		100% {
			margin-left: 200px;
		}
	}

	.bubble--1 {
		left: 10%;
		animation-delay: 0.5s;
		animation-duration: 16s;
		opacity: 0.2;
	}

	.bubble--2 {
		width: 15px;
		height: 15px;
		left: 40%;
		animation-delay: 1s;
		animation-duration: 10s;
		opacity: 0.1;
	}

	.bubble--3 {
		width: 10px;
		height: 10px;
		left: 30%;
		animation-delay: 5s;
		animation-duration: 20s;
		opacity: 0.3;
	}

	.bubble--4 {
		width: 25px;
		height: 25px;
		left: 40%;
		animation-delay: 8s;
		animation-duration: 17s;
		opacity: 0.2;
	}

	.bubble--5 {
		width: 30px;
		height: 30px;
		left: 60%;
		animation-delay: 10s;
		animation-duration: 15s;
		opacity: 0.1;
	}

	.bubble--6 {
		width: 10px;
		height: 10px;
		left: 80%;
		animation-delay: 3s;
		animation-duration: 30s;
		opacity: 0.4;
	}

	.bubble--7 {
		width: 15px;
		height: 15px;
		left: 90%;
		animation-delay: -7s;
		animation-duration: 25s;
		opacity: 0.3;
	}

	.bubble--9 {
		width: 20px;
		height: 20px;
		left: 50%;
		bottom: 30px;
		animation-delay: -5s;
		animation-duration: 19s;
		opacity: 0.2;
	}

	.bubble--10 {
		width: 40px;
		height: 40px;
		left: 30%;
		bottom: 30px;
		animation-delay: -21s;
		animation-duration: 16s;
		opacity: 0.3;
	}

	.bubble--11 {
		width: 30px;
		height: 30px;
		left: 60%;
		bottom: 30px;
		animation-delay: -13.75s;
		animation-duration: 20s;
		opacity: 0.3;
	}

	.bubble--11 {
		width: 25px;
		height: 25px;
		left: 90%;
		bottom: 30px;
		animation-delay: -10.5s;
		animation-duration: 19s;
		opacity: 0.3;
	}
</style>
