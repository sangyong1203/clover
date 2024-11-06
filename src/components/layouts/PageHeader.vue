<template>
    <el-page-header class="page-header" :class="nav.length > 2 ? '' : 'hide-icon'" >
        <template #icon>
            <el-icon @click="navStore.backTo()"><ArrowLeft /></el-icon>
        </template>
        <template #title>
            <span class="back-text">{{ title ?? nav.at(-1).name }}</span>
        </template>
        <template #content>
            <span class="description">{{ description ?? nav[1]?.name + ' 페이지 입니다.' }}</span>
            <el-button v-show="navStore.data.isLoading"  style="margin-left: 10px" size="small" type="warning" loading >Loading......</el-button>
        </template>
        <template #extra>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="(item, key) in nav"
                    :key="key"
                    @click="onClick(key)"
                    :class="key === 0 ? 'first-link' : ''"
                    :to="{ path: getPath(key) }"
                    >{{ item.name }}</el-breadcrumb-item
                >
            </el-breadcrumb>
        </template>
    </el-page-header>
</template>
<script lang="ts" setup>
import { useNavStore } from '@/stores/nav/NavStore'
import { computed } from 'vue'

interface Props {
    title?: string
    description?: string
}
const { title, description } = defineProps<Props>()
const navStore = useNavStore()
const nav = computed(() => {
    return navStore.getNav() ?? []
})
function getPath(index: number) {
    if (index == 0) return ''
    return nav.value[index].path
}
function onClick(index: number) {
    let navArr = navStore.getNav() ?? []
    if (navArr.length > 2 && index > 0 && navArr.length - 1 !== index) {
        navArr.splice(index + 1)
    }
}
</script>
<style scoped>
.page-header {
    padding: 16px 32px;
    min-height: 60px;
    box-shadow: 0 0 4px 0px #dddddd;
    margin-bottom: 12px;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
}

.back-text {
    font-size: 22px;
    cursor: default;
}
.description{
    height: 24px;
    display: inline-block;
}
.first-link > :deep(.el-breadcrumb__inner) {
    cursor: not-allowed;
}
:deep(.el-page-header__left .el-divider--vertical) {
    margin: 0 12px !important;
}
:deep(.el-page-header__content) {
    font-size: 20px;
}
:deep(.el-page-header__header){
    line-height: unset;
    flex: 1;
}
:deep(.el-page-header__extra){
    padding-top: 2px;
}
.hide-icon :deep(.el-page-header__icon) {
    display: none;
}
.custom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 16px 20px 0px 20px; */
}

</style>
