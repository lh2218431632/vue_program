<template>
<div>
  <el-breadcrumb separator="/"  class="header">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card >
    <el-row :gutter="15">
      <el-col :span="8">
        <el-input placeholder="请输入内容">
          <el-button  icon="el-icon-search" slot="append"></el-button>
      </el-input>
      </el-col>
      <el-col :span="4"><el-button type="primary">添加商品</el-button></el-col>
    </el-row>
    <el-table :data="goodList" style="width: 100%"  border  class="table" stripe>
      <el-table-column  type="index"  label="#"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column  prop="add_time" label="创建时间">

      </el-table-column>
      <el-table-column  label="操作"  width="130">
        <template>
          <el-button  type="primary"  icon="el-icon-edit" size="mini" style="margin-right:5px"></el-button>
          <el-button  type="danger"  icon="el-icon-delete"  size="mini" style="margin-right:5px"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.goodParams.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.goodParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getGoods()
  },
  data () {
    return {
      goodList: [],
      goodParams: {
        query: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  methods: {
    async getGoods () {
      const { data: res } = await this.$http.get('goods', {
        params: {
          query: this.goodParams.query,
          pagenum: this.goodParams.pagenum,
          pagesize: this.goodParams.pagesize
        }
      })
      this.goodList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange (val) {
      this.goodParams.pagesize = val
      this.getGoods()
    },
    handleCurrentChange (val) {
      this.goodParams.pagenum = val
      this.getGoods()
    }
  }
}
</script>

<style scoped>
.table {
  margin-top:15px;
}
</style>
