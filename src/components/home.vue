<template>
  <el-container class="father">
    <el-header class="el-header">
      <img src="../assets/img/touxiang.jpg" alt="">
      <p>电商后台管理系统</p>
      <el-button type="info" @click="signOut" class="btn">退出</el-button>
    </el-header>
    <el-container class="father1" >
      <el-aside class="aside"  :width="isFlag ? '64px':'200px'" >
        <div  class="top_div" @click="change">|||</div>
        <el-menu
          :default-active="indexPath"
          class="el-menu"
          :collapse-transition="false"
          :collapse="isFlag"
          unique-opened
          :router="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#40b9ff">
          <el-submenu :index="item.id+''" v-for="item in menu_list" :key="item.id">
            <template slot="title">
              <i :class="fonts[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+son_item.path" v-for="son_item in  item.children" :key="son_item.id"  @click="saveSession(son_item.path)">
              <template slot="title">
                <i class="iconfont  icon-shangpinfenlei1"></i>
                <span>{{son_item.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main  class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      menu_list: [],
      fonts: {
        125: 'iconfont icon-Management',
        103: 'iconfont icon-quanxianguanli',
        101: 'iconfont icon-shangpinguanli',
        102: 'iconfont icon-dingdanguanli',
        145: 'iconfont icon-shujutongji'
      },
      isFlag: false,
      indexPath: '',
      heightBox: ''
    }
  },
  // 获取列表菜单数据，dom树一被创建，就发起请求
  created () {
    this.getList()
    this.indexPath = window.sessionStorage.getItem('path')
  },
  methods: {
    signOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {} else {
        this.menu_list = res.data
      }
    },
    change () {
      this.isFlag = !this.isFlag
    },
    saveSession (value) {
      const s = '/' + value
      window.sessionStorage.setItem('path', s)
      this.indexPath = s
    }
  },
  show () {

  }
}
</script>

<style scoped>

.el-header {
  position: relative;
  width: 100%;
  heigth: 60px;
  background-color: #373d41;
  color: #333;
  line-height: 60px;

}

.el-header .btn {
  position: absolute;
  top: 11px;
  right: 0px;
}

.el-header img {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.el-header p {
  position: absolute;
  top: -22px;
  left: 92px;
  font-weight: bold;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  color: #eee;
}
.aside{
  background-color: #333744;
}

.father  i{
  font-size:18px;
}
.father span {
  margin-left:10px;
}
.top_div  {
  background-color: #4a5064;
  color: #fff;
  /*字体大小为12px*/
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  /*光标的样式*/
  cursor: pointer;
  /*字符间的距离*/
  letter-spacing: .12em;
}
.el-menu  {
  border-right:none;
}
</style>
