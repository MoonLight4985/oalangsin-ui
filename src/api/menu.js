import http from '@/utils/request';
export default {
    /**
    * 查询权限菜单列表
    * @param params
    */
    async getMenuList(params) {
        return await http.get("/permission/list", params);
    },
    /**
    * 获取上级菜单
    * @returns
    */
    async getParentMenuList(params) {
        return await http.get("/permission/parent/list", params)
    },
    /**
    * 添加菜单
    * @returns
    */
    async addMenu(params) {
        return await http.post("/permission/add", params)
    },
    /**
    * 修改菜单
    * @returns
    */
    async updateMenu(params) {
        return await http.put("/permission/update", params)
    },
    /**
* 检查菜单下是否存在子菜单
*/
    async checkPermission(param) {
        return await http.getRestApi("/permission/check", param);
    },
    /*
    * 删除菜单
    * @returns
    */
    async deleteById(params) {
        return await http.delete("/permission/delete", params);
    }

}
