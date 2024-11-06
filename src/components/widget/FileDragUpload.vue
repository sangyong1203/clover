<template>
    <div style="display: flex; margin-bottom: 12px">
        <el-input type="text" v-model="fileName" disabled />
        <el-upload
            :show-file-list="false"
            :limit="1"
            :on-change="findFile"
            :auto-upload="false"
            :disabled="disabled"
        >
            <el-button type="primary">찾아보기</el-button>
        </el-upload>
    </div>
    <el-upload
        class="upload-demo"
        ref="uploadRef"
        v-loading="loading"
        :style="{ width: width, height: height }"
        :show-file-list="false"
        :limit="1"
        :on-change="handleFileChange"
        :auto-upload="false"
        :disabled="disabled"
        drag
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            여기에 업로드할 파일을 끌어서 놓거나, <em>[찾아보기]</em>를
            선택합니다
        </div>
        <template #tip>
            <div class="el-upload__tip"></div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { toRefs, ref, type Ref } from 'vue'
import { Notification } from '@/common/dialog'
import type { UploadFile, UploadFiles } from 'element-plus'

interface Props {
    disabled?: boolean
    message?: string // tip 메시지
    size?: number // 최대 파일 크기, 단위: KB
    division?: string // 파일 업로드 구분
    // refId?: number // 파일 업로드시 참조번호
    width?: string
    height?: string
}
const props = defineProps<Props>()
const { disabled, size, width, height } = toRefs(props)
const uploadRef: Ref = ref(null)
const loading = ref<boolean>(false)
const fileName = ref('')
const emit = defineEmits(['onUpload'])

const uploadedFile: Ref = ref(null)
const handleFileChange = (file: UploadFile, files: UploadFiles) => {
    //파일용량 체크
    if (size.value && file.size && file.size / 1024 > size.value) {
        onSizeOver(file)
        return
    }
    // 파일이 1개 이상시 최신만 보료
    if (files.length > 1) {
        files.shift()
    }
    uploadedFile.value = file
    fileName.value = file.name
    emit('onUpload', files)
}
const findFile = (file: UploadFile, files: UploadFiles) => {
    // 파일용량 체크
    if (size.value && file.size && file.size / 1024 > size.value) {
        onSizeOver(file)
        return
    }
    // 파일이 1개 이상시 최신만 보료
    if (files.length > 1) {
        files.shift()
    }
    uploadedFile.value = file
    fileName.value = file.name
    uploadRef.value?.handleStart(file.raw)
    emit('onUpload', files)
}

// 파일size 초과시 삭제 및 note
const onSizeOver = (file: UploadFile) => {
    Notification.warning(
        `최대 ${size.value}KB 크기 파일을 첨부 할수 있습니다. 현재 파일 크기는 ${Math.round(file.size / 1024)}KB 입니다.`,
    )
}
</script>
<style lang="scss" scoped>
.el-icon--upload svg {
    width: 100px;
    height: 100px;
}
</style>
