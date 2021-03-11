<template>
<div>
  <el-breadcrumb separator="/" >
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card >
    <el-button type="primary" class="header"  @click="addRole">添加角色</el-button>
    <el-dialog title="添加角色" :visible.sync="dialogVisible1" width="40%">
      <el-form  :model="role" label-width="80px"  :rules="roleRules">
        <el-form-item label="角色名称"  prop="roleName">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="submitRole">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="dialogVisible2" width="40%">
      <el-form  :model="role" label-width="80px"  :rules="roleRules">
        <el-form-item label="角色名称"  prop="roleName">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="editRole">确 定</el-button>
  </span>
    </el-dialog>
    <el-table :data="roleList" style="width: 100%"  border  stripe>
      <el-table-column type="expand"  :width="48" >
          <template slot-scope="scope">
            <el-row v-for="(item,index) in scope.row.children"  :key="item.id"  :class="[index==0?'top':'','bottom','row']" >
              <el-col :span="5" ><el-tag  effect="dark" closable  @close="open(scope.row,item.id)">{{item.authName}}</el-tag> <i class="el-icon-caret-right"></i></el-col>
              <el-col :span="19">
                        <el-row v-for="(item1,index1) in  item.children" :key="item1.id" :class="[index1==0?'':'top','row']">
                          <el-col :span="5">
                            <el-tag type="success"  effect="dark" closable  @close="open(scope.row,item1.id)">{{item1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                          </el-col  >
                          <el-col  :span="14" >
                                <el-tag type="warning"  v-for="(item2) in  item1.children" :key="item2.id" effect="dark"  class="el-tag2" closable  @close="open(scope.row,item2.id)">{{item2.authName}}</el-tag>
                          </el-col>
                        </el-row>
              </el-col>
            </el-row>
          </template>
      </el-table-column>
      <el-table-column  type="index"  label="#" :width="48">

      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        >
      </el-table-column>
      <el-table-column    label="操作"  >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" style="margin-left:15px"  @click="editBtn(scope.row.id)">编辑</el-button>
          <el-button type="warning" icon="el-icon-delete" size="mini" style="margin-left:15px"  @click="deleteRole(scope.row.id)">删除</el-button>
          <el-button type="danger" icon="el-icon-setting" size="mini" style="margin-left:15px"  @click="showRight(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" @close="cheanArray">
      <el-tree :data="rightList" :props="defaultProps"  show-checkbox   default-expand-all  :default-checked-keys="keyArray"  node-key="id" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRights()">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      roleList: [],
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogVisible: false,
      keyArray: [],
      data: '',
      dialogVisible1: false,
      dialogVisible2: false,
      id: '',
      role: {
        roleName: '',
        roleDesc: ''
      },
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getRoles () {
      const { data: res } = await this.$http.get('roles')
      console.log(res.data)
      this.roleList = res.data
    },
    async open (role, rightId) {
      console.log(role)
      var roleId = role.id
      const res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        const { data: res } = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
        if (res.meta.status === 200) {
          this.$message.success('删除权限成功！')
          role.children = res.data
        } else {
          this.$message.error('删除权限失败！')
        }
      } else {
        this.$message.info('取消成功！')
      }
    },
    async getRight () {
      const { data: res } = await this.$http.get('rights/tree')
      this.rightList = res.data
    },
    showRight (role) {
      this.data = role
      this.getRight()
      this.popTree(role)
      this.dialogVisible = true
    },
    popTree (role) {
      if (!role.children) {
        return this.keyArray.push(role.id)
      } else {
        role.children.forEach(element => {
          this.popTree(element)
        })
      }
    },
    cheanArray () {
      this.keyArray = []
    },
    async addRights () {
      const treeArray = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedNodes()]
      const str = treeArray.join(',')
      const { data: res } = await this.$http.post(`roles/${this.data.id}/rights`, {
        rids: str
      })
      this.dialogVisible = false
      if (res.meta.status === 200) {
        this.$message.success('分配权限成功')
        await this.getRoles()
      } else {
        this.$message.error('分配权限失败')
      }
    },
    async deleteRole (id) {
      const p = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (p === 'confirm') {
        const { data: res } = await this.$http.delete(`roles/${id}`)
        if (res.meta.status === 200) {
          await this.getRoles()
          this.$message.success('删除角色成功！')
        } else { this.$message.error('删除角色失败') }
      } else {
        this.$message.info('取消成功！')
      }
    },
    addRole () {
      this.dialogVisible1 = true
    },
    async  submitRole () {
      const { data: res } = await this.$http.post('roles', {
        roleName: this.role.roleName,
        roleDesc: this.role.roleDesc
      })
      if (res.meta.status === 201) {
        await this.getRoles()
        this.$message.success('添加角色成功！')
      } else { this.$message.error('添加角色失败！') }
      this.dialogVisible1 = false
    },
    async  editRole () {
      const { data: res } = await this.$http.put(`roles/${this.id}`, {
        roleName: this.role.roleName,
        roleDesc: this.role.roleDesc
      })
      if (res.meta.status === 200) {
        await this.getRoles()
        this.$message.success('编辑角色成功！')
      } else { this.$message.error('编辑角色失败！') }
      this.dialogVisible2 = false
    },
    editBtn (id) {
      this.id = id
      this.dialogVisible2 = true
    }

  }
}
</script>

<style scoped>
.header{
  margin-bottom:10px;
}
.el-tag2{
  margin-left:10px;
  margin-top:15px;
  margin-bottom:15px;
}
.bottom {
  border-bottom:1px solid #eee;
}
.top{
  border-top:1px  solid #eee;
}
.row  {
  display: flex;
  align-items: center;
}
</style>
