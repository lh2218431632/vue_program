<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card"  >

    <el-row :gutter="20">
      <el-col :span="8"> <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input></el-col>
    </el-row>
    <el-table
      :data="ordersList"
      style="width: 100%" border  stripe  class="table">
      <el-table-column  type="index"  label="#" width="49"  >

      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格">
      </el-table-column>
      <el-table-column label="是否付款">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.order_pay==0" type="danger">未付款</el-tag>
          <el-tag effect="dark" v-else >已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column  prop="is_send" label="是否发货">

      </el-table-column>
      <el-table-column  prop="create_time"  label="下单时间"></el-table-column>
      <el-table-column  label="操作"  width="130">
        <el-button  type="primary"  icon="el-icon-edit" size="mini" style="margin-right:5px"></el-button>
        <el-button type="success" icon="el-icon-location "  size="mini" style="margin-right:5px"  @click="location"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.orderInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.orderInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>

  <el-dialog
    title="物流信息"
    :visible.sync="dialogVisible"
    width="50%">
    <span>这是一段信息</span>
  </el-dialog>
</div>
</template>

<script>
export default {
  created () {
    this.getOrder()
  },
  data () {
    return {
      ordersList: [],
      orderInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      dialogVisible: false
    }
  },
  methods: {
    async getOrder () {
      const { data: res } = await this.$http.get('orders', {
        params: {
          query: this.orderInfo.query,
          pagenum: this.orderInfo.pagenum,
          pagesize: this.orderInfo.pagesize
        }
      })
      this.total = res.data.total
      this.ordersList = res.data.goods
    },
    handleSizeChange (val) {
      this.orderInfo.pagesize = val
      this.getOrder()
    },
    handleCurrentChange (val) {
      this.orderInfo.pagenum = val
      this.getOrder()
    },
    location () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.table  {
  margin-top:15px;
}
</style>
