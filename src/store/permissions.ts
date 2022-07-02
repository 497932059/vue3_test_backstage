import { defineStore } from "pinia";
import {
  createPermission,
  fetchPermission,
  updatePermission,
} from "@/api/permissions";
import { Permission } from "@/api/permissions";
import { ElMessage } from "element-plus";

interface State {
  form: Permission;
  isNew: boolean;
}
export default defineStore("permissions", {
  state: (): State => {
    return {
      form: {
        api: null,
        component: null,
        icon: null,
        method: null,
        title: "",
        id: 0,
        path: null,
        level: 0,
        parentId: 0,
        sort: 99,
      },
      isNew: false,
    };
  },
  actions: {
    async getPermission(id: number) {
      const res = await fetchPermission(id);
      this.isNew = false;
      this.form = {
        api: res.data.permission.api,
        component: res.data.permission.component,
        icon: res.data.permission.icon,
        method: res.data.permission.method,
        title: res.data.permission.title,
        id: res.data.permission.id,
        path: res.data.permission.path,
        level: res.data.permission.level,
        parentId: res.data.permission.parentId,
        sort: res.data.permission.sort,
      };
      console.log(this.form);
    },
    async edit() {
      const res = await updatePermission(this.form.id, {
        sort: this.form.sort,
        api: this.form.api,
        component: this.form.component,
        icon: this.form.icon,
        method: this.form.method,
        title: this.form.title,
        path: this.form.path,
        level: this.form.level,
        parentId: this.form.parentId,
      });
      ElMessage.success(res.message);
    },
    async create() {
      const res = await createPermission({
        sort: this.form.sort,
        api: this.form.api,
        component: this.form.component,
        method: this.form.method,
        title: this.form.title,
        path: this.form.path,
        level: this.form.level,
        parentId: this.form.parentId,
      });
      ElMessage.success(res.message);
    },
  },
});
