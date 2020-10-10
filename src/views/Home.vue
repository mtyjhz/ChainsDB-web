<!--
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:15:58
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-10 18:13:32
 * @FilePath: /sr2/src/views/Home.vue
-->
<template>
  <div class="home">
    <div class="code">
      <codemirror
        ref="editQuerySQL"
        @ready="onCodemirrorReady"
        @input="onCodemirrorInput"
        v-model="query.sql"
        :options="cmOptions"
      ></codemirror>
    </div>
    <div class="content" style="text-align: right">
      <router-link to="/Generalquery">
        <el-button type="primary" style="margin-left: 10px" to="/"
          >General query</el-button
        >
      </router-link>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleClick"
      >
        search</el-button
      >
      <el-popover
        placement="top-start"
        title="Query tips"
        width="200"
        trigger="hover"
        content="Currently, only 1000 query results are supported."
      >
        <i
          slot="reference"
          style="margin: 10px"
          class="header-icon el-icon-info"
        ></i>
      </el-popover>
      <p class="how-to-query">
        <router-link to="/download" style="margin-right: 20px">
          Data download
        </router-link>
        <router-link to="/table"> How to query? </router-link>
      </p>
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
        align="center"
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
import { codemirror } from 'vue-codemirror';
import { getEthdb } from '@/api';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
// import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';

// eslint-disable-next-line import/extensions
import { J2HConverter } from '@/assets/j2h-converter.js';

export default {
  name: 'App',
  data() {
    return {
      query: {
        sql: 'SELECT * FROM ethblock LIMIT 200',
      },
      tableData: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      columns: [],
      cmOptions: {
        scroll: false,
        tabSize: 4,
        lineNumbers: false,
        line: false,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: false,
        mode: 'text/x-mariadb',
        theme: 'idea',
        hintOptions: {
          completeSingle: false,
        },
      },
    };
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

    transformObject(keyArr, valueArr) {
      const obj = {};
      // eslint-disable-next-line array-callback-return
      keyArr.map((v, i) => {
        obj[keyArr[i]] = valueArr[i];
      });
      return obj;
    },
    handleClick() {
      getEthdb(this.query).then((res) => {
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

          this.tableData = [];
        }
      });
    },
    onCodemirrorReady(cm) {
      cm.on('keypress', () => {
        cm.showHint();
      });
    },
    onCodemirrorInput(newQuery) {
      this.query.sql = newQuery;
    },
  },
  created() {},
  components: {
    codemirror,
  },
};
</script>

<style lang="scss">
// table {
//   border-collapse: collapse;
//   margin: 0 auto;
//   text-align: center;
// }
// table td,
// table th {
//   border: 1px solid #cad9ea;
//   color: #666;
//   font
//   height: 30px;
// }
// table thead th {
//   background-color: #cce8eb;
//   width: 100px;
// }
// table tr:nth-child(odd) {
//   background: #fff;
// }
// table tr:nth-child(even) {
//   background: #f5fafa;
// }
.how-to-query {
  margin: 20px;
}
/* table {
  table-layout: fixed;
} */
thead td {
  font-weight: bold;
  background-image: linear-gradient(#e8eaec, #e8eaec),
    linear-gradient(#e8eaec, #e8eaec);
}
th,
td:nth-child(6) {
  max-width: 180px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
}
body {
  width: 100vw;

  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}

.CodeMirror {
  height: 180px;
  padding: 10px;
  background: #ddd;
  overflow: hidden;
  border-radius: 15px;
}
.code,
.content,
#divMain {
  padding: 20px;
  width: 100%;
}
.convert_btn {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #0368d4;
  padding: 9px 12px;
  font-size: var(--font-size);
  border-radius: 5px;
  color: #fff;
  background-color: #278efc;
}

.json_input:focus,
.convert_btn:hover {
  box-shadow: 0 6px 18px -9px #0368d4;
  transition: box-shadow 0.1s;
}
</style>
