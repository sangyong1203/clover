<template>
    <div class="menu-bar" :class="collapse?'collapse':'not-collapse' ">
        <div class="menu-header">
                <el-switch class="switcher"  size="small" v-model="collapse" />
                <UserInfo :collapse="collapse"/>
            </div>
        <el-menu
            :default-active="navStore.getRoute()"
            mode="vertical"
            class="left-menu"
            :collapse="collapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
            @select="handleSelect"
        >   
           
            <template v-for="(item, idx) in state.menu" :key="idx">
                <template v-if="item.useYn==='Y'">
                    <el-menu-item v-if="item.children.length === 0" :index="item.path || item.id.toString()" >
                        <el-icon> <component :is="item.icon"></component> </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
    
                    <el-sub-menu v-else :index="item.path || item.id.toString()">
                        <template #title>
                            <el-icon> <component :is="item.icon"></component> </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <!-- 2단 -->
                        <template v-for="(child, idx2) in item.children" :key="idx2" >
                            <template v-if="child.useYn==='Y'">
                                <el-menu-item v-if="child.children.length === 0" :index="child.path || child.id.toString()">
                                    <template #title ><span>{{ child.title }}</span></template>
                                </el-menu-item>
                                <el-sub-menu v-else :index="child.path || child.id.toString()">
                                    <template #title> {{ child.title }} </template>
                                    <!-- 3단 -->
                                    <template v-for="(grandChild, idx3) in child.children" :key="idx3">
                                        <el-menu-item :index="grandChild.path || grandChild.id.toString()" v-if="grandChild.useYn==='Y'">
                                            {{ grandChild.title }}
                                        </el-menu-item>
                                    </template>
                                    <!-- 3단 -->
                                </el-sub-menu>
                            </template>

                        </template>
                        <!-- 2단 // -->
                    </el-sub-menu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { menuStore } from '@/stores/menu/MenuStore'
import { useNavStore } from '@/stores/nav/NavStore'
import { UserInfo } from '@/components'
import { useUserStore } from '@/stores/user/UserStore'


const collapse = ref(false)

const navStore = useNavStore()
// Url 진입시 메뉴 활성화
const state: any = reactive({
    menu: computed(() => menuStore().getMenu()),
})

const handleSelect = (path: string, pathArr: string[]) => {
    console.log(path, pathArr)
    navStore.setNav(searchRecursive(menuStore().getMenu(), path))
    navStore.setRoute(path)
    navStore.setAuthAction(menuStore().getMenu(), path)
}

// 라우터 path를 기준으로 메뉴를 찾아서 메뉴명(풀경로) 반환
const searchRecursive = (items: any, path: string) => {
    const nav: Array<{name:string, path:string}> = []
    items.forEach((item: any) => {
        if (item.path === path) {
            nav.push({name:item.title, path:item.path})
        } else if (item.children) {
            const ids = searchRecursive(item.children, path)
            if (ids.length) nav.push({name:item.title, path:item.path})
            ids.forEach((itemA) => nav.push({name:itemA.name, path:itemA.path}))
        }
    })
    return nav
}


</script>

<style scoped>
/* 메뉴 */
.menu-bar{
  height: 100%;
  overflow: scroll;
  margin-right: -5px;
}
.collapse{
    animation-duration: 0.5s;
    animation-name: collapse;
    width: 60px;
}
.not-collapse{
    animation-duration: 0.5s;
    animation-name: notCollapse;
    width: 260px;
}
@keyframes collapse {
    from {
        width: 260px;
    }
    to {
        width: 60px;
    }
}
@keyframes notCollapse {
    from {
    width: 60px;
  }
  to {
    width: 260px;
  }
}

.left-menu {
    height: 100%;
    overflow: scroll;
    padding-top: 12px;
    width: 100%;
}
.left-menu:not(.el-menu--collapse) {
    border: 1px solid var(--base-color--black);
}
.left-menu .el-sub-menu__title {
    font-weight: 700;
}
.left-menu .el-menu-item.is-active {
    font-weight: 700;
    color: var(--memu-activate-color) !important;
}
.left-menu .el-button.is-text {
    padding: 0;
    height: 40px;
    border: none;
    /* background-color: transparent; */
}
.left-menu .menu-depth1,
.menu-depth1 .el-sub-menu__title {
    padding-left: 5px;
}
.left-menu .menu-depth1,
.menu-depth1 .el-sub-menu__title:hover{
  --el-menu-hover-bg-color:var(--menu-hover-sub-bg-color);
}

:deep(.el-sub-menu__title){
    font-size: 16px !important;
    color: #ffffff;
}
.second-menu{
    background-color: var(--menu-sub-bg-color);
}

.el-menu.el-menu--collapse {
    width: 102%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-menu::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: transparent;
}
.el-menu::-webkit-scrollbar-thumb {
border-radius: 6px;
background-color: transparent;
}
.el-menu:hover::-webkit-scrollbar-thumb {
background-color: rgba(0, 0, 0, 0.262);
}

.menu-header{
    /* border-bottom: 3px solid; 
    border-image: linear-gradient(to right, #000000, #111111, #ea002c, #111111, #000000) 1; */
    border-bottom:1px solid #2e2e2e;
    color:#dddddd;
    display:flex;
    flex-direction: column;
    overflow: hidden;
    padding: 12px;
    background-color: var(--menu-bg-color);
    width: 100%;
}

.switcher{
    --el-switch-on-color: var(--base-color--gray) ; 
    --el-switch-off-color: var(--base-color--gray)!important; 
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.fade-in {
  animation-duration: 0.3s;
  animation-name: fadeIn;
  opacity: 1;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-out {
  animation-duration: 0.3s;
  animation-name: fadeOut;
  opacity: 0;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
