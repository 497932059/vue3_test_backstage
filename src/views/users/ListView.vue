<template>
  <el-button type="primary">新增</el-button>
  <el-table :data="data.users" height="500" style="width: 100%">
    <el-table-column prop="id" label="编号" width="100" />
    <el-table-column prop="username" label="用户名" width="100" />
    <el-table-column prop="role.name" label="所属用户组" width="100" />
    <el-table-column label="创建日期">
      <template #default="scope">
        {{ setDay(scope.row.updatedAt) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <el-button>编辑</el-button>
      <el-popconfirm title="确定要删除吗？">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm></el-table-column
    >>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { fetchUserList } from "@/api/users";
import moment from "moment";
export default defineComponent({
  name: "UsersView",
  setup() {
    let data = reactive({
      users: [],
    });
    const setDay = computed(() => (date: string) => {
      moment.locale("zh-cn");
      return moment(date).format("LLL");
    });
    async function init(): Promise<void> {
      const res = await fetchUserList();
      data.users = res.data.users;
    }
    init();
    return {
      setDay,
      data,
    };
  },
});
</script>

<style scoped lang="scss">
.el-button--primary {
  background-color: rgb(31, 153, 176);
}
:deep(.cell) {
  text-align: center;
}
</style>
