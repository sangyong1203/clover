<template>
    <!-- 파일업로드 -->
    <div class="upload" draggable="true">
        <div class="upload__button-box">
            <h3>{{ label }}</h3>
            <span class="el-upload__tip">
                {{ message }}
            </span>
        </div>
        <el-upload
            ref="uploadRef"
            :headers="{ Authorization: userInfo.accessToken, SystemId: 'IM' }"
            :action="'/api/file/upload/' + division + '/' + refId + fileType"
            :file-list="fileList"
            :accept="accept"
            list-type="picture-card"
            :limt="limit"
            :auto-upload="false"
            :on-change="onChange"
            :on-success="uploadSuccess"
            :disabled="disabled"
        >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file, fileList)"
                        >
                            <el-icon><Delete /></el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>
    </div>
    <BasicDialog v-model="showImage" title="이미지 프리뷰" :button-types="['닫기']" :width="500">
        <el-image :src="previewUrl" alt="사진"></el-image>
    </BasicDialog>
</template>

<script setup lang="ts">
import { toRefs, ref, reactive } from 'vue'
import { Notification, useGlobalDialog } from '@/common/dialog'
import { BasicDialog } from '@/components'
import { useUserStore } from '@/stores/user/UserStore'
import { StdService } from '@/common/model_service/code/StdService'
interface Props {
    label?: string
    disabled?: boolean
    message?: string // tip 메시지
    accept?: string // 접수 할수 있는 파일 타입 .png, .jepg, .xlsx 등
    limit?: number // 최대 첨부 파일 수량
    size?: number // 최대 파일 크기, 단위: KB
    division?: string // 파일 업로드 구분
    refId?: number // 파일 업로드시 참조번호
    fileType: 'image' | 'data' // 파일 종류 이미지(image), 기타(data)
    fileList?: any // 이미지 파일
}
const fileService = reactive(new StdService())
const props = defineProps<Props>()
const { label, fileList, disabled, message, accept, limit, size } = toRefs(props)
const uploadRef: any = ref(null)
const showImage = ref<boolean>(false)
const previewUrl = ref<string>('')
const emit = defineEmits(['update:fileList', 'uploadDone'])

const userInfo: any = useUserStore().loggedInUser

const onChange = (file: any, files: any) => {
    console.log('files', files)

    //파일개수 체크
    if (limit.value && files.length > limit.value) {
        onExceed(file)
    }

    //파일용량 체크
    if (size.value && file.size / 1024 > size.value) {
        onSizeOver(file)
    }

    // //파일을 emit 한다
    emit('update:fileList', files)
}
const handleRemove = (file: any, fileList: any) => {
    console.log('handleRemove', file)
    useGlobalDialog('삭제하시겠습니까?', '확인', 'CONFIRM_YN')
        .onConfirm(() => {
            if (file.sn == undefined) {
                fileList.forEach((item: any, index: number) => {
                    if (item.sn === file.sn) {
                        fileList.splice(index, 1)
                    }
                })
            } else {
                fileService.imageDelete({ sn: file.sn }).then(res => {
                    if (res) {
                        Notification.success('삭제 되었습니다.')
                        fileList.forEach((item: any, index: number) => {
                            if (item.sn === file.sn) {
                                fileList.splice(index, 1)
                            }
                        })
                    } else {
                        Notification.error('삭제 실페하였습니다.')
                    }
                })
            }
        })
        .onCancel(() => {})
}
const handlePictureCardPreview = (uploadFile: any) => {
    openImage(uploadFile.url)
}
// 이미지 프리뷰 창 열기
const openImage = (url: string) => {
    showImage.value = true
    previewUrl.value = url
}
// 파일개수 초과시 삭제 및 note
const onExceed = (file: any) => {
    Notification.warning(`최대 ${limit.value}개 파일을 첨부 할수 있습니다.`)
    uploadRef.value.handleRemove(file)
}
// 파일size 초과시 삭제 및 note
const onSizeOver = (file: any) => {
    Notification.warning(`최대 ${size.value}KB 크기 파일을 첨부 할수 있습니다.`)
    uploadRef.value.handleRemove(file)
}

const uploadSuccess = (response: any, file: any, fileList: any) => {
    if (response) {
        // Notification.success('업로드 되었습니다.')
        emit('uploadDone', true)
    }
}

const submitUpload = async () => {
    return await uploadRef.value!.submit()
}

defineExpose({ submitUpload })
</script>

<style scoped>
.upload {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 12px;
}

.upload__file-box {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
}
.upload__file-box__list {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px;
    gap: 12px;
}
.upload__file-box__list .name:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
