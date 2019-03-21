<template>
  <a-layout id="homepage">
    <a-layout-sider class="homepage-layout-sider">
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="default_active">
        <a-menu-item key="1" @click="clickIndex">
          <a-icon type="pie-chart"/>
          <span>homepage</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="setting"/>
            <span>Data Visualization</span>
          </span>
          <a-menu-item v-for="item in sub1_list" :key="item.key" @click="click(item)">{{item.name}}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="setting"/>
            <span>other</span>
          </span>
          <a-menu-item v-for="item in sub2_list" :key="item.key" @click="click(item)">{{item.name}}</a-menu-item>
        </a-sub-menu>
        <!-- <a-menu-item v-for="item in menu_list" :key="item.key" @click="click(item)">
          <a-icon :type="item.icon"/>
          <span class="nav-text">{{item.name}}</span>
        </a-menu-item>-->
      </a-menu>
    </a-layout-sider>
    <a-layout class="right-content">
      <a-layout-header :style="{ background: '#fff', padding: 0 }"/>
      <a-layout-content class="homepage-layout-content">
        <NuxtChild/>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">LW@2019 by liuwei</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      sub1_list: [
        {
          name: "GO JS",
          icon: "user",
          key: "1-1",
          path: "/gojs"
        },
        {
          name: "D3 JS",
          icon: "user",
          key: "1-2",
          path: "/d3js"
        }
      ],
      sub2_list: [
        {
          name: "Nuxt JS",
          icon: "user",
          key: "2-1",
          path: "/nuxtjs"
        },
        {
          name: "Webpack",
          icon: "user",
          key: "2-2",
          path: "/webpack"
        },
        {
          name: "Koa 2",
          icon: "user",
          key: "2-3",
          path: "/koa2"
        }
      ],
      default_active: ["1"]
    };
  },
  created() {
    let path = this.$route.path;
    this.defaultActive(this.sub1_list, this.sub2_list, path);
  },
  mounted() {},
  methods: {
    // 点击左侧导航菜单控制路由
    click(item) {
      console.log(item);
      this.$router.push({
        path: item.path
      });
    },
    // clickIndex
    clickIndex() {
      this.$router.push({
        path: "/"
      });
    },
    //根据当前路由控制左侧导航栏默认选中
    defaultActive(list1,list2, path) {
      let list = list1.concat(list2)
      console.log(list)
      for (let item of list) {
        if (item.path == path) {
          this.default_active[0] = item.key;
          console.log(item.key)
        }
      }
    }
  }
};
</script>

<style>
#homepage .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.homepage-layout-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
}
.right-content {
  margin-left: 200px;
  min-height: 100vh;
}
.homepage-layout-content {
  margin: 24px 16px 0;
  overflow: initial;
  background-color: #fff;
  padding: 8px;
}
</style>