<template lang="html">
  <div class="verify" >
      <div class="table-header">
            <div class="pull-left">
                <search :options="options" @searchEvent="search"></search>
            </div>
            <div class="pull-right">
                <el-button type="primary" icon="el-icon-plus" class="pull-r">添加</el-button>
            </div>
      </div>
      <div class="table-wrapp" id="tableWrapp">
          <el-table
          id="el_table"
          :max-height="maxHeight"
          :data="tableData"
          @row-click="rowClick"
          stripe
          border
          header-row-class-name="table-th"
          style="width: 100%">
          <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
          <el-table-column v-for="item in columnData" :key="item.prop"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :min-width="item.width"
            >
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
          <div class="table-footer-left">
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </div>
          <div class="table-footer-right">
              <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[20,50,100]"
              :page-size="pageSize"
              :total="total">
            </el-pagination>
          </div>
      </div>
  </div>
</template>

<script>
import Search from "./search"
// const MAX_HEIGHT = document.body.clientHeight - 61 - 60 - 20 -80
export default {
    data() {
        return {
            total: 400,
            pageSize:20,
            maxHeight:"250",
            options: [{
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            columnData: [
                {
                    prop: "date",
                    label: "日期",
                    width: "150",
                    fixed: true
                },
                {
                    prop: "name",
                    label: "姓名",
                    width: "120"
                },
                {
                    prop: "province",
                    label: "省份",
                    width: "120"
                },
                {
                    prop: "city",
                    label: "市区",
                    width: "120"
                },
                {
                    prop: "address",
                    label: "地址",
                    width: "300"
                },
                {
                    prop: "zip",
                    label: "邮编",
                    width: "120"
                },

            ],
            tableData: [{
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
},
{
  date: '2016-05-03',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
}, {
  date: '2016-05-02',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333
},
{
date: '2016-05-03',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1518 弄',
zip: 200333
},
{
date: '2016-05-03',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1518 弄',
zip: 200333
},
{
date: '2016-05-03',
name: '王小虎',
province: '上海',
city: '普陀区',
address: '上海市普陀区金沙江路 1518 弄',
zip: 200333
}
      ]
        }
    },
    components: {
        Search
    },
    created() {

    },
    mounted() {
        var height = document.getElementById("tableWrapp").clientHeight
        this.$nextTick(()=>{
            this.maxHeight = height
        });
        window.onresize = () => {
            var height = document.getElementById("tableWrapp").clientHeight
            this.maxHeight = height
        }
    },
    methods: {
        search(data) {
            // this.axios.get()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
         handleCurrentChange(val) {
           console.log(`当前页: ${val}`);
        },
        rowClick() {

        }
    }
}
</script>

<style lang="css">
    .verify {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
