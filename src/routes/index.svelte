<script lang="ts">
  import { categories } from '../modules/salmonfitMenu.svelte';
  import Social from '../modules/social.svelte';
  import Fonts from '../modules/fonts.svelte';
  const title = 'Salmon Fit';
  const description =
    'Fusion salmon dishes + cheesecake from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="food" />
  <meta property="og:url" content="https://salmonfit.com" />
  <meta property="og:image" content="https://salmonfit.com/og-image-salmonfit.jpg" />
  <link rel="canonical" href="https://salmonfit.com" />
  <Fonts />
  <link rel="preload" as="image" href="/salmonfit.png" />
  {#each categories as cat, id}
    {#if cat.imgHref && id < 2}
      <link rel="preload" as="image" href="{cat.imgHref}" />
    {/if}
  {/each}
</svelte:head>

<h1 class="title"><amp-img alt="Salmon Fit" src="/salmonfit.png" width="350" height="100" /></h1>
<Social />
{#each categories as cat}
  <h3 class="category">{cat.name}</h3>
  {#if cat.imgHref}
    <amp-img
      class="category-photo"
      alt="{cat.name} photo"
      src={cat.imgHref}
      width="200"
      height="200"
    />
  {/if}
  <ul class="menu-items">
    {#each cat.items as item}
      <li class="menu-item">
        <div class="menu-name">{item.name}</div>
        {#if item.description}
          <div class="menu-description">{item.description}</div>
        {/if}
      </li>
    {/each}
  </ul>
{/each}

<style>
  .title {
    text-align: center;
    padding: 10px 0;
  }
  .category-photo {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin: 15px auto;
  }
  .category {
    text-align: center;
    font-family: 'Satisfy', cursive;
    font-size: 26px;
    font-weight: 500;
  }
  .menu-items {
    font-family: 'Roboto', sans-serif;
    margin-bottom: 30px;
    padding: 0 40px;
  }
  .menu-item {
    list-style-type: none;
    margin-bottom: 20px;
  }
  .menu-name {
    padding: 10px 0;
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
</style>
