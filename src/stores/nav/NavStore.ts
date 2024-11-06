import { ref } from 'vue'
import { defineStore } from 'pinia'
import  { useRouter }  from 'vue-router'

export const useNavStore = defineStore(
  'nav',
  () => {
    const router = useRouter()
    const data: any = ref({
      authAction: [],
      nav: [],
      route: '',
      isMenuCollapsed: false,
      isLoading: false
    })
    const init = () => {
      data.value = {
        authAction: [],
        nav: [],
        route: '',
        isMenuCollapsed: false,
        isLoading: false
      }
    }
    const setLoading = (value:boolean) => {
      data.value.isLoading = value
    }
    const getNav = () => {
      return data.value.nav
    }

    const setNav = (nav: Array<{name:string, path:string, data?:any}>) => {
      data.value.nav = nav
    }

    const getRoute = () => {
      return data.value.route
    }

    const setRoute = (route: string) => {
      data.value.route = route
    }

    const getAuthAction = (): string[] => {
      return data.value.authAction
    }

    const setAuthAction = (items: any, path: string) => {
      items.forEach((item: any) => {
          if (item.path === path) {
              const action = item.authAction.split(',')
              data.value.authAction = action
          } else if (item.children) {
              setAuthAction(item.children, path)
          }
      })
    }

    const getMenuCollapse = () => {
      return data.value.isMenuCollapsed
    }

    const setMenuCollapse = (collaspse: boolean) => {
      data.value.isMenuCollapsed = collaspse
    }
    // 해당 path 페이지로 이동,  name: 페이지명, path:페이지경로, data:전달하려는 데이터
    const navTo = (name:string, path: string, data?:any)=>{
      const nav = getNav()
      if( nav.length === 0 || nav.at(-1).name !== name){
        nav.push({ name:name, path:path, data:data})
        setNav(nav)
      }
      router.push(path)
    }
    // 뒤로 가기
    const backTo = () => {
      const nav = getNav()
      if(nav.length > 2){
        nav.pop()
        setNav(nav)
        router.back()
      }
    }
    const getNavData = () => {
      let param = null
      if(data.value.nav.length > 1 ){
        param = data.value.nav.at(-1)?.data
      }
      return param
    }
    return { data, init, setLoading, getNav, setNav, getRoute, setRoute, getAuthAction, setAuthAction, getMenuCollapse, setMenuCollapse, navTo, backTo, getNavData }
  },
  {
    persist: true,
  },
)
