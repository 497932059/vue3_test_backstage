<template>
  <RoleForm></RoleForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoleForm from "@/views/roles/components/RoleForm.vue";
export default defineComponent({
  name: "EditView",
  components: {
    RoleForm,
  },
});
</script>

<style scoped></style>
