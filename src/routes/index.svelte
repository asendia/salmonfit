<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ogImage from '$assets/og-image-salmonfit.jpg';
  const title = 'Salmon Fit';
  const description =
    'Fusion salmon dishes from Kebon Jeruk. Available at Grab food, Go-food & Traveloka eats!';
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
  <meta name="twitter:image" content={ogImage} />
  <link rel="canonical" href="https://salmonfit.com" />
  {#each menuItems as cat}
    {#each cat.items as item, id}
      {#if item.imgHref && id === 0}
        <link rel="preload" as="image" href={item.imgHref} />
      {/if}
    {/each}
  {/each}
  <script
    async
    custom-element="amp-carousel"
    src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
</svelte:head>

<Header {title} {description} />
{#each menuItems as cat, catID}
  <h3 class="category-name">{cat.name}</h3>
  <div class="category-body">
    {#if cat.itemIdsWithImages.length > 0}
      <amp-carousel
        id="carousel-{catID}"
        class="category-photo-carousel"
        width="300"
        height="200"
        layout="responsive"
        type="slides"
        role="region"
        aria-label="Carousel for {cat.name}"
      >
        {#each cat.itemIdsWithImages as imgId}
          <amp-img
            class="item-photo"
            alt="{cat.items[imgId].name} photo"
            src={cat.items[imgId].imgHref}
            width="300"
            height="200"><ImgPlaceholder /></amp-img
          >
        {/each}
      </amp-carousel>
    {/if}
    <ul class="menu-items{cat.itemIdsWithImages.length > 0 ? ' with-image' : ''}">
      {#each cat.items as item, itemID}
        <li class="menu-item">
          <div
            class="menu-name"
            role="button"
            tabindex={catID * 20 + itemID}
            on="tap:carousel-{catID}.goToSlide(index={cat.itemIdsWithImages.indexOf(itemID)})"
          >
            {item.name}
          </div>
          {#if item.description}
            <div class="menu-description">{item.description}</div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/each}
<Footer />

<style>
  .category-body {
    max-width: 1440px;
    margin: auto;
    position: relative;
  }
  .category-photo-carousel {
    display: block;
    height: 200px;
    border-radius: 10px;
    margin: 15px auto;
  }
  .item-photo {
    border-radius: 10px;
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
    cursor: pointer;
    outline: none;
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
    .category-photo-carousel {
      min-width: 300px;
      margin-top: 0;
      margin-left: 40px;
      position: absolute;
    }
    .menu-items.with-image {
      min-height: 200px;
    }
    .with-image .menu-item:nth-child(1),
    .with-image .menu-item:nth-child(2) {
      margin-left: 325px;
      min-height: 90px;
    }
    .with-image .menu-item:nth-child(2) {
      margin-top: -20px;
      margin-bottom: 40px;
    }
  }
</style>
