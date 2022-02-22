<script lang="ts">
  import { amp } from '$app/env';
  import igLogo from '$assets/social/instagram-small.svg';
  import whatsappLogo from '$assets/social/whatsapp-small.svg';
  import grabLogo from '$assets/social/grab-small.svg';
  import gofoodLogo from '$assets/social/gofood-small.svg';
  import travelokaLogo from '$assets/social/traveloka-small.svg';
  import ImgPlaceholder from './ImgPlaceholder.svelte';

  const socialLinks = [
    {
      url: 'https://www.instagram.com/salmonfit.id/',
      alt: 'instagram',
      imgSrc: igLogo,
      text: 'salmonfit.id'
    },
    {
      url: 'https://wa.me/6281310832474',
      alt: 'whatsapp',
      imgSrc: whatsappLogo,
      text: 'WhatsApp'
    },
    {
      url: 'https://www.traveloka.com/id-id/restaurants/indonesia/detail/salmon-fit-free-delivery-162720',
      alt: 'traveloka eats',
      imgSrc: travelokaLogo,
      text: 'Traveloka'
    },
    {
      url: 'https://gofood.co.id/english/jakarta/restaurant/salmon-fit-apartemen-menara-kebon-jeruk-06f0dcc6-14f4-4092-810f-2bcc81214d23',
      alt: 'gofood',
      imgSrc: gofoodLogo,
      text: 'gofood'
    },
    {
      url: 'https://food.grab.com/id/id/restaurant/salmon-fit-duri-kepa-delivery/6-C2XUWAX3PEU1JT',
      alt: 'grabfood',
      imgSrc: grabLogo,
      text: 'GrabFood'
    }
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
    flex-wrap: wrap;
    padding: 0 20px;
  }
  a {
    color: #aaaaaa;
    line-height: 24px;
    font-size: 10px;
    display: flex;
    margin: 0 10px 10px;
  }
  .logo {
    margin-right: 4px;
  }
</style>
