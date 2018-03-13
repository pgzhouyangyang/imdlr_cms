<template lang="html">
  <div class="container">
      
      <table-group
        :options="options"
        :columnData="columnData"
        :tableData="tableData"
        @searchEvent="sumbit"
        @deleteEvent="deleteEvent"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @rowDblclick="rowDblclick"
        >
        <el-button type="primary" slot="search-right" icon="el-icon-plus">添加</el-button>
        <el-table-column
          slot="operation"
          fixed="right"
          label="操作"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </table-group>
  </div>
</template>

<script>
import TableGroup from "../base/table"
export default {
    data() {
        return {
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
                }

            ],
            tableData: [
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
            }]
        }
    },
    components: {
        TableGroup
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //搜索
        sumbit(data) {
            console.log(data);
        },
        // 删除
        deleteEvent(multipleSelection) {
            console.log(multipleSelection);
        },
        // 双击
        rowDblclick(row) {
            console.log(row);
        },
        // 操作
        handleClick(val) {
            console.log(val);
        }
    }
}
</script>

<style lang="css">
</style>
