<script lang="ts">
  import { amp } from '$app/env';
  import igLogo from '$assets/social/instagram-small.svg';
  import grabLogo from '$assets/social/grab-small.svg';
  import gofoodLogo from '$assets/social/gofood-small.svg';
  import travelokaLogo from '$assets/social/traveloka-small.svg';
  import ImgPlaceholder from './ImgPlaceholder.svelte';

  const socialLinks = [
    {
      url: 'https://www.instagram.com/salmonfit.id/',
      alt: 'instagram logo',
      imgSrc: igLogo,
      text: 'salmonfit.id'
    },
    {
      url: 'https://food.grab.com/id/id/restaurant/salmon-fit-duri-kepa-delivery/6-C2XUWAX3PEU1JT',
      alt: 'grabfood logo',
      imgSrc: grabLogo,
      text: 'GrabFood'
    },
    {
      url: 'https://www.traveloka.com/id-id/restaurants/indonesia/detail/salmon-fit-free-delivery-162720',
      alt: 'traveloka eats',
      imgSrc: travelokaLogo,
      text: 'Traveloka',
    },
    {
      url: 'https://gofood.link/a/BLHH283',
      alt: 'gofood logo',
      imgSrc: gofoodLogo,
      text: 'gofood'
    },
  ];
</script>

<div class="social-wrapper">
  {#each socialLinks as s}
    <a target="_blank" href={s.url} rel="noreferrer">
      {#if amp}
        <amp-img class="logo" alt={s.alt} src={s.imgSrc} width="24" height="24"
          ><ImgPlaceholder /></amp-img
        >{s.text}
      {:else}
        <img class="logo" alt={s.alt} src={s.imgSrc} width="24" height="24" />{s.text}
      {/if}
    </a>
  {/each}
</div>

<style>
  .social-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: #aaaaaa;
    line-height: 24px;
    font-size: 10px;
    display: flex;
    margin: 0 5px;
  }
  a:nth-child(3) {
    margin-left: 0;
  }
  .logo {
    margin-right: 4px;
  }
</style>
