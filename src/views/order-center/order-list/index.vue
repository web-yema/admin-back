<template>
  <div class="box">
    <Title />
    <List />
  </div>
</template>
<script>
import List from "@/views/order-center/order-list/list.vue";
import Title from "@/views/order-center/order-list/title.vue";
export default {
  components: {
    List,
    Title
  }
};
</script>
<style lang="scss" scoped>
.box {
  background: gainsboro;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  min-height: calc(100vh - 84px);
}
</style>
