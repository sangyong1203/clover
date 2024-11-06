import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Menu {
    id?: number
    title?: string
    path?: string
    icon?: string
    children?: Array<Menu>
}

export const menuStore = defineStore('menu', 
    () => {
        const data = ref<Array<Menu>>([])
        const init = () => {
            data.value = []
        }
        const getMenu = (): Array<Menu> => {
            return data.value
        }

        const setMenu = (arr: Array<Menu>) => {
            data.value = arr
        }
        const setTempMenu = () => {
            data.value = tempMenu
        }

        return { data, init, getMenu, setMenu, setTempMenu }
    },
    { persist: true }
)

const tempMenu = [
    {
        id: 19,
        title: '제품 관리',
        path: '/product',
        icon: 'List',
        children: [

            { id: 101, title: '카테고리 관리', path: '/product/category', icon : '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 102, title: '모델 관리', path: '/product/model', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 103, title: '제품 등록', path: '/product/productRegister', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
        ],
    },
    {
        id: 18,
        title: '제품 운영현황',
        path: '/operation',
        icon: 'Management',
        children: [
            { id: 110, title: '제품 설치정보 조회', path: '/operation/building', icon : '', authAction:'GET', children: [] },
            { id: 110, title: '제품 운영정보 조회', path: '/operation/device', icon : '', authAction:'GET', children: [] },
        ],
    },
    {
        id: 18,
        title: '데이터 분석',
        path: '/analysis',
        icon: 'DataLine',
        children: [
            { id: 181, title: '운영 통계', path: '/analysis/operation', icon : '', authAction:'GET', 
                children: [
                    { id: 1811, title: '운영 모드별 사용통계', path: '/analysis/operation/usage', icon : '', authAction:'GET', children: [] },
                    { id: 1812, title: '공기질 측정 통계', path: '/analysis/operation/air', icon : '', authAction:'GET', children: [] },
                ] 
            },
            { id: 183, title: '오류 통계', path: '/analysis/error', icon : '', authAction:'GET', 
                children: [
                    { id: 1831, title: '오류 발생 유형 통계', path: '/analysis/error/errorType', icon : '', authAction:'GET', children: []},
                    { id: 1832, title: '오류이력', path: '/analysis/error/errorHistory', icon : '', authAction:'GET', children: []}
                ] 
            },
            { id: 180, title: '알람이력', path: '/analysis/alarmHistory', icon : '', authAction:'GET', children: [] },
        
    ],
    },
    {
        id: 17,
        title: 'FOTA 관리',
        path: '/fota',
        icon: 'Files',
        children: [
            { id: 110, title: '업데이트 등록', path: '/fota/firmware', icon : '', authAction:'GET', children: [] },
            { id: 110, title: '업데이트 작업 관리', path: '/fota/job', icon : '', authAction:'GET', children: [] },
        ],
    },
    {
        id: 10,
        title: '계정 및 권한',
        path: '/system',
        icon: 'UserFilled',
        children: [
            { id: 101, title: '사용자 정보 조회', path: '/system/user', icon : '', authAction:'GET', children: [] },
            { id: 102, title: '운영자 관리', path: '/system/manager', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 103, title: '운영 권한 관리', path: '/system/authority', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 104, title: '운영자 접근 관리', path: '/system/managerAccess', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 105, title: '운영자 계정 신청 관리', path: '/system/managerApproval', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
        ],
    },
    {
        id: 9,
        title: '설정',
        path: '/setting',
        icon: 'Setting',
        children: [
            { id: 91, title: '알람 설정', path: '/setting/alarm', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 91, title: '에러코드 관리', path: '/setting/error', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 91, title: '코드 관리', path: '/setting/code', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 91, title: '공지사항 관리', path: '/setting/notice', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 92, title: '약관 관리', path: '/setting/terms', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            // { id: 93, title: '메뉴 관리', path: '/setting/menu', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
            { id: 94, title: '사이트 관리', path: '/setting/site', icon: '', authAction:'GET,PUT,POST,DELETE', children: [] },
        ],
    },
]
