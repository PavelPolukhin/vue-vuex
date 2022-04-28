<template>
  <div class="pagination">
    <div class="pagination-item"
         v-for="item in pages" :key="item">
      <router-link :to="{path: url, query: {page: item}}">
        {{item}}
      </router-link>
    </div>
  </div>
</template>
<script>
import {range} from "@/helpers/utils";

export default {
  name: 'McvPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed:{
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit);
      return range(1, pagesCount)
    }
  }
}
</script>