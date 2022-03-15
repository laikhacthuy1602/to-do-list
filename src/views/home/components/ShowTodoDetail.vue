<template>
  <el-dialog
    title="Todo detail"
    :visible="isVisibled"
  >
    <div
      class="content"
      v-for="(item, index) in toDoSelected.items"
      :key="index"
    >
      <el-checkbox v-model="item.checked">
        {{ item.title }}
      </el-checkbox>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isVisibled: {
      type: Boolean,
      default: false,
    },
    toDoSelected: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>
<style lang="">

</style>
