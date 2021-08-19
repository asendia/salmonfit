<script lang="ts">
	import { categories } from '../modules/salmonfitMenu.svelte';
  import Social from '../modules/social.svelte';
</script>

<svelte:head>
  <title>Salmon Fit</title>
  <meta name="description" content="Fusion salmon dishes + cheescake from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!" />
  <meta property="og:title" content="Salmon Fit" />
  <meta property="og:description" content="Fusion salmon dishes + cheescake from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!" />
  <meta property="og:type" content="food" />
  <meta property="og:url" content="https://salmonfit.com" />
  <meta property="og:image" content="https://salmonfit.com/og-image-salmonfit.jpg" />
</svelte:head>

<h1 class="title"><img alt="Salmon Fit" src="/salmonfit.png" width="350" /></h1>
<Social />
{#each categories as cat}
	<h3 class="category">{cat.name}</h3>
  {#if cat.imgHref}
    <img class="category-photo" alt="{cat.name} photo" src="{cat.imgHref}" width="200" />
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
    font-weight: 400;
    background-image: linear-gradient(to right, #cacaca 33%, rgba(255,255,255,0) 0%);
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
