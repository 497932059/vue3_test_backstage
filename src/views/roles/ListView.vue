<template>
  <el-button type="primary">新增</el-button>
  <el-table height="500" style="width: 100%" :data="data.roles">
    <el-table-column prop="id" label="编号" width="100" />
    <el-table-column prop="name" label="名称" width="120" />
    <el-table-column prop="sort" label="排序" width="100" />
    <el-table-column label="创建日期">
      <template #default="scope">
        {{ setDay(scope.row.updatedAt) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          :disabled="scope.row.id === 1"
          @click="$router.push(`/roles_edit/${scope.row.id}`)"
          >编辑</el-button
        >
        <el-popconfirm title="确定要删除吗？">
          <template #reference>
            <el-button type="danger" :disabled="scope.row.id === 1"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { fetchRoleList } from "@/api/roles";
import moment from "moment";
export default defineComponent({
  name: "UsersView",
  setup() {
    let data = reactive({
      roles: [],
    });
    async function init(): Promise<void> {
      const res = await fetchRoleList();
      data.roles = res.data.roles;
    }
    init();
    const setDay = computed(() => (date: string) => {
      moment.locale("zh-cn");
      return moment(date).format("LLL");
    });
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
