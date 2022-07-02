<template>
  <el-row>
    <el-col :span="12">
      <el-tree
        :data="data.permissions"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="{ label: 'title' }"
        draggable
        :allow-drop="allowDrop"
        @node-drop="nodeDrop"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <a
                :style="{
                  color: '#67C23A',
                }"
                v-if="data.level !== 3"
                @click="
                  store.$reset();
                  isNew = true;
                  form.parentId = data.id;
                  form.level = data.level + 1;
                "
              >
                新建
              </a>
              <a
                class="edit"
                style="margin-left: 8px"
                @click="getPermission(data.id)"
              >
                编辑
              </a>
              <a
                style="margin-left: 8px"
                @click="remove(node, data)"
                class="delete"
              >
                删除
              </a>
            </span>
          </span>
        </template>
      </el-tree>
    </el-col>
    <el-col :span="11" :offset="1"
      ><div class="grid-content ep-bg-purple-light" />
      <Edit v-on:getList="getList"></Edit>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { fetchPermissionList } from "@/api/permissions";
import {
  changePermissionSort,
  SortData,
  deletePermission,
} from "@/api/permissions";
import { ElMessage } from "element-plus";
import permissions from "@/store/permissions";
import Edit from "@/views/permissions/components/Edit.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ListView",
  components: {
    Edit,
  },
  setup() {
    const store = permissions();
    const getPermission = store.getPermission;
    let { isNew, form } = storeToRefs(store);
    class IData {
      permissions: Array<any>;
      constructor(permissions: Array<any> = []) {
        this.permissions = permissions;
      }
    }
    const data = reactive(new IData());
    //读出所有的权限列表，方便渲染
    async function getList() {
      const res = await fetchPermissionList();
      data.permissions = res.data.permissions;
    }

    getList();
    interface Tree {
      id: number;
      label: string;
      children?: Tree[];
    }
    const remove = async (node: Node, data: Tree) => {
      const res = await deletePermission(data.id);
      ElMessage.success(res.message);
      await getList();
    };
    function allowDrop(draggingNode: any, dropNode: any, type: any) {
      // 禁止不同层级的节点拖拽
      if (draggingNode.level !== dropNode.level) {
        return false;
      }

      // 禁止不同父级菜单的节点拖拽
      if (draggingNode.data.parentId !== dropNode.data.parentId) {
        return false;
      }

      // 禁止拖拽到内层
      return type !== "inner";
    }
    //循环获取[{id,sort}]的数组，发送给服务器修改排序
    interface getSortData {
      id: number;
      sort: number;
      children?: Array<getSortData>;
    }
    interface children {
      children: Array<getSortData>;
    }
    function getSort(data: Array<getSortData>): Array<SortData> {
      let sorts: Array<SortData> = [];

      for (let i = 0; i < data.length; i++) {
        sorts = [...sorts, { id: data[i].id, sort: i + 1 }];
        if (data[i].children) {
          let value = getSort((data[i] as children).children);
          sorts = [...sorts, ...value];
        }
      }
      return sorts;
    }
    async function nodeDrop() {
      const sorts = getSort(data.permissions);
      const res = await changePermissionSort({ sorts });
      ElMessage({
        message: res.message,
        type: "success",
      });
    }
    return {
      data,
      remove,
      allowDrop,
      nodeDrop,
      getPermission,
      getList,
      isNew,
      form,
      store,
    };
  },
});
</script>

<style scoped lang="scss">
.custom-tree-node {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.edit {
  color: rgb(72, 162, 255);
}
.delete {
  color: red;
}
</style>
