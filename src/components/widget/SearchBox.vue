<template>
    <div class="search-box" @keyup.enter="onSearch()">
        <el-row>
            <el-col :span="22" style="display: flex; flex-direction: column; gap: 8px">
                <el-row class="upper-row">
                    <slot></slot>
                </el-row>
            </el-col>
            <el-col :span="2" class="text-right">
                <el-button type="primary" icon="search" class="GET" @click="onSearch()">검색</el-button>
            </el-col>
        </el-row>
    </div>
    <el-row class="extra-row" v-show="extra">
        <slot name="extra"> </slot>
    </el-row>
</template>

<script lang="ts" setup>
interface Props {
    extra?: boolean
    onSearch: (params?: any) => void
}
const { onSearch } = defineProps<Props>()
</script>

<style scoped>
/* 검색 박스 */
.search-box {
    margin-bottom: 2px;
    border-radius: 2px;
    padding: 16px;
    background-color: var(--base-color--gray_light);
    /* border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7; */
}
.upper-row {
    margin: 0px;
    gap: 8px 24px;
    display: flex;
    flex-wrap: nowrap;
    /* justify-content: space-between; */
}
.left {
    display: flex;
    gap: 16px;
}
.extra-row {
    margin-bottom: 8px;
    gap: 8px 24px;
    padding: 12px;
    border-bottom: 2px solid #e7e7e7;
}
.search-box .collaps {
    height: 32px;
    overflow: hidden;
}
.search-box .el-row .open {
    height: 100%;
}
.search-box .el-form-item--small.el-form-item {
    margin-bottom: 0px;
}
.search-box .search-btn {
    display: flex;
    justify-content: flex-end;
}
.search-box .el-button {
    height: 34px;
}
.search-box .el-form-item {
    margin-bottom: 2px;
}
.search-box .el-range-editor.el-input__wrapper {
    padding: 0px 0px 0px 5px;
}
.search-box .el-input-group__prepend {
    background-color: #edeefc;
    border: none;
    padding: 0 10px;
    box-shadow: none;
}
.search-box .text-right {
    display: flex;
    justify-content: flex-end;
}
.more-btn {
    height: 10px;
    width: 60px;
    background-color: #b4b4b4;
    border: 1px solid #e7e7e7;
    border-top: none;
    border-radius: 0 0 8px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgb(211, 211, 211);
}
.more-btn:hover {
    cursor: pointer;
}
</style>
