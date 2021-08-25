<script lang="ts">
  import { amp } from '$app/env';
  import Social from '$components/Social.svelte';
  import ogImage from '$assets/og-image-salmonfit.jpg';
  const title = 'salmonfit';
  const description =
    'Fusion salmon dishes & cheesecake from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!';
  import menuItems from '$lib/menuItems';
import ImgPlaceholder from '$components/ImgPlaceholder.svelte';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="food" />
  <meta property="og:url" content="https://salmonfit.com" />
  <meta property="og:image" content={ogImage} />
  <link rel="canonical" href="https://salmonfit.com" />
  {#each menuItems as cat, id}
    {#if cat.imgHref && id < 2}
      <link rel="preload" as="image" href={cat.imgHref} />
    {/if}
  {/each}
</svelte:head>

<p class="headline">Fushion salmon dishes and cheesecake from Kebon Jeruk</p>
<Social />
{#each menuItems as cat}
  <h3 class="category-name">{cat.name}</h3>
  <div class="category-body">
    {#if cat.imgHref}
      {#if amp}
        <amp-img
          class="category-photo"
          alt="{cat.name} photo"
          src={cat.imgHref}
          width="200"
          height="200"
        ><ImgPlaceholder /></amp-img>
      {:else}
        <img
          class="category-photo"
          alt="{cat.name} photo"
          src={cat.imgHref}
          width="200"
          height="200"
        />
      {/if}
    {/if}
    <ul class="menu-items{cat.imgHref ? ' with-image' : ''}">
      {#each cat.items as item}
        <li class="menu-item">
          <div class="menu-name">{item.name}</div>
          {#if item.description}
            <div class="menu-description">{item.description}</div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/each}

<style>
  .headline {
    text-align: center;
    font-weight: 300;
    margin: 0 0 11px;
    font-size: 12px;
    color: #e74e35;
  }
  .category-body {
    max-width: 1440px;
    margin: auto;
    position: relative;
  }
  .category-photo {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin: 15px auto;
  }
  .category-name {
    text-align: center;
    font-family: 'Satisfy', cursive;
    font-size: 26px;
    font-weight: 500;
    margin: 30px 0 0px;
  }
  .menu-items {
    margin-bottom: 30px;
    padding: 0 40px;
  }
  .menu-item {
    list-style-type: none;
    margin-bottom: 20px;
  }
  .menu-name {
    padding: 0 0 10px;
    font-weight: 300;
    background-image: linear-gradient(to right, #cacaca 33%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-size: 7px 1px;
    background-repeat: repeat-x;
  }
  .menu-description {
    padding: 8px 0;
    color: #aaaaaa;
    font-size: 12px;
  }

  @media (min-width: 700px) {
    .category-name {
      margin-top: 55px;
    }
    .category-photo {
      margin-top: 0;
      margin-left: 40px;
      position: absolute;
    }
    .menu-items.with-image {
      min-height: 200px;
    }
    .with-image .menu-item:nth-child(1),
    .with-image .menu-item:nth-child(2) {
      margin-left: 225px;
      min-height: 90px;
    }
    .with-image .menu-item:nth-child(2) {
      margin-top: -30px;
      margin-bottom: 40px;
    }
  }
</style>
