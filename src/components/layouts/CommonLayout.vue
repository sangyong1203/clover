<template>
    <el-container style="height: 100%">
        <!-- <el-header>
            <el-row>
                <el-col :span="14">
                    <div class="header-left">
                        <el-button
                            :icon="'House'"
                            @click="toDashboard"
                            class="colapse-btn"
                        />
                        <span class="title">
                            <img class="title-logo" :src="logo" />
                            <span class="title-text">통합 관제 시스템</span>
                        </span>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="header-right">
                        <div class="time">
                            <span class="time-label">현재시간 : </span>
                            <span class="time-value">{{
                                dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
                            }}</span>
                        </div>
                        <el-button
                            type="primary"
                            circle
                            @click="logOut()"
                            class="logout"
                        >
                            <el-icon><SwitchButton /></el-icon>
                        </el-button>
                        <el-button
                            type="primary"
                            circle
                            @click="refresh()"
                            class="refresh"
                        >
                            <el-icon><Refresh /></el-icon>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header> -->
        <el-main>
            <div class="contents-wrapper">
                <div class="left-wrapper">
                    <LeftMenu />
                </div>
                <div class="contents">
                    <slot />
                    <!-- <div class="page-footer">
                        <div class="footer-logo">
                            <img style="height: 75%" src="@/assets/logo.svg" />
                        </div>
                        <div class="copy-right">
                            © Copyright 2023 SK magic All rights reserved.
                        </div>
                    </div> -->
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { useNavStore } from '@/stores/nav/NavStore'
import { LeftMenu } from '@/components'
import { useRouter } from 'vue-router'
import { LoginService } from '@/pages/login/model_service/LoginService'
import dayjs from 'dayjs'
import logo from '@/assets/logo.svg'

const loginService = new LoginService()

const router = useRouter()
const navStore = useNavStore()

const toDashboard = () => {
    router.push({ name: 'dashboard' })
    navStore.init()
}

// 로그아웃
const logOut = () => {
    loginService.logout()
}
// 현재 화면 강제 리프레쉬
const refresh = () => {
    location.reload()
}
</script>

<style scoped>
/* header  */
.el-header {
    height: 50px;
    background-color: var(--base-color--black);
    width: 100%;
    align-items: center;
    padding-left: 8px;
}
.el-row,
.el-col,
.header-left,
.header-right {
    height: 100%;
}

/* header left ------------ */
.header-left {
    display: flex;
    align-items: center;
    margin-left: 8px;
}
.header-left .colapse-btn {
    border: none;
    background-color: transparent;
    color: #dddddd;
    padding: 0 !important;
}
:deep(.colapse-btn .el-icon),
:deep(.colapse-btn .el-icon svg) {
    height: 24px;
    width: 24px;
}
.header-left .title {
    color: #fff;
    font-size: 20px;
    margin-left: 20px;
    text-decoration-line: none;
    text-decoration: none;
    display: flex;
    align-items: center;
}
.header-left .title-logo {
    height: 22px;
    margin-right: 12px;
    margin-top: -3px;
}
.header-left .title-text {
    font-size: 20px;
    display: block;
    /* margin-top: 2px; */
}

/* header right ------------ */
.header-right {
    text-align: right;
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.header-right .time {
    padding: 0 20px;
    font-weight: 500;
}
.header-right .time .time-lable {
    font-size: 17px;
}
.header-right .time .time-value {
    font-size: 18px;
}
.header-right .logout {
    margin-right: 4px;
    border: none;
    background-color: var(--primary-color);
}
.header-right .logout:hover {
    text-decoration: underline;
    cursor: pointer;
}
.header-right .logout .el-icon {
    width: 18px;
    height: 18px;
    transform: rotate(90deg);
}
.header-right .logout .el-icon svg {
    width: 18px;
    height: 18px;
}
.header-right .refresh {
    background: var(--primary-color--secondary);
    border: none;
    margin-right: 8px;
}
.header-right .refresh .el-icon {
    width: 18px;
    height: 18px;
}
.header-right .refresh .el-icon svg {
    width: 18px;
    height: 18px;
}

/* 메인 */
.el-main {
    --el-main-padding: 0px;
    color: var(--primary-text-color);
    overflow: hidden;
}
.contents-wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
    background: var(--main-page-bg-color);
}
.contents-wrapper .contents {
    padding: 32px 32px 0px 32px;
    width: 100%;
}

/* 컨텐츠 본문 내용 */
.contents {
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.page-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    align-items: center;
    padding: 12px 0px;
    height: 60px;
}
.footer-logo {
    height: 100%;
}
.copy-right {
    font-size: 0.75rem;
    color: var(--primary-text-color);
    text-align: right;
}
</style>
