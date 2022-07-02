<template>
  <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="data.role"
    style="max-width: 800px"
  >
    <el-form-item label="用户组名称">
      <el-input v-model="data.role.name" />
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="data.role.sort" />
    </el-form-item>
    <el-form-item label="菜单与权限">
      <el-tree
        :data="data.permissions"
        :props="{ label: 'title' }"
        show-checkbox
        default-expand-all
        check-strictly
        check-on-click-node
        :expand-on-click-node="false"
        highlight-current
        node-key="id"
        ref="tree"
      />
    </el-form-item>
  </el-form>
  <div>
    <el-button @click="init">重置</el-button>
    <el-button type="primary" @click="update" :plain="true">确定修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { fetchRole, updateRole } from "@/api/roles";
import { useRoute } from "vue-router";
import { fetchPermissionList } from "@/api/permissions";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "RoleForm",
  setup() {
    const labelPosition = ref("right");

    interface Role {
      name: string;
      sort: number;
    }
    class IData {
      role: Role;
      permissions: Array<any>;
      myPermissions: Array<any>;
      constructor(
        role: Role = { name: "", sort: 0 },
        permissions: Array<any> = [],
        myPermissions: Array<any> = []
      ) {
        this.role = role;
        this.permissions = permissions;
        this.myPermissions = myPermissions;
      }
    }
    const data = reactive(new IData());
    //读出所有的权限列表，方便渲染
    async function getList() {
      const res = await fetchPermissionList();
      data.permissions = res.data.permissions;
    }
    let paramsID = useRoute().params.id;
    getList();
    //读出当前要编辑的角色信息
    const tree = ref<any>(null);
    async function init() {
      const res = await fetchRole(Number(paramsID));
      data.role = res.data.role;
      tree.value &&
        tree.value.setCheckedKeys(
          res.data.permissions.map((item: any) => item.id)
        );
      data.myPermissions = res.data.permissions;
    }
    init();
    async function update() {
      const res = await updateRole(Number(paramsID), {
        name: data.role.name,
        sort: data.role.sort,
        permissions: tree.value.getCheckedKeys(),
      });
      if (res.code === 20000) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    }
    return {
      update,
      tree,
      labelPosition,
      data,
      init,
    };
  },
});
</script>

<style scoped lang="scss"></style>
