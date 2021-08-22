<script lang="ts">
  import { amp } from '$app/env';

  const socialLinks = [
    {
      url: 'https://www.instagram.com/salmonfit.id/',
      alt: 'instagram logo',
      imgSrc: '/social/instagram-small.svg',
      text: 'salmonfit.id'
    },
    {
      url: 'https://food.grab.com/id/id/restaurant/salmon-fit-duri-kepa-delivery/6-C2XUWAX3PEU1JT',
      alt: 'grabfood logo',
      imgSrc: '/social/grab-small.svg',
      text: 'GrabFood'
    },
    {
      url: 'https://gofood.link/a/BLHH283',
      alt: 'gofood logo',
      imgSrc: '/social/gofood-small.svg',
      text: 'gofood'
    }
  ];
</script>

<div class="social-wrapper">
  {#each socialLinks as s}
    <a target="_blank" href={s.url} rel="noreferrer">
      {#if amp}
        <amp-img class="logo" alt={s.alt} src={s.imgSrc} width="24" height="24" />{s.text}
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
    text-decoration: none;
    color: #000;
    line-height: 24px;
    font-size: 10px;
    display: flex;
    margin: 0 10px;
  }
  .logo {
    margin-right: 5px;
  }
</style>
