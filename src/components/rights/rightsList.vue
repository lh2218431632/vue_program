<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card >
    <el-table :data="rightList" style="width: 100%" :border="true">
      <el-table-column
        type="index"
        label='#'
        width="48">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="397">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="397">
      </el-table-column>
      <el-table-column   label="权限等级" width="395"   >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==0" >一级</el-tag>
            <el-tag v-else-if="scope.row.level==1"  type="success">二级</el-tag>
            <el-tag v-else  type="warning">三级</el-tag>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getRight()
  },
  data () {
    return {
      rightList: []
    }
  },
  methods: {
    async getRight () {
      const type = 'list'
      const { data: res } = await this.$http.get(`rights/${type}`)
      this.rightList = res.data
      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>
