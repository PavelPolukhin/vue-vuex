<template>
  <div class="feed">
    <div class="isLoading" v-if="isLoading">loading</div>
    <div class="error" v-if="error">error</div>
    <div class="feeds" v-if="feed">
      <div class="article" v-for="(item, index) in feed.articles" :key="index">
        <div class="article__author">
          <div class="article__author-image">
            <router-link
              :to="{name: 'userProfile', params: {slug: item.author.username}}"
            >
              <img :src="item.author.image" alt="" />
            </router-link>
          </div>
          <div class="article__author-name">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: item.author.username},
              }"
            >
              {{ item.author.username }}
            </router-link>
          </div>
        </div>
        <div class="article-date">
          {{ item.createdAt }}
        </div>
        <div class="article-addFavorite">addFavorite</div>
        <div class="article-link">
          <router-link
            :to="{
              name: 'article',
              params: {slug: item.slug},
            }"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <span>read more</span>
            Tag list
          </router-link>
        </div>
      </div>
    </div>
    <mcv-pagination
      :total="feed?.articlesCount || 1"
      :limit="limit"
      :current-page="currentPage"
      :url="baseUrl"
    />
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/feed';
import {mapState} from 'vuex';
import McvPagination from '@/components/Pagination';
import {limit} from '@/helpers/vars';
import {stringify, parseUrl} from 'query-string';

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
  },
  data() {
    return {
      apiUrl: '/articles',
      limit,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifyParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    },
  },
};
</script>
