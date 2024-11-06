<template>
    <div class="sign-up">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h2>
                        운영자 가입 신청
                        <span>*운영자 가입을 신청하기 위한 정보 입력 후, 신청 버튼을 눌러주십시오.</span>
                    </h2>
                </div>
            </template>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleFormRef"
                label-position="right"
                label-width="auto"
                require-asterisk-position="right"
            >
                <el-form-item prop="loginId" label="아이디">
                    <el-input
                        v-model="ruleForm.loginId"
                        placeholder="아이디를 입력해주세요"
                        autocomplete="off"
                        style="flex: 1; margin-right: 8px"
                    />
                    <el-button @click="checkId">중복검사</el-button>
                </el-form-item>
                <el-form-item prop="name" label="이름">
                    <el-input v-model="ruleForm.name" placeholder="이름을 입력해주세요" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="phone" label="전화번호">
                    <el-input v-model="ruleForm.phone" placeholder="전화번호를 입력해주세요" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="email" label="이메일">
                    <el-input
                        v-model="ruleForm.email"
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="companyId" label="운영자사이트">
                    <DropdownList
                        width="100%"
                        v-model="ruleForm.companyId"
                        placeholder="운영자사이트 선택"
                        :list="companyList"
                        option-label="companyName"
                        option-value="companyId"
                    />
                </el-form-item>
                <el-form-item prop="roleCode" label="운영권한">
                    <DropdownList
                        width="100%"
                        v-model="ruleForm.roleCode"
                        placeholder="운영권한 선택"
                        :list="roleList"
                        option-label="roleName"
                        option-value="roleCode"
                    />
                </el-form-item>
                <el-form-item prop="password" label="비밀번호">
                    <template #label>
                        비밀번호
                        <el-popover
                            title="Tip"
                            :width="280"
                            trigger="hover"
                            content="영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함하여 9~16자리로 입력해주세요."
                        >
                            <template #reference>
                                <el-icon style="margin-left: 5px">
                                    <QuestionFilled />
                                </el-icon>
                            </template>
                        </el-popover>
                    </template>

                    <el-input
                        v-model="ruleForm.password"
                        prefix-icon="lock"
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="checkPass" label="비밀번호 확인">
                    <el-input
                        v-model="ruleForm.checkPass"
                        prefix-icon="lock"
                        placeholder="비밀번호를 다시 입력하세요"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                    모두동의하기
                </el-checkbox>
                <el-checkbox-group v-model="checkedList" @change="handleChecked">
                    <el-checkbox value="서비스약관">
                        <el-link @click="ServiceServiceDialog" type="primary">서비스 약관</el-link>
                        <span>을 확인하였으며, 이에 동의합니다.</span>
                    </el-checkbox>
                    <el-checkbox value="개인정보">
                        <el-link @click="ServiceInfoInfoDialog" type="primary">개인정보 활용 </el-link>
                        <span> 동의 안내를 확인하였으며, 이에 동의합니다.</span>
                    </el-checkbox>
                </el-checkbox-group>
            </el-form>
            <template #footer>
                <el-button size="large" class="login-btn" @click="onCancel">취소</el-button>
                <el-button type="primary" size="large" class="login-btn" @click="submitForm(ruleFormRef)"
                    >신청</el-button
                >
            </template>
        </el-card>
    </div>
    <ServiceDialog v-model="isShowDialog" />
    <ServiceInfoDialog v-model="isShowDialogInfo" />
</template>

<script lang="ts" setup>
import { LoginService } from '@/pages/login/model_service/LoginService'
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules, CheckboxValueType } from 'element-plus'
import { useGlobalDialog } from '@/common/dialog'
import { Notification } from '@/common/dialog'
import ComUtil from '@/common/utils/ComUtil'
import ServiceDialog from './ServiceServiceDialog.vue'
import ServiceInfoDialog from './ServiceInfoInfoDialog.vue'

const loginService = new LoginService()
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedList: any = ref([])
const roleList: any = ref([]) //권한리스트
const companyList: any = ref([{ companyId: 1, companyName: 'SK 매직' }])

let agreements: string[] = ['서비스약관', '개인정보']

