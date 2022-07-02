<template>
  <div class="content">
    <el-form label-width="100px" :model="form" style="max-width: 460px">
      <el-form-item label="上级菜单">
        <el-cascader
          :show-all-levels="false"
          :options="data.menus"
          v-model="form.parentId"
          :props="{
            label: 'title',
            value: 'id',
            expandTrigger: 'hover',
            checkStrictly: true,
            emitPath: false,
          }"
        />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="页面路径" v-show="form.path !== null || isNew">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item label="组件路径" v-show="form.component !== null || isNew">
        <el-input v-model="form.component" />
      </el-form-item>
      <el-form-item label="接口类型" v-show="form.method !== null || isNew">
        <el-select v-model="form.method" placeholder="请选择接口类型">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
          <el-option label="PATCH" value="PATCH" />
        </el-select>
      </el-form-item>
      <el-form-item label="接口路径" v-show="form.api !== null || isNew">
        <el-input v-model="form.api" />
      </el-form-item>
      <el-form-item label="字体图标" v-show="form.icon !== null">
        <el-input v-model="form.icon" />
      </el-form-item>
    </el-form>
    <el-button @click="reset" v-show="!isNew">重置</el-button>
    <el-button type="primary" @click="edit" v-show="!isNew">编辑</el-button>
    <el-button type="primary" @click="create" v-show="isNew">新建</el-button>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import permissions from "@/store/permissions";
import { storeToRefs } from "pinia";
import { fetchPermissionList } from "@/api/permissions";
export default defineComponent({
  name: "Edit",
  setup(props, context) {
    const data = reactive({
      menus: [],
    });
    async function getData() {
      const res = await fetchPermissionList();
      data.menus = [
        {
          title: "顶级菜单",
          id: 0,
          level: 0,
          children: res.data.menus,
        },
      ];
    }
    getData();
    console.log(data.menus);
    const store = permissions();
    let { form, isNew } = storeToRefs(store);
    const edit = async function () {
      await store.edit();
      await context.emit("getList");
    };
    const create = async function () {
      await store.create();
      await context.emit("getList");
      store.$reset();
    };
    const reset = function () {
      store.$reset();
    };
    return {
      form,
      edit,
      reset,
      data,
      isNew,
      create,
    };
  },
});
</script>

<style scoped>
.content {
  position: fixed;
  top: 100px;
}
</style>
