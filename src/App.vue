<template>
  <div id="app">
    <mcv-header/>
    <router-view />
  </div>
</template>
<script>
import McvHeader from "@/components/HeaderApp";
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'McvApp',
  components:{
    McvHeader
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
