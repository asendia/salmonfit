<script lang="ts" context="module">
  export function load({ status }) {
    return {
      props: {
        status
      }
    };
  }
</script>

<script lang="ts">
  export let status: number;
  export let message = status === 404 ? 'Page not found' : 'Unknown';
</script>

<svelte:head>
  <title>salmonfit - {status}</title>
  <link rel="canonical" href="https://salmonfit.com/error" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="main">
  <!-- Copied from: https://codepen.io/codypearce/pen/VwYOGzq -->
  <div class="ocean">
    <div class="bubble bubble--1" />
    <div class="bubble bubble--2" />
    <div class="bubble bubble--3" />
    <div class="bubble bubble--4" />
    <div class="bubble bubble--5" />
    <div class="bubble bubble--6" />
    <div class="bubble bubble--7" />
    <div class="bubble bubble--8" />
    <div class="bubble bubble--9" />
    <div class="bubble bubble--10" />
    <div class="bubble bubble--11" />
    <div class="bubble bubble--12" />
    <div id="octocat" />
  </div>
  <p>Sad salmon is sad, back to <a href="/">the homepage</a></p>
  <p>Error - {message}</p>
</div>

<style>
  .main {
    text-align: center;
    padding-top: 10px;
  }
  p {
    font-weight: 300;
  }
  #octocat {
    height: 300px;
    width: 200px;
    background: url(/error/octomon.png) left center;
    animation: animateSprite 15s steps(1) infinite, swim 15s ease-in-out infinite;
    position: absolute;
    right: -200px;
    top: 50%;
    margin-top: -150px;
    z-index: 100;
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
    height: 50vh;
    background-image: linear-gradient(0deg, #182848, #2980b9);
    overflow: hidden;
  }

  .bubble {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: absolute;
    background-color: white;
    bottom: -30px;
    opacity: 0.2;
    animation: bubble 15s ease-in-out infinite, sideWays 4s ease-in-out infinite alternate;
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
