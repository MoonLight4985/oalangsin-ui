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
        <el-table-column prop="dailyTitle" label="日报标题"></el-table-column>
        <!-- <el-table-column prop="phone" label="电话"></el-table-column> -->
        <el-table-column prop="dailyContent" label="正文"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="agencyTime" label="事务时间"></el-table-column>
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
        @size-change="assignSizeChange"
        @current-change="assignCurrentChange"
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
import dailyApi from "@/api/daily";
//导入用户api脚本
import userApi from "@/api/user";
//导入token
import { getToken } from "@/utils/auth";

export default {
  name: "dailyList",
  data() {
    return {
        dailyVo: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      searchModel: {
        dailyId: "",
        username: "",
        agencyTime: "",
        dailyTitle: "",
        dailyContent: "",
        createTime: "",
        pageNo: 1,
        pageSize: 10,
      },
      dailyList: [],
      total: 0, //总数量
      tableHeight: 600, //表格高度
      pageNo: 1, //当前页码
      pageSize: 10, //每页显示数量
    };
  },
  methods: {
    async getDaily(pageNo = 1, pageSize = 10) {
      this.searchModel.pageNo = pageNo; //当前页码
      this.searchModel.pageSize = pageSize; //每页显示数量
      //发送查询请求
      let res = await dailyApi.getDailyList(this.searchModel);
      //执行成功
      if (res.success) {
        //角色列表
        this.dailyList = res.data.records;
        //总数量
        this.total = res.data.total;
      }
    },
    
    async getAssignDailyList(pageNo = 1, pageSize = 10) {
      //给用户ID赋值
    //   this.dailyVo.userId = this.$store.getters.userId;
      this.dailyVo.pageNo = pageNo;
      this.dailyVo.pageSize = pageSize;
      //发送查询请求
      let res = await userApi.getAssignRoleList(this.dailyVo);
      //判断是否成功
      if (res.success) {
        //角色列表赋值
        this.assignRoleList = res.data.records;
        //角色总数量赋值
        this.dailyVo.total = res.data.total;
      }
    },
    /**
     * 当每页数量发生变化时触发该事件
     */
    assignSizeChange(size) {
      this.dailyVo.pageSize = size; //将每页显示的数量交给成员变量
      this.getAssignDailyList(this.dailyVo.pageNo, size);
    },
    /**
     * 当页码发生变化时触发该事件
     */
    assignCurrentChange(page) {
      this.dailyVo.pageNo = page;
      //调用查询方法
      this.getAssignDailyList(page, this.dailyVo.pageSize);
    },
  },
  created() {
    this.getDaily();
  },
};
</script>
