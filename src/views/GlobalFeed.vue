<template>
  <div class="globalFeed">
    Banner
    <div class="row">
      <div class="left">
        <mcv-feed/>
      </div>
      <div class="right">popular tags</div>
    </div>
  </div>
</template>
<script>
import McvFeed from '@/components/Feed';
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
  },
};
</script>
