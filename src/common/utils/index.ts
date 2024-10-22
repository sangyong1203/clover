import fileDownload from 'js-file-download'
import dayjs from 'dayjs'
import { Notification } from '@/common/dialog'

export default {
  isNumber(str: string) {
    const regx = /^[0-9]+$/
    return regx.test(str)
  },

  /**
   * Null 체크
   * @param {*} value
   */
  isEmpty: (value: any) => {
    if (
      value == '' ||
      value == null ||
      value == undefined ||
      (value != null && typeof value == 'object' && !Object.keys(value).length)
    ) {
      return true
    } else {
      return false
    }
  },
  cloneObject(obj: any) {
    const clone: any = {}
    for (const key in obj) {
      if (typeof obj[key] == 'object' && obj[key] != null) {
        clone[key] = this.cloneObject(obj[key])
      } else {
        clone[key] = obj[key]
      }
    }

    return clone
  },

  /** lpad
   * @params
   *  - str : 원 문자열
   *  - padLen : 최대 채우고자 하는 길이
   *  - padStr : 채우고자하는 문자(char)
   */
  lpad(str: string, padLen: number, padStr: string | any[]) {
    if (padStr.length > padLen) return str

    str += ''
    padStr += ''
    while (str.length < padLen) str = padStr + str
    str = str.length >= padLen ? str.substring(0, padLen) : str
    return str
  },

  /**
   * 바이트 단위 표시
   * @param byte byte
   * @param d   digit
   * @returns  0 Bytes
   */
  formatBytes: (byte: number, digit: number = 2) => {
    if (0 === byte) return '0 Bytes'
    const c = 1024
    const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(byte) / Math.log(c))
    return parseFloat((byte / Math.pow(c, f)).toFixed(digit)) + ' ' + unit[f]
  },

  _formatCurrency: (n: number) => {
    if (0 == n) return '0'
    const c = 1000
    const e = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y']
    const f = Math.floor(Math.log(n) / Math.log(c))
    return parseFloat((n / Math.pow(c, f)).toFixed()) + e[f]
  },
  get formatCurrency() {
    return this._formatCurrency
  },
  set formatCurrency(value) {
    this._formatCurrency = value
  },

  /**
   * 숫자 콤마
   * @param {숫자} num
   * @returns
   */
  addComma(num: { toString: () => string } | undefined) {
    if (num == undefined) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  // /**
  //  * access btn
  //  * @param {*} action
  //  */
  // setActionBtn(action: string[]) {
  // 	const btnObj = document.querySelectorAll(".contents .el-button");
  // 	btnObj.forEach((btn) => {
  // 		// console.log(this.getActionClass(btn.classList));
  //         // btn.style.display = "none";
  //         btn.style.display = !action.includes(this.getActionClass(btn.classList)) ? "none" : "";
  // 	});
  // },

  getActionClass(classList: string[]) {
    const action = ['GET', 'POST', 'PUT', 'DELETE']
    let result = ''
    action.forEach(act => {
      for (const idx in classList) {
        if (classList[idx] == act) {
          result = act
          break
        }
      }
    })
    return result
  },

  /**
   * 모바일 여부
   * @returns
   */
  isMobile() {
    const UserAgent = navigator.userAgent

    if (
      UserAgent.match(
        /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
      ) != null ||
      UserAgent.match(/LG|SAMSUNG|Samsung/) != null
    ) {
      return true
    } else {
      return false
    }
  },
  /**
   * 전화번호 입력 정확한지 체크
   * @param value string // 전화번호
   * @returns boolean
   */
  validatePhoneNumer(value:string){
    if(value == ''){		
      return false;	
    }	
    // const regex = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;	
    const regex = /^(01[016789])-?\d{3,4}-?\d{4}$/
    const rs = regex.test(value)
    return rs
  },
  /**
   * 이메일 입력 정확한지 체크
   * @param value string // 이메일
   * @returns boolean
   */
  validateEmail(value:string){
    if(value == ''){		
      return false;	
    }	
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const rs = regex.test(value)
    console.log('email', rs)
    return rs
  },
    /**
   * 비밀번호 입력 정확한지 체크
   * 규칙: 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함하여 9~16자리
   * @param value string // 비밀번호
   * @returns boolean
   */
  validatePassword(value: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,16}$/
    const rs = regex.test(value)
    return rs
  },

  /**
   * dayjs를 이용하여 날짜 format하는 메소드. null/undefined/빈값이 들어올떄  빈값을 반환
   * @param date 날짜 Object  혹은  날짜 string 
   * @param format 날짜 격식. 예: YYYY-MM-DD,  dayjs 라이브러리 격식 참조
   * @returns 날짜 string
   */
  dateFormat(date:any, format: string){
    if(date == null || date == undefined || date == ''){
      return ''
    }else {
      const d =  dayjs(date).format(format)
      return d
    }
  },

  /**
   * ElTable checkbox 단일선택 혹은 다종선택에 따라 선택값을 반환.
   * ElTable @selection-change 이벤트 callback 함수안에 사용 
   * <el-table multiple>: el-table 테그에 multiple 추가시 다종선택 가능, multiple 없으면 단일선택
   * @param tableRef ElTable의 ref,  예: ref="tableRef"
   * @param val @selection-change에서 받아온 checkbox 선택 값
   * @returns 선택값 Array 반환
   */
   getTableSelection(tableRef: any, val: any[]): any[] {
    const hasMultiple = Object.keys(tableRef.value?.$attrs).includes('multiple')
    let resData = []
    if(hasMultiple){
        resData = tableRef.value?.getSelectionRows()
    } else {
        val.forEach( (item:any, index) => {
            if(index < val.length-1){
                tableRef.value?.toggleRowSelection(item, false )
            }
        } )
        resData = tableRef.value?.getSelectionRows()
    }
    return resData
  },

  /**
   * 엑셀 다운로드 함수
   * @param data excel api 호출하여 불러온 excel file data
   * @param fileName 엑셀 다운로드할때 정해주는 파일이름
   * @example 
   * ComUtil.excelDownload(res.data, '장치정보')
   */
  excelDownload(data:any, fileName:string){
    fileDownload(data, `${fileName}_엑셀파일_${dayjs(new Date()).format('YYYY_MM_DD_HH_mm_ss')}.xlsx`)

  },
  /**
   * 선택 기간 제한, 초과 시 Warning note. DoubleDatePicker 사용시 기간 제한 validation 용도 
   * @param startDate 시작날짜/월/년
   * @param endDate 종료날짜/월/년
   * @param dateKey string year | month | day
   * @param limit number 제한 기간
   * @returns boolean 초과 여부
   */
  dateSelectionLimit(startDate:string, endDate:string, dateKey: 'year' | 'month' | 'day', limit?:number){
    const stD = dayjs(startDate)
    const enD = dayjs(endDate)
    let limitDate = 0
    let isOverLimit = false
    if(dateKey === 'year') {
      limitDate = limit ? limit : 3
      const duration =  enD.diff(stD, 'year')
      if(duration> limitDate){
          Notification.warning(`최대 ${limitDate}년 이내로 선택하세요.`)
          isOverLimit = true
      }
    }
    if(dateKey === 'month') {
      limitDate = limit ? limit : 12
      const duration =  enD.diff(stD, 'month')
      if(duration> limitDate){
          Notification.warning(`최대 ${limitDate}개월 이내로 선택하세요.`)
          isOverLimit = true
      }
    }
    if(dateKey === 'day') {
      limitDate = limit ? limit : 14
      const duration =  enD.diff(stD, 'day')
      if(duration> limitDate){
          Notification.warning(`최대 ${limitDate}일 이내로 선택하세요.`)
          isOverLimit = true
      }
    }
    return isOverLimit
  },

  /**
   * Ctrl 메뉴 클릭하여 세창에 페이지 이동 시 사용하는  함수
   */
  setNewpageSession(){
    // Ctrl 메뉴 클릭하여 세창에 페이지 이동 시 User sessionStorage 잠간 localStorage에 저장후 삭제
    const user = sessionStorage.getItem('User')??''
    localStorage.setItem('mommoss-user', user);
    setTimeout(()=>{
        localStorage.removeItem('mommoss-user');
    }, 1000)
  }

}
