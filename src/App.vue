<!--
 * @Author: cuijiajun
 * @Date: 2020-10-09 09:54:28
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-12 15:53:44
 * @FilePath: /sr2/src/App.vue
-->
<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">
        <h2>
          <img class="logo" src="../src/assets/logo.png" alt="" srcset="" /></h2
      ></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.el-collapse-item__header{
  font-size: 20px !important;
}
a{
color: #409eff;
}
.dataTables_scrollHeadInner{
  margin: 0 auto;
}
.logo {
  width: 200px;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid rgb(222 226 230 / 0.2);
}
table.dataTable thead th,
table.dataTable thead td,
.dataTables_wrapper.no-footer .dataTables_scrollBody {
  border: 1px solid rgb(222 226 230 / 0.2);
}
.nav {
  width: 100vw;
  height: 100px;
  background: #409eff;
  color: #fff;
  padding: 0 30px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
</style>
