
import { common } from './kr/common'
import { settingAlarm } from './kr/settingAlarm'
import { settingError } from './kr/settingError'
import { settingCode } from './kr/settingCode'
import { settingNotice } from './kr/settingNotice'
import { settingTerms } from './kr/settingTerms'
import { systemUser } from './kr/systemUser'
import { systemManager } from './kr/systemManager'
import { systemAuthority } from './kr/systemAuthority'
import { systemManagerAccess } from './kr/systemManagerAccess'
import { systemManagerApproval } from './kr/systemManagerApproval'
import { fotaFirmware } from './kr/fotaFirmware'
import { fotaJob } from './kr/fotaJob'
import { productCategory } from './kr/productCategory'
import { productModel } from './kr/productModel'

export const langs = [
    common, // 공통 컴포넌트
    settingAlarm, // 알람 설정
    settingError, // 에러코드 관리
    settingCode, // 코드 관리
    settingNotice, // 공지사항 관리
    settingTerms, // 약관 관리
    systemUser, // 사용자 정보 조회
    systemManager, // 운영자 관리
    systemAuthority, // 운영 권한 관리
    systemManagerAccess, // 운영자 접근 관리
    systemManagerApproval, // 운영자 계정 신청 관리
    fotaFirmware, // 업데이트 등록
    fotaJob, // 업데이트 작업 관리
    productCategory, // 카테고리관리
    productModel, // 모델관리
] 
