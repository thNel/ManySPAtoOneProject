<template>
<h1>{{name}}</h1>
</template>

<script>
export default {
  name: "AppName",
  props: {
    name: {
      type: String,
      default: 'Имя не задано'
    }
  }
}
</script>

<style scoped>

</style>