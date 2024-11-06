<template>
    <div class="layout-login">
        <div class="outer">
            <div class="middle">
                <!-- <div class="middle-left fade-in" >
          <img class="login-header-logo" src="@/assets/images/logo_login.svg"/>
          <p class="system-name">Air-bot 통합관제 플랫폼</p>
          <p class="system-sub-name">Air-bot Integrated Control System</p>
        </div> -->
                <div class="middle-right fade-in">
                    <div class="login-header">
                        <img class="login-header-logo" :src="logo" />
                        <p class="login-header-title">통합 관제 시스템</p>
                        <p class="login-header-content">
                            SK매직의 통합관제 시스템 이용을 위하여<br />
                            로그인을 진행하여 주시기 바랍니다.
                        </p>
                    </div>
                    <div class="login">
                        <el-form
                            :model="formModel"
                            status-icon
                            :rules="loginService.rules"
                            ref="formModel"
                        >
                            <el-form-item
                                prop="loginId"
                                style="margin-bottom: 18px"
                            >
                                <el-input
                                    v-model="loginService.loginForm.loginId"
                                    prefix-icon="user-filled"
                                    placeholder="아이디"
                                    autocomplete="off"
                                    autofocus
                                />
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    v-model="loginService.loginForm.password"
                                    prefix-icon="lock"
                                    placeholder="패스워드"
                                    type="password"
                                    autocomplete="off"
                                    @keyup.enter="loginService.login(formModel)"
                                />
                            </el-form-item>

                            <div>
                                <el-checkbox
                                    v-model="loginService.loginForm.isSaveId"
                                    >아이디 저장</el-checkbox
                                >
                                <el-button
                                    size="large"
                                    class="login-btn"
                                    text
                                    bg
                                    @click="loginService.login(formModel)"
                                    >로그인</el-button
                                >
                            </div>
                            <div>
                                <p
                                    style="
                                        color: #dddddd;
                                        font-size: 12px;
                                        margin-top: 20px;
                                    "
                                >
                                    * 아이디가 없으신 분은 회원가입 신청을
                                    해주시기 바랍니다.
                                </p>
                                <el-button
                                    size="large"
                                    class="sign-up"
                                    text
                                    bg
                                    @click="loginService.toSignupPage"
                                    >회원가입 신청</el-button
                                >
                            </div>
                            <div
                                style="
                                    margin-top: 20px;
                                    display: flex;
                                    justify-content: flex-end;
                                "
                            >
                                <div
                                    style="
                                        color: white;
                                        display: flex;
                                        align-items: center;
                                        margin-right: 8px;
                                    "
                                >
                                    언어:
                                </div>
                                <DropdownList
                                    style="width: 120px"
                                    v-model="loginService.loginForm.lang"
                                    placeholder="--언어선택--"
                                    :list="languageCodes"
                                    option-label="name"
                                    option-value="code"
                                />
                            </div>
                        </el-form>
                    </div>

                    <div class="login-footer">
                        © Copyright 2023 SK Magic All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DropdownList } from '@/components'
import { LoginService } from '@/pages/login/model_service/LoginService'
import { ref, onMounted, type Ref } from 'vue'
import logo from '@/assets/logo.svg'

const formModel: Ref = ref(null)
const loginService = new LoginService()

onMounted(() => {
    const isSaveId = localStorage.getItem('isSaveId')
    loginService.loginForm.isSaveId = isSaveId ? JSON.parse(isSaveId) : false
    if (loginService.loginForm.isSaveId == true) {
        loginService.loginForm.loginId = localStorage.getItem('loginId') ?? ''
    }
})

const languageCodes = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ru', name: 'Russian' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ms', name: 'Malay' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'id', name: 'Indonesian' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'da', name: 'Danish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'he', name: 'Hebrew' },
    { code: 'el', name: 'Greek' },
    { code: 'cs', name: 'Czech' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'hr', name: 'Croatian' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'et', name: 'Estonian' },
    { code: 'fa', name: 'Persian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'am', name: 'Amharic' },
    { code: 'sw', name: 'Swahili' },
    { code: 'af', name: 'Afrikaans' },
]
</script>

