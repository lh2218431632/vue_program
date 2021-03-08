import Vue from 'vue'
import {
  Button,
  Form,
  Input,
  FormItem,
  Message,
  Container,
  Main,
  Aside,
  Header,
  Col,
  Menu,
  Submenu,
  Row,
  MenuItemGroup,
  MenuItem,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Tag,
  MessageBox
} from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Header)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
