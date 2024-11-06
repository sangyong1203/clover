
export interface UserState {
  loggedInUser: UserModel
  onceAuth: boolean
  lastRefreshedApiTime: number
  isTokenRefreshing: boolean
  isLoggedIn: boolean
  logoutTimer: number
  isSaveId: boolean
  loginTime: string
}

export interface UserModel {
  isLogin: boolean
  accessToken: string
  validateKey: string
  expire: string
  user: {
      email: string | null
      loginId: string
      name: string
  }
}