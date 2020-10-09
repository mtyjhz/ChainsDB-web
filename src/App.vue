<!--
 * @Author: cuijiajun
 * @Date: 2020-10-09 09:54:28
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-09 15:49:03
 * @FilePath: /sr2/src/App.vue
-->
<template>
  <div id="app">
        <div class="nav">
        <h2>Chains' DB</h2>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

.nav {
  width: 100vw;
  height: 100px;
  background: #409EFF;
  color: #fff;
  padding: 0 30px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
</style>
