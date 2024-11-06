<template>
    <div class="change-password">
        <el-card>
            <template #header>
                <div class="card-header">
                    <h2>비밀번호 변경
                        <span >*비밀번호 유효기간 만료 시 비밀번호를 변경할 수 있습니다.</span>
                    </h2>
                </div>
            </template>
            <!-- <div style="padding:15px 10px; text-align: end">비밀번호 변경 가능 시간 : {{ restTime }}</div> -->

            <el-form 
                style="height: 100%"
                :model="ruleForm" 
                status-icon 
                :rules="rules" 
                ref="ruleFormRef" 
                require-asterisk-position="right"
                label-width="120px">
                <el-form-item prop="pass" label="새 비밀번호">
                    <template #label>
                        새 비밀번호
                        <el-popover
                            title="Tip"
                            :width="280"
                            trigger="hover"
                            content="비밀번호 구성 정책: 숫자, 문자, 특수문자(!@#$%^&*) 포함 9~16자리를 입력해주세요."
                        >
                        <template #reference>
                            <el-icon style="margin-left: 5px;"><QuestionFilled /></el-icon>
                        </template>
                    </el-popover>
                    </template>
                    
                    <el-input
                        v-model="ruleForm.pass"
                        prefix-icon="lock"
                        placeholder="새 비밀번호를 입력하세요"
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
            </el-form>
            <template #footer>
                <el-button
                    size="large"
                    class="login-btn"
                    @click="onCancel"
                    >취소</el-button
                >
                <el-button
                    type="primary"
                    size="large"
                    class="login-btn"
                    @click="submitForm(ruleFormRef)"
                    >저장</el-button
                >
            </template>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { LoginService } from '@/pages/login/model_service/LoginService'
import { ref, reactive,  onMounted, onUnmounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import dayjs from 'dayjs'
import { useGlobalDialog } from '@/common/dialog'
import { Notification } from '@/common/dialog' 
import { useUserStore } from '@/stores/user/UserStore'

const loginService = new LoginService()

// 비밀번호 편경 폼
const ruleFormRef: any = ref(null)
const ruleForm = reactive({
  pass: '',
  checkPass: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('새 비밀번호를 입력해주세요.'))
      
  } else if(!validatePassword(value))
    callback(new Error('숫자, 문자, 특수문자(!@#$%^&*) 포함 9~16자리를 입력해주세요.'))
  
  else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('비밀번호 확인을 입력해주세요'))
  } else if (value !== ruleForm.pass) {
    callback(new Error('새 비밀번호를 확인해주세요'))
  } else {
    callback()
  }
}
// 입력 값 인증 룰
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ required:true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ required:true, validator: validatePass2, trigger: 'change' }],
})
// 취소
const onCancel = () => {
    loginService.toLoginPage()
}
// 저장
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      useGlobalDialog('변경 하시겠습니까?', '확인', 'YN')
      .onConfirm(()=>{
        loginService.changePassword(ruleForm.pass).then(res=>{
          if(res.result === 200)
          useGlobalDialog('비밀번호 변경이 완료되었습니다.', '비밀번호 변경 완료', 'OK')
          .onConfirm(()=>{
            loginService.toLoginPage()
          })
        }).catch( err => {
          Notification.error(err)
          loginService.toLoginPage()
  
        })
      }).onCancel(()=>{})
    } 
  })
}
function validatePassword(password:string) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*]{9,16}$/
  const rs = regex.test(password)
  return rs
}
</script>

<style scoped>
.change-password{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.change-password .el-card{
    height: 95%;
    display: flex;
    flex-direction: column;
}
.card-header span{
    padding:15px 0; 
    margin-left:10px; 
    font-size: 12px;
}
:deep(.el-card__body){
    flex: 1;
}
:deep(.el-card__footer){
    display: flex;
    justify-content: flex-end;
}
:deep(.el-form-item__label){
    justify-content: center;
    align-items: center;
}
</style>
