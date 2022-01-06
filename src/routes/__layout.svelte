<script>
  import Fonts from '$components/Fonts.svelte';
  import stackedPeaksImage from '$assets/stacked-peaks-haikei.svg';
</script>

<svelte:head>
  <meta name="theme-color" content="#2c2c2c" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <link rel="apple-touch-icon" href="/salmonfit-logo-192-white.png" />
  <link
    href="/splashscreens/iphone5_splash.png"
    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/iphone6_splash.png"
    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/iphoneplus_splash.png"
    media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/iphonex_splash.png"
    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/iphonexr_splash.png"
    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/iphonexsmax_splash.png"
    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/ipad_splash.png"
    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/ipadpro1_splash.png"
    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/ipadpro3_splash.png"
    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <link
    href="/splashscreens/ipadpro2_splash.png"
    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
    rel="apple-touch-startup-image"
  />
  <Fonts />
</svelte:head>

<div class="background" style="--stacked-peaks-image: url({stackedPeaksImage})">
  <slot />
</div>

<style>
  :global(body) {
    margin: 0;
    color: #fff;
    background-color: #2c2c2c;
  }
  :global(amp-img) {
    background-color: #2c2c2c;
  }
  .background {
    background-image: var(--stacked-peaks-image);
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
