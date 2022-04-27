<template>
  <div class="header">
    <div class="header-logo">
      <router-link :to="{name: 'globalFeed'}">Home</router-link>
    </div>
    <div class="header__right">
      <template v-if="isLoggedIn">
        <div class="header__right-item">
          <router-link :to="{name: 'register'}">New Article</router-link>
        </div>
        <div class="header__right-item">
          <router-link
            :to="{name: 'register', params: {slug: currentUser.username}}"
            ><img :src="currentUser.image" alt="" />
            {{ currentUser.username }}
          </router-link>
        </div>
      </template>
      <template v-if="isAnonymous">
        <div class="header__right-item">
          <router-link :to="{name: 'register'}">register</router-link>
        </div>
        <div class="header__right-item">
          <router-link :to="{name: 'login'}">login</router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  name: 'McvHeader',
  computed: {
   ...mapGetters({
     currentUser: "currentUser",
     isLoggedIn: "isLoggedIn",
     isAnonymous: "isAnonymous"
   })
  },
};
</script>
