import type { FormInstance, FormRules } from 'element-plus'
import { ElLoading } from 'element-plus'
import { useUserStore } from '@/stores/user/UserStore'
import { menuStore } from '@/stores/menu/MenuStore'
import { useNavStore } from '@/stores/nav/NavStore'
import { reactive } from 'vue'
import { Notification } from '@/common/dialog'
import api from './SelfApi.ts'
import router from '@/router'
import dayjs from 'dayjs'
import type { SignupModel } from './Type.ts'
import { useLangStore } from '@/stores/langStore/LangStore.ts'
import { langs } from '@/assets/language/page/index.ts'
export class LoginService {
    
    userStore = useUserStore()
    navStore = useNavStore()
    loginForm = reactive({
        loginId: '',
        password: '',
        isSaveId: false,
        lang: 'ko',
    })

    // 다국어 설정
    langStore = useLangStore()
    setLang = (langType:string) => {
        this.langStore.setLang(langs)
        console.log('this.langStore.lang',langType, this.langStore.lang)
    }

    rules: FormRules = reactive({
        loginId: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (!this.loginForm.loginId) {
                        callback(new Error('아이디를 입력해 주세요'))
                    } else {
                        callback()
                    }
                },
                trigger: 'change',
            },
        ],
        password: [
            {
                validator: (rule: any, value: any, callback: any) => {
                    if (!this.loginForm.password) {
                        callback(new Error('패스워드를 입력해주세요'))
                    } else {
                        callback()
                    }
                },
                trigger: 'change',
            },
        ],
    })

    // 로그인
    async login(formModel: FormInstance) {
        try {
            formModel.validate((valid: any) => {
                if (valid) {
                    loadingStart()
                    const params = {
                        loginId: this.loginForm.loginId,
                        password: this.loginForm.password,
                    }
                    api.login(params)
                        .then(res => {
                            this.userStore.set(res.data)
                            this.userStore.setSaveId(this.loginForm.isSaveId)
                            if (this.loginForm.isSaveId) {
                                localStorage.setItem('loginId', this.loginForm.loginId)
                                localStorage.setItem('isSaveId', JSON.stringify(this.loginForm.isSaveId))
                            } else {
                                localStorage.removeItem('loginId')
                                localStorage.removeItem('isSaveId')
                            }

                            if (res.data.isLogin == true) {
                                this.navStore.init()
                                router.replace({ name: 'dashboard' })
                                this.setMenuList()
                                // menuStore().setTempMenu()
                                this.setLang(this.loginForm.lang)
                                this.userStore.setLoginTime(dayjs().format('YYYY-MM-DD HH:MM:ss'))
                            } else {
                                Notification.error(res.message)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            Notification.error('에러 메시지:' + err)
                        })
                }
            })
        } catch (error) {
            console.log('login', error)
        }
    }

    // 메뉴 조회
    setMenuList = () => {
        api.userMenu()
            .then(res => {
                menuStore().setMenu(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 로그아웃
    logout = async () => {
        // 로그인 페이지 이동
        router.push({ name: 'login' })

        // logout interval 제거
        clearInterval(this.userStore.logoutTimer)

        // Store 초기화
        this.userStore.init()
        this.navStore.init()
    }

    // 로그인 페이지 이동
    toLoginPage = () => {
        router.push({ name: 'login' })
    }
    // 비밀번호 만료시 변경페이지 이동
    toChangPasswordPage = () => {
        router.push({ name: 'expired_password' })
    }
    // 비밀번호 만료시 변경페이지 이동
    toSignupPage = () => {
        router.push({ name: 'sign_up' })
    }
    // 비밀번호 변경
    changePassword = async (password: string) => {
        const params = {
            id: this.userStore.loggedInUser.user.loginId,
            pswd: password,
            token: this.userStore.loggedInUser.accessToken,
        }
        return await api.changePassword(params)
    }
    // 운영자 계정 신청
    signup = async (params: SignupModel) => {
        await api.signup(params)
    }

    // 권한리스트
    getRoleList = async () => {
        const res = await api.getRoleList()
        return res.data.list
    }

    // 중복아이디 체크
    checkId = async(params:{loginId:string}) => {
        const res = await api.checkId(params)
        return res.data
    }
}

// loading -----
const loadingStart = () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
        loading.close()
    }, 2500)
}
