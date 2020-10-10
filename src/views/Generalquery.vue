<!--
 * @Author: cuijiajun
 * @Date: 2020-10-09 14:08:44
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-10 18:07:34
 * @FilePath: /sr2/src/views/Generalquery.vue
-->
<!--  -->
<template>
  <div class="generalquery">
    <div class="select-box">
      <el-cascader
        v-model="value"
        class="input-box"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
      <el-input
        v-model="params.addr"
        v-if="value.includes('1')"
         class="input-box"
        placeholder="请输入地址"
      />
      <el-input
        v-model="params.height"
        v-if="value.includes('5')"
           class="input-box"
        placeholder="请输入height"
      />
      <el-input
        v-model="params.heightBegin"
        v-if="value.includes('block')"
            class="input-box"
        placeholder="请输入heightBegin"
      />
      <el-input
        v-model="params.heightEnd"
        v-if="value.includes('block')"
            class="input-box"
        placeholder="请输入heightEnd"
      />
      <el-date-picker
        v-model="time"
        value-format="timestamp"
        @change="changePicker"
        v-if="value.includes('time')"
         class="input-box"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        v-model="params.transHash"
        v-if="value.includes('2')"
          class="input-box"
        placeholder="请输入transHash"
      />
      <el-input
        v-model="params.blockHash"
        v-if="value.includes('3')"
          class="input-box"
        placeholder="请输入blockHash"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
          style="margin: 10px"
        @click="onSubmit"
      >
        search</el-button
      >
      <router-link to="/">
        <el-button type="primary" style="margin: 10px" to="/"
          >Advanced query</el-button
        >
      </router-link>
      <el-popover
        placement="top-start"
        title="Query tips"
        width="200"
        trigger="hover"
        content="Currently, only 1000 query results are supported."
      >
        <i slot="reference" style="margin:10px"  class="header-icon el-icon-info"></i>
      </el-popover>
    </div>
       <div id="divMain" v-show="columns.length>0">
      <el-table
       stripe
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.name"
          :label="item.name"
          width="180"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getquery } from '@/api';

// eslint-disable-next-line import/extensions
import { J2HConverter } from '@/assets/j2h-converter.js';

export default {
  data() {
    return {
      time: [],
      value: [],
      tableData: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      columns: [],
      params: {
        type: '',
        addr: '',
        timeBegin: '',
        timeEnd: '',
        transHash: '',
        blockHash: '',
        heightBegin: '',
        heightEnd: '',
        height: '',
      },
      options: [
        {
          value: '1',
          label: 'address',
          children: [
            {
              value: 'transaction',
              label: 'transaction',
              children: [
                {
                  value: 'yes',
                  label: 'end',
                },
                {
                  value: 'block',
                  label: 'heightBegin-heightEnd',
                },
                {
                  value: 'time',
                  label: 'timeBegin-timeEnd',
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: 'transaction hash',
        },
        {
          value: '3',
          label: 'blockHash',
        },
        {
          value: '4',
          label: 'transaction',
          children: [
            {
              value: 'block',
              label: 'heightBegin-heightEnd',
            },
            {
              value: 'time',
              label: 'timeBegin-timeEnd',
            },
          ],
        },
        {
          value: '5',
          label: 'blockHeight',
        },
      ],
    };
  },

  components: {
    // 模板
  },

  computed: {
    // 计算属性
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 方法
    transformObject(keyArr, valueArr) {
      const obj = {};
      // eslint-disable-next-line array-callback-return
      keyArr.map((v, i) => {
        obj[keyArr[i]] = valueArr[i];
      });
      return obj;
    },
    onSubmit() {
      getquery(this.params).then((res) => {
        if (res.code === 0) {
          if (res.data.rows.length <= 0) {
            // eslint-disable-next-line no-undef

            this.$message.error('no data');
            this.tableData = [];
            return;
          }
          this.columns = res.data.columns;
          const resultDate = [];
          if (res.data.columns.length > 0 && res.code === 0) {
            //   console.log(res);
            const keyArr = res.data.columns.map((item) => item.name);
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < res.data.rows.length; index++) {
              // const element = array[index];
              // eslint-disable-next-line no-undef
              resultDate.push(
                this.transformObject(keyArr, res.data.rows[index]),
              );
            }
          }
          this.tableData = resultDate;
        } else {
          this.$message.error(res.msg);
          // eslint-disable-next-line no-undef
          this.tableData = [];
        }
      });
    },
    changePicker(e) {
      if (e) {
        // eslint-disable-next-line prefer-destructuring
        this.params.timeBegin = e[0] / 1000;
        // eslint-disable-next-line prefer-destructuring
        this.params.timeEnd = e[1] / 1000;
      }
    },
    handleChange(value) {
      // eslint-disable-next-line prefer-destructuring
      this.params = {
        type: '',
        addr: '',
        timeBegin: '',
        timeEnd: '',
        transHash: '',
        blockHash: '',
        heightBegin: '',
        heightEnd: '',
        height: '',
      };
      // eslint-disable-next-line prefer-destructuring
      this.params.type = value[0];
    },
  },
};
</script>
<style lang='scss' scoped>
.input-box{
  margin: 5px;
 width: 300px;
}
#divMain {
  padding: 20px;
  width: 100%;
}
.router-text {
  color: #007bff;
  line-height: 2.5;
}
.select-box {
  padding: 40px;
  text-align: center;
}
</style>
