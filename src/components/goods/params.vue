<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>参数列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      :closable="false"
      effect="dark"
      show-icon>
    </el-alert>
    <el-row>
      <el-col :span="2">选择商品分类:</el-col>
      <el-col :span="14">
        <el-cascader
            v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
      </el-col>
    </el-row>
    <el-tabs >
      <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'params'
}
</script>

<style scoped>
.el-row{
  display: flex;
  margin-top:15px;
  align-items: center;
}

</style>
