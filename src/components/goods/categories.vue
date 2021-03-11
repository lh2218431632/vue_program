<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-button  type="primary">添加分类</el-button>
    <el-table :data="categoriesList" style="width: 100%"  border  class="table" stripe>
      <el-table-column  type="index"  width="49px"></el-table-column>
      <el-table-column  prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column  prop="cat_deleted"  label="是否有效"></el-table-column>
      <el-table-column prop="cat_level" label="排序"></el-table-column>
      <el-table-column  width="130">
        <el-button  icon="el-icon-edit" type="primary"  size="mini" style="margin-right:5px"></el-button>
        <el-button  icon="el-icon-delete" type="danger" size="mini" style="margin-right:5px"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      categoriesList: [],
      categoriesInfo: {
        type: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    async getCategories () {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: this.categoriesInfo.type,
          pagenum: this.categoriesInfo.pagenum,
          pagesize: this.categoriesInfo.pagesize
        }
      })
      this.categoriesList = res.data.result
    }
  }
}
</script>

<style scoped>
.table{
  margin-top:15px
}
</style>
