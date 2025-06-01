<template>
  <div class="banner-message">
    <div class="container">
      <p>购买符合条件的产品，即可获得限时优惠。24 个月免息分期和额外折扣可同时享受。<a href="#">了解更多 ></a></p>
    </div>
  </div>
</template>

<script setup>
// 横幅消息组件逻辑
</script>

<style scoped>
.banner-message {
  background-color: #f5f5f7;
  width: 100%;
  padding: 12px 0;
  font-size: 14px;
  text-align: center;
}

.container {
  max-width: 980px;
  margin: 0 auto;
}

p {
  margin: 0;
  color: #1d1d1f;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>