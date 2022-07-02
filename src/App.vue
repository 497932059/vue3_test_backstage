<template>
  <div class="common-layout">
    <el-container>
      <el-header height="60px">
        <router-link to="/">
          <img src="https://images.clwy.cn/common/logo.png" alt="" />
        </router-link>
      </el-header>
      <el-container>
        <el-aside width="200px"><Aside /></el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer height="60px"><h1>2022.6.29</h1></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Aside from "@/components/app/Aside.vue";
export default defineComponent({
  components: {
    Aside,
  },
});
</script>

<style lang="scss" scoped>
.common-layout {
  min-width: 1600px;
}
.main {
  padding: 20px;
  min-width: 1200px;
  min-height: 550px;
}
.el-header,
.el-footer {
  background-color: rgb(225, 240, 240);
  img {
    margin-top: 10px;
    height: 40px;
  }
}
.el-footer {
  text-align: center;
  line-height: 60px;
}
.el-aside {
  border-right: solid 1px rgb(230, 230, 230);
}
* {
  margin: 0;
}
.el-container {
  height: calc(100vh - 60px);
}
</style>
