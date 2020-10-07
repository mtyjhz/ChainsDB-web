<!--
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:15:58
 * @LastEditors: 崔佳俊
 * @LastEditTime: 2020-10-07 17:16:41
 * @FilePath: /chainsdb/src/App.vue
-->
<template>
  <div id="app">
    <div class="nav">
      <h2>Chains' DB</h2>
    </div>
    <div class="code">
      <codemirror
        ref="editQuerySQL"
        @ready="onCodemirrorReady"
        @input="onCodemirrorInput"
        v-model="query.sql"
        :options="cmOptions"
      ></codemirror>
    </div>
    <div class="content">
      <input
        id="btnConvert"
        type="button"
        value="查询"
        class="convert_btn"
        @click="handleClick"
      />
    </div>
    <div id="divMain"></div>
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
        sql: 'SELECT * FROM ethblock LIMIT 2',
      },
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
          // pagingType:{

          // },
          colReorder: {
            realtime: true,
          },
        });
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
table {
  table-layout: fixed;
}
thead td{
  font-weight: bold;
 background-image: linear-gradient(#e8eaec,#e8eaec),linear-gradient(#e8eaec,#e8eaec);
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
.nav {
  width: 100vw;
  height: 100px;
  background: #4608ad;
  color: #fff;
  padding: 0 30px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
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
