<template>
  <div>
    <div class="header">
      <div class="header__content">
        <img :src="require('@/assets/image/logo.png')" alt="avatar" class="avatar">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{email}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row class="main-content w-50 p-2">
      <el-row class="mb-1" type="flex" justify="space-between" align="middle">
        <h2>Todo list</h2>
        <el-row type="flex">
          <el-input
            class="mr-1 mb-2"
            placeholder="search text"
            v-model="searchText"
          />
          <el-button
            class=""
            type="success"
            @click="handleAddNew"
          >
            Add new
          </el-button>
        </el-row>
      </el-row>

      <!-- Add new form -->
      <el-row
        v-if="isAddNewForm"
        type="flex" justify="space-between" align="middle"
      >
        <el-form
          class="w-100"
          :model="formAddNew" :rules="rules" ref="addNewForm"
        >
          <el-form-item prop="name">
            <el-input
              v-model="formAddNew.name"
              placeholder="Todo Title"
            />
          </el-form-item>
        </el-form>

        <el-row type="flex" align="middle">
          <i class="el-icon-check mr-1 fz-2 cursor-pointer"
            @click="handleConfirmAddNew('addNewForm')"
          ></i>
          <i class="el-icon-close fz-2 cursor-pointer" @click="handleHideAddNew"></i>
        </el-row>
      </el-row>

      <el-row
        type="flex"
        class="p-2 border-1"
        :class="index !== filterToDo.length-1 ? 'border-bottom__none': ''"
        justify="space-between" align="middle"
        v-for="(item, index) in filterToDo"
        :key="index"
      >
        <h3 class="cursor-pointer" @click="handleDetailDialog(item)">
          {{ item.name}}
        </h3>
        <el-row type="flex">
          <i class="el-icon-edit-outline mr-1 fz-2 cursor-pointer"
          @click="handleShowEdit(item)"></i>
          <i
            class="el-icon-delete fz-2 cursor-pointer"
            @click="handleDeleteItem(item)"
          ></i>
        </el-row>
      </el-row>
      <Pagination
        class="mt-3"
        :currentPage="currentPage"
        :totalPage="totalPage"
        @changePage="handelChangePage"
      />
    </el-row>
    <!-- Dialog -->
    <ShowTodoDetailDialog
      :isVisibled="isVisibleDetail"
      :toDoSelected="toDoSelected"
      @close="handleClose"
    />
    <EditTodoDetailDialog
      :isVisibledEdit="isVisibleEdit"
      :toDoItemSelected="toDoSelected"
      @closeEdit="isVisibleEdit=false"
    />
  </div>
</template>

<script>
import ShowTodoDetailDialog from './components/ShowTodoDetail.vue';
import EditTodoDetailDialog from './components/EditTodoDetail.vue';
import Pagination from '../../components/Pagination.vue';
import API from '../../axios/auth/auth';

export default {
  components: {
    EditTodoDetailDialog,
    ShowTodoDetailDialog,
    Pagination,
  },
  data() {
    return {
      searchText: '',
      currentPage: 1,
      pageSize: 5,
      isVisibleDetail: false,
      isVisibleEdit: false,
      isAddNewForm: false,
      toDoSelected: {},
      formAddNew: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input title', trigger: 'blur' },
          {
            min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur',
          },
        ],
      },
      toDoList: [
        {
          name: 'item',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'title',
          items: [
            {
              id: 1,
              title: 'item 1',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'test 2',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'test 3',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'test 4',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'aaaaaaa',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'bbbbbbbb',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'cccccccccc',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'i am',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'hello',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'rrrrrrrrr',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
        {
          name: 'test 2',
          items: [
            {
              id: 1,
              title: 'item',
              checked: false,
            },
            {
              id: 2,
              title: 'item 2',
              checked: false,
            },
            {
              id: 3,
              title: 'item 3',
              checked: false,
            },
          ],
        },
      ],
    };
  },
  computed: {
    filterToDo() {
      const filterList = this.toDoList.filter((e) => e.name.match(this.searchText));
      return filterList.slice(
        this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage,
      );
    },
    totalPage() {
      const filterList = this.toDoList.filter((e) => e.name.match(this.searchText));
      return filterList.length;
    },
    email() {
      return this.$store.state.dataLogin.email;
    },
  },
  async created() {
    try {
      const res = await API.getUser('/test');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    handleDetailDialog(item) {
      this.toDoSelected = item;
      this.isVisibleDetail = true;
    },
    handleClose() {
      this.isVisibleDetail = false;
    },
    handleAddNew() {
      this.isAddNewForm = !this.isAddNewForm;
    },
    handleConfirmAddNew(addForm) {
      console.log(this.$refs[addForm].validate);
      this.$refs[addForm].validate((valid) => {
        if (!valid) return;
        const data = {
          name: this.formAddNew.name,
          items: [],
        };
        this.toDoList.push(data);
        this.formAddNew.name = '';
      });
    },
    handleHideAddNew() {
      this.isAddNewForm = false;
    },
    handleShowEdit(item) {
      this.toDoSelected = item;
      this.isVisibleEdit = true;
    },
    handelChangePage(data) {
      this.currentPage = data.currPage;
      this.pageSize = data.limit;
    },
    handleDeleteItem(item) {
      const index = this.toDoList.findIndex((e) => e.name === item.name);
      if (index !== -1) this.toDoList.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.header{
  background-color: rgb(226, 224, 94);
  height: 4rem;
}
.header__content {
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: end;
  align-items: center;
}
.main-content{
  background-color: #fff !important;
  margin: 0 auto;
  width: 1024px;
}
.avatar {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
