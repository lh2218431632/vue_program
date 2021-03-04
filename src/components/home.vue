<template>
<div  class="home_father">
  <el-button type="info" @click="signOut()">退出</el-button>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    signOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
