<template>
  <el-row class="text-center">
    <el-pagination
      background
      :hide-on-single-page="value"
      :total="totalPage"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-row>
</template>
<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      value: true,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('changePage', {
        currPage: val,
        limit: this.pageSize,
      });
    },
  },
};
</script>
