<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/todo-icon.png" class="logo">
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoList
  }
}
</script>

<style lang="scss">
.logo {
  display: block;
  margin: 20px auto;
  height: 50px;
}
</style>

Install sass by running - npm install sass-loader node-sass --save