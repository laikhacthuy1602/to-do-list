<template>
  <el-dialog
    title="Todo edit"
    :visible="isVisibledEdit"
  >
    <el-row>
      <h5 class="fz-2 mb-2">Title</h5>
      <el-form
        :model="toDoItemSelected.name" :rules="rules"
        ref="editTitleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="itemNew" class="item-input">
          <el-input v-model="toDoItemSelected.name" type="textarea" />
        </el-form-item>
      </el-form>
      <h5 class="fz-2 mb-2 mt-4">Todo</h5>
      <el-row
        class="mt-2"
        v-for="(item, index) in toDoItemSelected.items"
        :key="index"
      >
        <el-row
          type="flex"
          justify="space-between"
          v-if="isSelected !== index"
        >
          <span class="title">{{item.title}}</span>
          <el-row
            type="flex"
          >
            <i
              class="el-icon-check mr-1 fz-2 cursor-pointer"
              @click="handleShowEdit(index, item.title)"
            ></i>
            <i
              class="el-icon-close fz-2 cursor-pointer"
              @click="handleDeleteItem(item.id)"
            ></i>
          </el-row>
        </el-row>
        <el-row v-else>
          <el-form
            :model="ruleEditForm" :rules="rules"
            ref="editForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="itemNew" class="item-input">
              <el-input v-model="ruleEditForm.itemNew" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <el-row
            type="flex"
            justify="space-between"
            class="mt-4"
          >
            <el-row>
              <i
                class="el-icon-check mr-1 fz-2 cursor-pointer"
                @click="handleSaveItem('editForm', item.id)"
              ></i>
              <i
                class="el-icon-close fz-2 cursor-pointer"
                @click="handleHideEdit"
              ></i>
            </el-row>
            <span class="item-length">{{ruleEditForm.itemNew.length}}/500</span>
          </el-row>
        </el-row>
      </el-row>
      <!-- Add item -->
      <p class="add-item" @click="isAddItem = true" v-if="!isAddItem">Add item</p>
      <el-row v-else>
        <el-form
          :model="ruleAddForm" :rules="rules"
          ref="addForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="itemNew" class="item-input">
            <el-input v-model="ruleAddForm.itemNew" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-row
          type="flex"
          justify="space-between"
          class="mt-4"
        >
          <el-row>
            <i
              class="el-icon-check mr-1 fz-2 cursor-pointer"
              @click="handleAddItem('addForm')"
            ></i>
            <i
              class="el-icon-close fz-2 cursor-pointer"
              @click="handleHideAdd"
            ></i>
          </el-row>
          <span class="item-length">{{ruleAddForm.itemNew.length}}/500</span>
        </el-row>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeEdit')">Cancel</el-button>
      <el-button
        type="success"
        @click="handleEditTitle('editTitleForm')"
      >
        Save
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isVisibledEdit: {
      type: Boolean,
      default: false,
    },
    toDoItemSelected: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isSelected: '',
      isAddItem: false,
      ruleEditForm: {
        itemNew: '',
      },
      ruleAddForm: {
        itemNew: '',
      },
      rules: {
        itemNew: [
          { required: true, message: 'Please input item', trigger: 'blur' },
          {
            min: 1, max: 500, message: 'Length should be 1 to 500', trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleShowEdit(index, item) {
      this.isSelected = index;
      this.ruleEditForm.itemNew = item;
    },
    handleHideEdit() {
      this.isSelected = '';
    },
    handleSaveItem(formSubmit, id) {
      this.$refs[formSubmit][0].validate((valid) => {
        if (!valid) return;
        const index = this.toDoItemSelected.items.findIndex((e) => e.id === id);
        this.toDoItemSelected.items[index].title = this.ruleEditForm.itemNew;
        this.isSelected = '';
      });
    },
    handleDeleteItem(id) {
      const index = this.toDoItemSelected.items.findIndex((e) => e.id === id);
      if (index !== -1) this.toDoItemSelected.items.splice(index, 1);
    },
    handleAddItem(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (!valid) return;
        const data = {
          id: this.toDoItemSelected.items.length + 1,
          title: this.ruleAddForm.itemNew,
          checked: false,
        };
        this.toDoItemSelected.items.push(data);
        this.ruleAddForm.itemNew = '';
        this.isAddItem = false;
      });
    },
    handleHideAdd() {
      this.ruleAddForm.itemNew = '';
      this.isAddItem = false;
    },
    handleEditTitle(formEditTitle) {
      this.$refs[formEditTitle].validate((valid) => {
        if (!valid) return;
        // this.toDoItemSelected.name = this.toDoItemSelected.name;
        console.log(123);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .title {
    text-align: left;
  }
  .item-input {
    margin-bottom: 0;
  }
  .item-length {
    margin-left: auto;
  }
  .add-item {
    margin-top: 15px;
    font-weight: 500;
    color: rgb(82, 82, 230);
    cursor: pointer;
  }
</style>