// 비밀번호 편경 폼
const ruleFormRef: any = ref(null)
const ruleForm = reactive({
    loginId: '',
    name: '',
    companyId: 0,
    phone: '',
    email: '',
    roleCode: '',
    password: '',
    checkPass: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('새 비밀번호를 입력해주세요.'))
    } else if (!ComUtil.validatePassword(value)) {
        callback(new Error('영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함하여 9~16자리로 입력해주세요.'))
    } else if (value == ruleForm.loginId) {
        callback(new Error('ID와 비밀번호를 동일하게 입력하지 마십시오.'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validateCheckPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('비밀번호를 다시 입력해주세요'))
    } else if (value !== ruleForm.password) {
        callback(new Error('입력한 비밀번호가 일치하지 않습니다. 비밀번호를 다시 입력해주세요'))
    } else {
        callback()
    }
}
const validatePhoneNumber = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('전화번호를 입력해주세요.'))
    } else if (!ComUtil.validatePhoneNumer(value)) {
        callback(new Error('정확한 전화번호를 입력해주세요.'))
    } else {
        callback()
    }
}
const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('이메일을 입력해주세요.'))
    } else if (!ComUtil.validateEmail(value)) {
        callback(new Error('정확한 이메일을 입력해주세요.'))
    } else {
        callback()
    }
}
// 입력 값 인증 룰
const rules = reactive<FormRules<typeof ruleForm>>({
    loginId: { required: true, message: '아이디를 입력해주세요.', trigger: ['change', 'blur'] },
    name: { required: true, message: '이름을 입력해주세요.', trigger: ['change', 'blur'] },
    phone: { required: true, validator: validatePhoneNumber, trigger: ['change', 'blur'] },
    email: { required: true, validator: validateEmail, trigger: ['change', 'blur'] },
    roleCode: { required: true, message: '권한을 선택해주세요.', trigger: ['change', 'blur'] },
    companyId: { required: true, message: '운영자사이트를 선택해주세요.', trigger: ['change', 'blur'] },
    password: [{ required: true, validator: validatePass, trigger: ['change', 'blur'] }],
    checkPass: [{ required: true, validator: validateCheckPass, trigger: ['change', 'blur'] }],
})
const handleCheckAllChange = (val: CheckboxValueType) => {
    checkedList.value = val === true ? agreements : []
    isIndeterminate.value = false
}
const handleChecked = (value: CheckboxValueType[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === agreements.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < agreements.length
}
// 취소
const onCancel = () => {
    loginService.toLoginPage()
}
const checkId = async () => {
    if (!ruleForm.loginId) {
        Notification.warning('아이디를 입력하세요.')
        return
    }
    const res = await loginService.checkId({ loginId: ruleForm.loginId })
    if (res.success == true) {
        Notification.success('사용가능한 아이디 입니다.')
    } else {
        Notification.warning('이미 사용하고 있는 아이디입니다.')
        ruleForm.loginId = ''
    }
}
// 저장
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (!checkAll.value) {
        Notification.warning('서비스 약관 및 개인정보 활용을 체크 동의 해주세요.')
        return
    }
    formEl.validate(valid => {
        if (valid) {
            console.log('submit!')
            useGlobalDialog('신청 하시겠습니까?', '확인', 'YN')
                .onConfirm(() => {
                    loginService
                        .signup(ruleForm)
                        .then(res => {
                            loginService.toLoginPage()
                            Notification.success('신청 완료되었습니다.', '신청 완료')
                        })
                        .catch(err => {
                            Notification.error(err)
                        })
                })
                .onCancel(() => {})
        }
    })
}

const isShowDialog: any = ref(false)
const ServiceServiceDialog = () => {
    isShowDialog.value = true
}
const isShowDialogInfo: any = ref(false)
const ServiceInfoInfoDialog = () => {
    isShowDialogInfo.value = true
}

onMounted(async () => {
    roleList.value = await loginService.getRoleList()
})
</script>

<style lang="scss" scoped>
.sign-up {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.sign-up .el-card {
    height: 95%;
    display: flex;
    flex-direction: column;
}
:deep(.el-card__body) {
    padding: 20px;
}
.card-header span {
    padding: 15px 0;
    margin-left: 10px;
    font-size: 12px;
}

.el-form {
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
}

:deep(.el-card__body) {
    flex: 1;
    overflow: hidden;
}

:deep(.el-card__footer) {
    display: flex;
    justify-content: flex-end;
}

:deep(.el-form-item__label) {
    justify-content: center;
    align-items: center;
}
:deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
:deep(.el-checkbox__label) {
    display: flex;
    align-items: center;
}
</style>
