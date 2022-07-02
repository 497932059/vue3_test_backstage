<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :unique-opened="true"
      >
        <el-menu-item index="1" @click="$router.push('/')">
          <el-icon><PieChart /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Tickets /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">栏目管理</el-menu-item>
            <el-menu-item index="2-2">文章管理</el-menu-item>
            <el-menu-item index="2-3">留言管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><PictureRounded /></el-icon>
            <span>广告管理</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="$router.push(`/permissions`)"
              >菜单与权限</el-menu-item
            >
            <el-menu-item index="4-2" @click="$router.push('/roles')"
              >用户组</el-menu-item
            >
            <el-menu-item index="4-3" @click="$router.push('/users')"
              >用户</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  PieChart,
  Tickets,
  PictureRounded,
  Setting,
} from "@element-plus/icons-vue";
export default defineComponent({
  name: "Aside",
  components: {
    PieChart,
    Tickets,
    PictureRounded,
    Setting,
  },
});
</script>

<style scoped></style>
