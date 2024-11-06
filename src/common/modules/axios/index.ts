import { Notification } from '@/common/dialog'
import type { RequestOption,  } from '@/common/modules/axios/request'
import { makeRequiredRequestConfig } from '@/common/modules/axios/request'
import { APIResponse } from '@/common/modules/axios/response'
import router from '@/router'
import { useNavStore } from '@/stores/nav/NavStore'
import { type UserModel } from '@/stores/user/Type.ts'
import { useUserStore } from '@/stores/user/UserStore'
import type { AxiosResponse, Method, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import dayjs from 'dayjs'
import { isNil } from 'lodash'
import { useGlobalAppStore } from '@/stores/global_app/GlobalAppStore';

export const request = (method: Method) => {
    return (url: string) => {
        return async (opt: RequestOption) => {
            useNavStore().setLoading(true)
            const config: AxiosRequestConfig = makeRequiredRequestConfig(method)({ url, opt })
            const userInfo: UserModel = useUserStore().loggedInUser
            const globalStore = useGlobalAppStore()

            return new Promise<APIResponse>((resolve, reject) => {
                // token 갱신
                refreshAccseeToken(config, userInfo)

                // progress true일때 uploading progress bar 활성화 
                if(opt.progress){
                    globalStore.setProgress(true)
                    config.onUploadProgress = (progressEvent:any) =>{
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        globalStore.setPercentCompleted(percentCompleted)
                    }
                }

                // axios request
                axios
                    .request(config)
                    .then((response: AxiosResponse) => {
                        const res = new APIResponse(response)
                        useNavStore().setLoading(false)
                        console.log('AxiosResponse', res)
                        resolve(res)
                        globalStore.setProgress(false) // progress bar close

                    })
                    .catch(err => {
                        useNavStore().setLoading(false)
                        console.log('axios err', err)
                        handleError(err.response)
                        globalStore.setProgress(false) // progress bar close


                    })
            })
        }
    }
}

// 에러 처리
const handleError = (res: APIResponse) => {
    if (isNil(res)) return
    if (res.data.result == 404) {
        // router.push({ name: '404' })
        Notification.error('해당 페이지가 없습니다.')
    } else if (res.data.result == 401) {
        router.push({ name: 'login' })
        Notification.error(`장기간 사용하지 않아 시간이 만료되었습니다. 다시 로그인하세요.`)
    } else if (res.data.result == 403) {
        Notification.error(`액세스 거부 되었습니다. (ERR:${res.data.result}`)
    } else if (res.data.result == 500) {
        Notification.error(`시스템 에러. 관리자에게 문의해주세요. (ERR:${res.data.result})`)
    } else {
        Notification.error(res.data)
        // Notification.error(res.data.message + `(에러코드:${res.data.result})`)
    }
}
// token 갱신
export const refreshAccseeToken = (config: any, userInfo: UserModel) => {
    const lastRefreshedApiTime = useUserStore().lastRefreshedApiTime // 최신 api호출한 시간
    console.log('lastRefreshedApiTime----', lastRefreshedApiTime)
    const expiredtime = dayjs(userInfo.expire).valueOf() // 최종 expire 시간
    if (expiredtime !== 0 && lastRefreshedApiTime >= expiredtime) {
        router.push({ name: 'login' })
        Notification.error('사용 시간이 만료되었습니다. 다시 로그인하세요.')
        useUserStore().init()
        return
    }
    const usageTime = Date.now() - lastRefreshedApiTime // 시스템 사용 시간
    const refreshIntervalTime = 60 * 1000 // 1분 간격, 사용시간이 일정 시간간격 초과시 판단하는 조건

    if (userInfo.user.loginId !== '' && (expiredtime === 0 || usageTime >= refreshIntervalTime)) {
        axios
            .post('/api/createAccessToken', { loginId: userInfo.user.loginId })
            .then(res => {
                // console.log('createAccessToken -------------', res.data)
                const resData = res.data.data
                if (resData.accessToken != null) {
                    // 최신 요청 시간 갱신
                    useUserStore().updateLastRefreshedApiTime()

                    // 토큰 정보 갱신
                    userInfo.accessToken = resData.accessToken
                    userInfo.validateKey = resData.validateKey
                    userInfo.expire = resData.expire
                    // 토큰 정보 store에 저장
                    useUserStore().set(userInfo)

                    // config accseeToken 갱신
                    if (config.headers) {
                        config.headers.Authorization = userInfo.accessToken
                    }
                }
            })
            .catch(err => {
                console.log('tokern err', err)
            })
    }
}

const requestGet = async (url: string, opt: RequestOption = {}) => request('GET')(url)(opt)
const requestPost = async (url: string, opt: RequestOption = {}) => request('POST')(url)(opt)
const requestDelete = async (url: string, opt: RequestOption = {}) => request('DELETE')(url)(opt)
const requestPut = async (url: string, opt: RequestOption = {}) => request('PUT')(url)(opt)
const requestGetFile = async (url: string, opt?: RequestOption) => {
    return request('GET')(url)({
        responseType: 'blob',
        ...opt,
    })
}

export const fetch = () => {
    return {
        get: requestGet,
        post: requestPost,
        put: requestPut,
        delete: requestDelete,
        getFile: requestGetFile,
    }
}
