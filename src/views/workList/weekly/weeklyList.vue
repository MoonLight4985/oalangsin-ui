<template>
  <el-container>
    <el-main>
      <!-- 查询条件 -->
      <el-form
        :model="searchModel"
        ref="searchForm"
        label-width="80px"
        :inline="true"
        size="small"
      >
        <el-form-item>
          <el-input v-model="searchModel.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="search(deptId, pageNo, pageSize)"
            >查询</el-button
          >
          <el-button icon="el-icon-delete" @click="resetValue()"
            >重置</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="small"
            type="success"
            @click="openAddWindow()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 用户表格数据 -->
      <el-table
        :height="tableHeight"
        :data="dailyList"
        border
        stripe
        style="width: 100%; margin-bottom: 10px"
      >
        <el-table-column prop="username" label="汇报人"></el-table-column>
        <!-- <el-table-column prop="realName" label="姓名"></el-table-column> -->
        <el-table-column prop="weeklyTitle" label="周报标题"></el-table-column>
        <!-- <el-table-column prop="phone" label="电话"></el-table-column> -->
        <el-table-column prop="weeklyContent" label="正文"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="startTime" label="起始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column align="center" width="290" label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              icon="el-icon-close"
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"

              >删除
<!-- v-if="hasPermission('work:daily:delete')" -->
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页工具栏 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import WeeklyApi from "@/api/weekly";

export default {
  name: "dailyList",
  data() {
    return {
      searchModel: {
        weeklyId: "",
        username: "",
        weeklyTitle: "",
        weeklyContent: "",
        startTime: "",
        endTime: "",
        createTime: "",
        pageNo: 1,
        pageSize: 10,
      },
      weeklyList: [],
      total: 0, //总数量
    };
  },
  methods: {
    async getWeekly(pageNo = 1, pageSize = 10) {
      this.searchModel.pageNo = pageNo; //当前页码
      this.searchModel.pageSize = pageSize; //每页显示数量
      //发送查询请求
      let res = await WeeklyApi.getWeeklyList(this.searchModel);
      //执行成功
      if (res.success) {
        //角色列表
        this.dailyList = res.data.records;
        //总数量
        this.total = res.data.total;
      }
    },
  },
  created() {
    this.getWeekly();
  },
};
</script>
