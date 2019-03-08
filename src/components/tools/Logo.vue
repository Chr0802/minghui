<template>
  <div class="logo">
    <router-link :to="{name:'home'}">
      <img src="~@/assets/logo.png" alt="logo" style="height: 45px">
      <h1 v-if="showTitle" style="font-size: 2em">明辉伟业</h1>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      title: {
        type: String,
        default: '',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    }
  }
</script>
<style scoped>
  img{
    height:28px;
  }
</style>