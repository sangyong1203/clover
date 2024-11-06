<template>
    <div class="search-text" :style="{ width: props.width ?? '' }" @keyup.enter="onEnter">
        <div v-if="label" class="search-text_label" :style="{ width: props.labelWidth ?? '' }">
            {{ props.label }}
        </div>
        <slot></slot>
        <el-input
            style="flex: 1"
            :model-value="props.modelValue"
            :placeholder="props.placeholder ?? '검색어 입력'"
            @input="onInput"
            :suffix-icon="Search"
        >
        </el-input>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
interface Props {
    label?: string | null
    labelWidth?: string | null // label 너비 조절
    width?: string | null // 총 너비 조절, 100% 로 설정시 총 너비가 부모노드 너비 맞춤
    placeholder?: string | null
    modelValue: string | number | null
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'onEnter'])

const onInput = (value: any) => {
    emits('update:modelValue', value)
}
const onEnter = () => {
    emits('onEnter')
}
</script>
<style scoped>
.search-text {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--label-text-color);
}
.search-text_label {
    color: var(--label-text-color);
}
.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>
