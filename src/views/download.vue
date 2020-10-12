<!--
 * @Author: cuijiajun
 * @Date: 2020-10-10 15:56:51
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-12 11:47:06
 * @FilePath: /sr2/src/views/download.vue
-->
<!--  -->
<template>
  <div class="download">
      <div>
         <el-button
        type="primary"
        style="margin: 10px"
        @click="handleClick"
      >
        Go Back</el-button>
      </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="value" label="Cid" >
        <template slot-scope="{row}">
          <div v-for="(item,index) in row.value" :key="index">
            {{item}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="Description" > </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCidlist } from '@/api';

export default {
  name: 'download',

  data() {
    return {

      tableData: [
        {
          describe: '50w',
          value: [
            'bafykbzaceaupz4lnj3b6hn4nzpxb3ctthphqtgriodshb2v52vtkffxy55eys',
          ],
        },
        {
          describe: '100w',
          value: [
            'bafyaa6qsgafcmalqudsaeie77hfybxv74emne4cxp5w4kxojfxtc2fsp7ziwyvs4f2tmsfvygujaagelucbyabasgafcmalqudsaeiesy7zpgfcwl4k36lccbms44x2ogldt3yueji7m6s27s4j5ju37tqjaaghlrhpiwaqkcqeaegeawdoiwbraqcaibaaeecalbxelai',
          ],
        },
        {
          describe: '150w',
          value: [
            'bafykbzacedburkamgce2ijv4dwdpac4nygnvr57voermjrnim2k4pugnjyeeg',
          ],
        },
        {
          describe: '200w',
          value: [
            'bafykbzaceczcdmp7svg4l32jhy7jimon57gctoyjltewb6v7bbrf7obyucsew',
          ],
        },
        {
          describe: '250w',
          value: [
            'bafykbzaceamauwql5d2sq3sdbj4ubrdcihwvelgmsqmeocky6fb3kl6dguvn2',
          ],
        },
        {
          describe: '300w',
          value: [
            'bafykbzaceawlbttnuhd6vdmiszbon4iphquvdxobf5qj2mb2an2w7nsvipmd4',
          ],
        },
        {
          describe: '350w',
          value: [
            'bafykbzacecgyapta2qztvlo4ykgweqh64z4gxwnpx5j2as5gmwweqiwn4qp2o',
          ],
        },
        {
          describe: '400w',
          value: [
            'bafykbzaceapsztlo6ty62sm2oq4uizgvxfsgrjfhxpmi2jyctlrgewtbcvvp6',
          ],
        },
        {
          describe: '450w',
          value: [
            'bafykbzacebsqnaveicupcsxucdjimipn6yk5ri6qcuv44dxqeyrnzw2jmtejy',
            'bafykbzaceaabawdfy5g26jprrxnadnenywpzot6esi62ya2q4j44t44jlanhk',
          ],
        },
        {
          describe: '500w',
          value: [
            'bafykbzaceaelxetdawerycfdtbl6dktj6vwzztm3ivlixgfqmf2x2rkybe2qu',
            'bafykbzaceaerb7ywmzsztwfltlrbp2cgwe6pvwkrowffbnbcbjm5flw5wzng2',
            'bafykbzaceacajexiixyhqy7abeeg4hyxjevh7tbp555b3vufxxwgtyhar6e4k',
          ],
        },
        {
          describe: '550w',
          value: [
            'bafykbzacea2otjby2jncochopuugc463qpe7tychg2iiistvfqdatmhx65jby',
            'bafykbzaceaplevpynsav65ftdstwq34obafj6j7ouzowbhgeozkm5u3xp2pn6',
            'bafykbzacebkbrcmrapgmnkfgrnj7e6iqkte3kqc2xgtepg6zinufxilsfvuae',
          ],
        },
        {
          describe: '600w',
          value: [
            'bafykbzacedalshvaxbecqdo7irzodczuovlel5etpjjhybfelxh7kcmq45gn2',
            'bafykbzacebyir5tsutedb3a2zkos6ntfv6kep7r2odnrcqdupc62h2u4sv3o6',
            'bafykbzacebwntzf3n3y7ukhv3v7mjxanznyu62lp7ctdfimpp5il33ph2utsu',
          ],
        },
        {
          describe: '650w',
          value: [
            'bafykbzacecswaanmblt7xpntmuqkofqoaewuyyoivawq333ftvwpbcehvnqt6',
            'bafykbzacectfzodsjnkgtdgfy2kcae3r37g3hz5uaqznmpbapvkqjpnemutcu',
            'bafykbzaceb4jztizp5iyfsyjk7pkgigng6ciqaomn4ssyynmyfwdahdusv2fy',
          ],
        },
        {
          describe: '700w',
          value: [
            'bafykbzacea57qh3ksr4nd5m6nwqsikkxo4krbf5cfsypqbav6qayykrizs33o',
            'bafykbzacec6j6c2g7xydtwxhlote55vqrgwxsuphvbpujerz6ryz5y6hfolg2',
            'bafykbzacecqcgbnyhftjoq7ow5cecdvgj4kbn4cvvwknlkhgjglbaimi3lf5a',
          ],
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
    handleClick() {
      this.$router.go(-1);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  },

  created() {
    getCidlist().then((res) => {
      if (res.code === 0) {
        this.tableData = res.data;
      }
    });
  },

};
</script>
<style lang='scss' >
.download {
  padding: 30px;
}

</style>
