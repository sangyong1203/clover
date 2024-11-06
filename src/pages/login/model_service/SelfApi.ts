import { fetch } from '@/common/modules/axios'
import type { LoginInfoModel, SignupModel} from './Type.ts'
import type { UserModel } from '@/stores/user/Type.ts'
import { APIResponse } from '@/common/modules/axios/response.ts'

export default {
    // 로그인
  async login(params: LoginInfoModel): Promise<APIResponse> {
    const payload = { body: params }
    const res = await fetch().post('/api/login', { payload })
    return res
  },

  // 메뉴 조회
  async userMenu(): Promise<APIResponse> {
    const payload = { query : {typ : 'IM'}}
    const res = await fetch().get('/api/authenticated/userMenu', { payload })
    return res
  },

  // 비밀번호만료회원조회
  async getExpiredPswd(params:string): Promise<APIResponse> {
    const payload = { query: {token:params} }
    const res = await fetch().get('/api/expired/password/expiredPswd', { payload })
    return res
  },

  // 비밀번호변경
  async changePassword(params:{id:string, pswd:string, token:string}): Promise<APIResponse> {
    const payload = { body: params }
    const res = await fetch().put('/api/expired/password/updateExpiredPswd', { payload })
    return res
  },

  // 운영자 계정 신청
  async signup(params:SignupModel): Promise<any> {
    const payload = { body: params}
    return await fetch().post('/api/system/managerSignup', { payload })
  },
  // 권한리스트
  async getRoleList(): Promise<APIResponse>{
    return await fetch().get('/api/system/authority/list')
  },
  // 중복아이디 체크
  async checkId(params:{loginId:string}): Promise<APIResponse>{
    const payload = { body: params}
    return await fetch().post('/api/system/manager/checkId', { payload })
  }

}