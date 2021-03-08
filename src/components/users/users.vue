<template>
<div>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%" @close="setFormInfo">
    <el-form ref="formRef" :model="formInfo" label-width="80px" :rules="formRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input v-model="formInfo.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email"  type="email">
        <el-input v-model="formInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话"  prop="mobile">
        <el-input v-model="formInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitUser()">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog
    title="编辑用户"
    :visible.sync="dialogVisible1"
    width="50%">
    <el-form ref="form1Ref" :model="formInfo" label-width="80px"  :rules="formRules">
      <el-form-item label="用户名" >
        <el-input v-model="formInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱"  prop="email">
        <el-input v-model="formInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机"  prop="mobile">
        <el-input v-model="formInfo.mobile" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="editUserDo">确 定</el-button>
  </span>
  </el-dialog>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card class="box-card">
    <el-row :gutter="20"  class="row">
      <el-col :span="8"><el-input placeholder="请输入内容" v-model="inputContent"  :clearable="true" @clear="queryUser">

        <el-button slot="append" icon="el-icon-search"  @click="queryUser()"></el-button>
      </el-input></el-col>
      <el-col :span="4"><el-button  type="primary"  @click="changeVisibility()" >添加用户</el-button></el-col>

    </el-row>

    <el-table :data="users" border style="width: 100%">
      <el-table-column  type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column label="状态">
<!--        想在父组件里使用子组件的数据，就应该在子组件里写一个作用域插槽-->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  class="btn">
       <template  slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" size="mini" style="margin-left:15px"  @click="editUser(scope)"></el-button>
         <el-button type="danger" icon="el-icon-delete" size="mini"  style="margin-left:15px" @click="deleteUser(scope)"></el-button>
         <el-tooltip  content="分配权限" placement="top" :enterable="false">
           <el-button type="warning" icon="el-icon-setting"  size="mini" style="margin-left:15px"></el-button>
         </el-tooltip>
       </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paramsInfo.pagenum" :page-sizes="[10, 15, 20]" :page-size="paramsInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total=total>

    </el-pagination>
  </el-card>
</div>
</template>

<script>
export default {

  created () {
    this.getUsers()
  },
  data () {
    var telephoneValidator = (rule, value, callback) => {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if (!reg.test(value)) {
        return callback(new Error('请输入合法的手机号码'))
      } else { return callback() }
    }
    var emailValidator = (rule, value, callback) => {
      var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入合法的邮箱地址'))
      } else { return callback() }
    }
    return {

      users: [],
      paramsInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      formInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      inputContent: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      id: '',
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [{
          validator: emailValidator, trigger: 'blur'
        }],
        mobile: [{
          validator: telephoneValidator, trigger: 'blur'
        }]
      }

    }
  },
  methods: {
    async getUsers () {
      const { data: res } = await this.$http.get('users', { params: this.paramsInfo })
      console.log(res.data)
      this.users = res.data.users
      this.total = res.data.total
      this.total = res.data.total
    },
    handleSizeChange (val) {
      this.paramsInfo.pagesize = val
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.paramsInfo.pagenum = val
      this.getUsers()
    },
    async changeStatus (index) {
      const { data: res } = await this.$http.put(`users/${index.row.id}/state/${index.row.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('状态设置失败')
      } else {
        this.$message.success('状态设置成功')
      }
    },
    queryUser () {
      this.paramsInfo.query = this.inputContent
      this.getUsers()
    },
    changeVisibility () {
      this.dialogVisible = true
    },
    submitUser () {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', {
          username: this.formInfo.username,
          password: this.formInfo.password,
          email: this.formInfo.email,
          mobile: this.formInfo.mobile
        })
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message.error('用户添加失败')
        } else {
          this.$message.success('用户添加成功')
        }
        this.dialogVisible = false
      })
    },
    setFormInfo () {
      this.$refs.formRef.resetFields()
    },
    editUser (val) {
      this.dialogVisible1 = true
      this.formInfo.username = val.row.username
      this.formInfo.email = val.row.email
      this.formInfo.mobile = val.row.mobile
      this.id = val.row.id
    },
    editUserDo () {
      this.$refs.form1Ref.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`users/${this.id}`, {
          email: this.formInfo.email,
          mobile: this.formInfo.mobile
        })
        if (res.meta.status === 200) {
          this.$message.success('编辑成功！')
          await this.getUsers()
        } else { this.$message.error('编辑失败') }
        this.dialogVisible1 = false
      })
    },
    async  deleteUser (val) {
      const res1 = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(erro => erro)
      if (res1 === 'confirm') {
        const { data: res } = await this.$http.delete(`users/${val.row.id}`)
        if (res.meta.status === 200) {
          this.$message.success('删除成功！')
          await this.getUsers()
        } else { this.$message.error('删除失败') }
      } else { this.$message.info('取消成功！') }
    }
  }
}
</script>

<style scoped>
.row  {
  margin-bottom: 15px;
}
</style>
