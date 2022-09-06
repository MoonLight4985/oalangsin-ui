import http from "@/utils/request";

export default {
    /**
   * 查询周报列表
   * @param params
   * @returns
   */
  async getWeeklyList(params) {
    return await http.get("/weekly/list", params);
  },
}