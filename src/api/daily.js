import http from "@/utils/request";

export default {
    /**
   * 查询日报列表
   * @param params
   * @returns
   */
  async getDailyList(params) {
    return await http.get("/daily/list", params);
  },
}