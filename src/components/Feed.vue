<template>
  <div class="feed">
    <div class="isLoading" v-if="isLoading">loading</div>
    <div class="error" v-if="error">error</div>
    <div class="feeds" v-if="feed">
      <div class="article" v-for="(item, index) in feed.articles" :key="index">
        <router-link :to="{name: 'userProfile', params: {slug: n  }}"
      </div>
    </div>
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';

export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>
