<!--
 * @Author: cuijiajun
 * @Date: 2020-10-09 16:47:38
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-09 17:31:23
 * @FilePath: /sr2/src/views/table.vue
-->
<!--  -->
<template>
  <div class="tabledb">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="(item,index) in resDate"
       :key="index"  :name="index">
        <template slot="title" >
          <h5>
               {{item.title}}
          </h5>

    </template>
        <div>
       <el-tag style="margin:10px" v-for=" (ks,idx ) in item.keys" :key="idx" >{{ks}}</el-tag>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getdbTable } from '@/api/index';

export default {
  name: 'tabledb',

  data() {
    return {
      activeNames: ['1'],
      resDate: [],
    };
  },

  components: {
    // 模板
  },

  computed: {
    // 计算属性
  },

  methods: {
    // 方法
    handleChange(val) {
      console.log(val);
    },
  },
  created() {
    getdbTable().then((res) => {
      console.log(res);
      if (res.code === 0) {
        // eslint-disable-next-line max-len
        this.resDate = res.data.map((item) => ({ title: item.name, keys: Object.keys(item.content) }));
      }
    });
  },
};
</script>
<style lang='scss' scoped>
.collapse-item__header{
  font-size: 25px;
}
.tabledb {
  margin: 40px;
}
</style>
