<template>
  <div>
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script setup>
import NavbarComponent from './components/layout/NavbarComponent.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

body {
  font-size: 16px;
  line-height: 1.5;
  color: #1d1d1f;
  background-color: #fff;
}
</style>