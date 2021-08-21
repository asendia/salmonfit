<script lang="ts" context="module">
  export interface FoodCategory {
    name: string;
    items: Array<Food>;
    imgHref?: string;
  }
  interface Food {
    name: string;
    price?: number;
    imgHref?: string;
    description?: string;
  }
</script>
