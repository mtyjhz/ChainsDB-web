<!--
 * @Author: cuijiajun
 * @Date: 2020-10-09 14:08:44
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-09 16:44:10
 * @FilePath: /sr2/src/views/Generalquery.vue
-->
<!--  -->
<template>
  <div class="generalquery">
    <div class="select-box">
      <el-cascader
        v-model="value"
        style="width: 300px"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
      <el-input
        v-model="params.addr"
        v-if="value.includes('1')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入地址"
      />
      <el-input
        v-model="params.height"
        v-if="value.includes('5')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入height"
      />
       <el-input
        v-model="params.heightBegin"
        v-if="value.includes('block')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入heightBegin"
      />
       <el-input
        v-model="params.heightEnd"
        v-if="value.includes('block')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入heightEnd"
      />
      <el-date-picker
       v-model="time"
       value-format='timestamp'
      @change='changePicker'
       v-if="value.includes('time')"
       style="margin-left:10px;"

      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      <el-input
        v-model="params.transHash"
        v-if="value.includes('2')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入transHash"
      />
      <el-input
        v-model="params.blockHash"
        v-if="value.includes('3')"
        style="width: 300px;margin-left:10px;"
        placeholder="请输入blockHash"
      />
       <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="onSubmit">
         search</el-button>
         <router-link to='/' >
       <el-button type="primary" style="margin-left:10px;" to='/'>Advanced query</el-button>
        </router-link>
    </div>
     <div id="divMain"></div>
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
        if (res.data.rows.length <= 0) {
          this.$message.error('no data');
          return;
        }
        if (res.code === 0) {
          const resultDate = [];
          if (res.data.columns.length > 0 && res.code === 0) {
          //   console.log(res);
            const keyArr = res.data.columns.map((item) => item.name);
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < res.data.rows.length; index++) {
            // const element = array[index];
            // eslint-disable-next-line no-undef
              resultDate.push(this.transformObject(keyArr, res.data.rows[index]));
            }
          }

          // eslint-disable-next-line no-undef
          const j2ht = new J2HConverter(JSON.stringify(resultDate), 'divMain');
          j2ht.attributes = {
            class:
            'j2ht_table table table-striped table-bordered table-hover dataTables-example',
            cellspacing: '1',
            cellpadding: '2',
          };
          j2ht.convert();

          // eslint-disable-next-line no-undef
          $('.j2ht_table').dataTable({
            ordering: false,
            scrollX: true,
            jQueryUI: true,
            pageLength: 50,
            colReorder: {
              realtime: true,
            },
          });
        }
      });
    },
    changePicker(e) {
      if (e) {
        // eslint-disable-next-line prefer-destructuring
        this.params.timeBegin = e[0];
        // eslint-disable-next-line prefer-destructuring
        this.params.timeEnd = e[1];
      }
    },
    handleChange(value) {
      // eslint-disable-next-line prefer-destructuring
      // this.params = {
      //   type: '',
      //   addr: '',
      //   timeBegin: '',
      //   timeEnd: '',
      //   transHash: '',
      //   blockHash: '',
      //   heightBegin: '',
      //   heightEnd: '',
      //   height: '',
      // };
      this.params.type = value[0];
    },
  },
};
</script>
<style lang='scss' scoped>
#divMain {
  padding: 20px;
  width: 100%;
}
.router-text{
  color: #007bff;
  line-height: 2.5;
}
.select-box {
  padding: 40px;
  text-align: center;
}
</style>