<style scoped>
.layout-login .outer {
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--base-color--gray);
}

.layout-login .middle {
    display: flex;
    /* justify-content: center; */
    justify-content: flex-end;
    height: 100%;
}
.layout-login .middle-left {
    display: flex;
    align-items: flex-start;
    color: rgb(237, 237, 237);
    flex-direction: column;
    justify-content: center;
    padding-right: 20px;
    padding-left: 10%;
    flex: 1;
}
.layout-login .system-name {
    font-size: 65px;
    font-weight: 100;
    /* color: #d3d3d3; */
    color: #f1f1f1;
    width: 100%;
}
.system-sub-name {
    color: #d3d3d3;
    font-size: 32px;
}
.layout-login .middle-right {
    width: 26%;
    padding: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: var(--base-color--dark);
    box-shadow: -4px 0px 8px #0e1d1f7a;
}
/* Login Form */
.layout-login .middle-right .login {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
.layout-login .middle-right .login-header {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    margin-bottom: 20px;
}
.layout-login .middle-right .login-header .title {
    color: #c9d1d9;
    font-size: 48px;
    margin-right: 10px;
    font-weight: bold;
}
.layout-login .middle-right .login-header-logo {
    display: block;
    width: 255px;
}
.layout-login .middle-right .login-header-title {
    padding: 12px 0 0;
    font-size: 34px;
    font-weight: bold;
    width: 100%;
    color: #d4d4d4;
}
.layout-login .middle-right .login-header-content {
    padding: 16px 0 0;
    font-size: 18px;
    line-height: 28px;

    width: 100%;
    color: #d4d4d4;
}
.layout-login .middle-right .login .el-input__wrapper {
    background-color: #262727;
    box-shadow: none;
    border: 1px solid #414243;
    padding: 0px 8px;
}
.layout-login
    .middle-right
    .login
    .el-form-item.is-error
    .el-input__wrapper.is-focus {
    box-shadow: none !important;
}
.layout-login .middle-right .login .el-input .el-input__inner {
    height: 45px;
    color: #c9d1d9;
}
.layout-login .middle-right .login .el-input .el-input__prefix-inner {
    height: 45px;
    color: #c9d1d9;
}
.layout-login .middle-right .login .el-input .el-input__suffix-inner {
    height: 45px;
    color: #c9d1d9;
}
.layout-login .middle-right .login .el-form-item {
    margin-bottom: 8px;
}
.layout-login .middle-right .login .el-form-item__error {
    color: #c9d1d9;
}
.layout-login
    .middle-right
    .login
    .el-form-item.is-error
    .el-input__validateIcon {
    color: #c9d1d9;
}
.layout-login .middle-right .login .login-btn {
    width: 100%;
    font-size: 14px;
    margin-top: 4px;
    color: var(--primary-text-color);
    background: var(--primary-color);
}
.layout-login .middle-right .login .el-checkbox {
    color: #dddddd;
    --el-checkbox-font-size: 12px;
    --el-color-primary: var(--primary-color) !important;
}
:deep(.el-checkbox__label) {
    color: #dddddd !important;
}

.layout-login .middle-right .login .sign-up {
    background: var(--base-color--gray);
    color: #f1f1f1;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
}
.layout-login .middle-right .login-footer {
    font-size: 12px;
    text-align: center;
    color: #c9d1d9;
    margin-top: 20px;
    position: absolute;
    bottom: 32px;
}
.layout-login .middle-right .login input:-webkit-autofill,
.layout-login .middle-right .login input:-webkit-autofill:hover,
.layout-login .middle-right .login input:-webkit-autofill:focus,
.layout-login .middle-right .login input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px #161b22 inset !important;
    -webkit-text-fill-color: #c9d1d9 !important;
}

.fade-in {
    animation-duration: 3s;
    animation-name: fadein;
}

@keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 100%;
    }
}

.slide-in {
    animation-duration: 1.5s;
    animation-name: slidein;
}

@keyframes slidein {
    from {
        opacity: 0;
        height: 0;
    }

    to {
        opacity: 100%;
        height: 25%;
    }
}
</style>
