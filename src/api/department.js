import http from '@/utils/request';
export default {
    /**
    * 查询部门列表
    * @param param
    * @returns
    */
    async getDepartmentList(param) {
        return await http.get("/department/list", param);
    },

    async getParentTreeList() {
        return await http.get("/department/parent/list");
    },
    /**
    * 添加部门
    * @returns
    */
    async addDept(params) {
        return await http.post("/department/add", params);
    },
    /**
    * 修改部门
    * @returns
    */
    async updateDept(params) {
        return await http.put("/department/update", params);
    },
    /**
    * 检查部门下是否存在子部门
    */
    async checkDepartment(params) {
        return await http.getRestApi("/department/check", params);
    },
    /**
    * 删除部门
    * @returns
    */
    async deleteById(params) {
        return await http.delete("/department/delete", params);
    }

}
