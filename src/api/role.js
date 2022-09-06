import http from "@/utils/request";
export default {
  /**
   * 查询角色列表
   * @returns
   */
  async getRoleListApi(params) {
    return await http.get("/role/list", params);
  },
  async addRoleApi(params) {
    return await http.post("/role/add", params);
  },
  /**
   * 编辑角色
   * @returns
   */
  async updateRoleApi(params) {
    return await http.put("/role/update", params);
  },
  async checkRoleApi(params) {
    return await http.getRestApi("/role/check", params);
  },
  async deleteRoleApi(params) {
    return await http.delete("/role/delete", params);
  },
  /**
   * 查询分配权限树列表
   * @returns
   */
  async getAssignTreeApi(params) {
    return await http.get("/role/getAssignPermissionTree", params);
  },
  /**
   * 分配权限
   * @returns
   */
  async assignSaveApi(params) {
    return await http.post("/role/saveRoleAssign", params);
  },
};
