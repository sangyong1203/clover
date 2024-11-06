
//레시피 코드 목록
export interface StdRcpModel {
    receCd: string //레시피코드
    receCmnt: string //레시피설명
}
//기업 코드 목록
export interface StdCmpnsModel {
    cmpCd: string //기업코드
    cmpNm: string //기업명
}
//생산라인 코드 목록
export interface StdLineModel {
    cmpCd: string //기업코드
    cmpLineId: string //라인아이디
    lineCmnt: string //라인설명
    lineName: string //라인네임(코드 + 설명)
}
//생산제품 코드 목록
export interface StdPrdctModel {
    prdCd: string //제품코드
    prdNm: string //제품명
}
//생산설비 코드 목록
export interface StdEqpmnModel {
    cmpEqId: string //설비아이디
    prcCmnt: string //설비설명
    eqName: string //설비네임(코드+설명)
}
//알람 코드 목록
export interface StdAlrModel {
    alrCd: string //알람 코드
    alrCmnt: string //알람 설명
}
//장치 코드 목록
export interface StdDevModel {
    devCd: string //장치코드
    devMdl: string //장치모델
}

//생산수주MD 코드 목록
export interface PrdctnOrdrMmCdModel {
    cd: string //코드
    cdNm: string //코드명
}

//생산타입 코드 목록
export interface PrdTypNoModel {
    cd: string //코드
    cdNm: string //코드명
}

// 에러레벨 코드 목록
export interface GrdCdModel {
    grdCd: string //코드
    grdNm: string //코드명
}

// 조치상황 코드 목록
export interface ClsfCdModel {
    clsfCd: string //코드
    clsfNm: string //코드명
}

// 설비별 장치 코드 목록
export interface EqDevCdModel {
    devCd: string //코드
    devNm: string //코드명
}

//범용 코드 목록
export interface CdModel {
    cdNm: string //코드
    cd: string //코드명
}

//범용 코드 목록
export interface OptionModel {
    label: string //라벨
    value: string //밸류
}
