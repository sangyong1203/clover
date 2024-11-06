import { defineStore } from 'pinia'
import { type UserState, type UserModel } from '@/stores/user/Type'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore('User', {
  state: (): UserState => ({
    logoutTimer: 0,
    loggedInUser: {
      accessToken: '',
      expire: '',
      isLogin: false,
      validateKey: '',
      user: {
          email: '',
          loginId: '',
          name: '',
      }
    },
    onceAuth: false,
    lastRefreshedApiTime: 0,
    isTokenRefreshing: false,
    isLoggedIn: false,
    isSaveId: false,
    loginTime:''
  }),
  getters: {
    loginUser(): UserModel {
      return this.loggedInUser as UserModel
    },
    isOnceAuth(): boolean {
      const result = this.onceAuth
      this.onceAuth = false
      return result
    },
    hasLogin(): boolean {
      return this.isLoggedIn
    },
    getAuthToken(): string {
      const {  accessToken } = this.loggedInUser
      if ( isEmpty(accessToken)) return ''
      return accessToken
    },
  },
  actions: {
    init() {
      this.loggedInUser = {
          accessToken: '',
          expire: '',
          isLogin: false,
          validateKey: '',
          user: {
              email: '',
              loginId: '',
              name: '',
          }
      } 
      this.lastRefreshedApiTime = 0
      this.isTokenRefreshing = false
      this.isSaveId = false
    },
    set(info: UserModel) {
      this.loggedInUser = info
    },
    successOnceAuth() {
      this.onceAuth = true
    },
    setSaveId( value:boolean ){
      this.isSaveId = value
    },
    setLoginTime(value:string){
      this.loginTime = value
    },
    setLogoutTimer(timer: number) {
      this.logoutTimer = timer
    },
    updateLastRefreshedApiTime() {
      this.lastRefreshedApiTime = new Date().getTime()
    },
    isExpiredToken() {
      if (this.lastRefreshedApiTime <= 0) return false
      const now = new Date().getTime()
      const calc = now - this.lastRefreshedApiTime
      const EXPIRED_TOKEN = 30 * 60 * 1000

      if (calc < EXPIRED_TOKEN) return false
      const expireTime = dayjs(this.loggedInUser.expire).valueOf()
      if (expireTime > now) return false
      this.lastRefreshedApiTime = 0
      this.isTokenRefreshing = false
      return true
    },
  },
    persist: {
        enabled: true,
        storage: window.sessionStorage
    } as PersistedStateOptions
  
})
