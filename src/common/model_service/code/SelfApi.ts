import { fetch } from '@/common/modules/axios'
import { APIResponse } from '@/common/modules/axios/response'
import type {
    StdRcpModel,
    StdCmpnsModel,
    StdLineModel,
    StdPrdctModel,
    StdEqpmnModel,
    StdAlrModel,
    StdDevModel,
    PrdctnOrdrMmCdModel,
    PrdTypNoModel,
    GrdCdModel,
    ClsfCdModel,
    EqDevCdModel,
    CdModel,
    OptionModel,
} from './Type'
import type { Params, PayloadModel } from '@/common/modules/axios/request'

export default {
    // 레시피코드목록
    async getStdRcpList(): Promise<StdRcpModel[]> {
        const res = await fetch().get('/api/code/stdRcp')
        return res.data
    },
    // 기업코드목록
    async getStdCmpnsList(): Promise<StdCmpnsModel[]> {
        const res = await fetch().get('/api/code/stdCmpns')
        return res.data
    },
    // 생산라인코드목록
    async getStdLineList(params: Params): Promise<StdLineModel[]> {
        const payload: PayloadModel = { query: { cmpCd: params.cmpCd } }
        const res = await fetch().get('/api/code/stdLine', { payload })
        return res.data
    },
    // 생산제품코드목록
    async getStdPrdctList(params: Params): Promise<StdPrdctModel[]> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().get('/api/code/stdPrdct', { payload })
        return res.data
    },
    // 생산설비코드목록
    async getStdEqpmnList(params: Params): Promise<StdEqpmnModel[]> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().get('/api/code/stdEqpmn', { payload })
        return res.data
    },
    // 알람코드목록
    async getStdAlrList(): Promise<StdAlrModel[]> {
        const res = await fetch().get('/api/code/stdAlr')
        return res.data
    },
    // 장치코드목록
    async getStdDevList(): Promise<StdDevModel[]> {
        const res = await fetch().get('/api/code/stdDev')
        return res.data
    },
    // 생산수주MD코드목록
    async getPrdctnOrdrMmCdList(params: Params): Promise<PrdctnOrdrMmCdModel[]> {
        const { groupSn } = params
        const payload: PayloadModel = { query: { groupSn } }
        const res = await fetch().get('/api/code/prdctnOrdrMmCd', { payload })
        return res.data
    },
    // 생산타입코드목록
    async getPrdTypNoList(params: Params): Promise<PrdTypNoModel[]> {
        const { groupSn } = params
        const payload: PayloadModel = { query: { groupSn } }
        const res = await fetch().get('/api/code/prdctnOrdrMmCd', { payload })
        return res.data
    },
    // 에러레벨코드목록
    async getGrdCdList(): Promise<GrdCdModel[]> {
        const res = await fetch().get('/api/code/grdCd')
        return res.data
    },
    // 조치상황코드목록
    async getClsfCdList(): Promise<ClsfCdModel[]> {
        const res = await fetch().get('/api/code/clsfCd')
        return res.data
    },
    // 이미지목록
    async getImageList(params: Params): Promise<APIResponse> {
        const payload: PayloadModel = { query: params }
        return await fetch().get('/api/fileList', { payload })
    },
    // 이미지삭제
    async imageDelete(params: Params): Promise<boolean> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().delete('/api/deleteFile', { payload })
        return !res.isError
    },
    // 설비별장치코드목록
    async getEqDevCdList(params: Params): Promise<EqDevCdModel[]> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().get('/api/abnormal/policy/eqDevCd', { payload })
        return res.data
    },
    // 코드목록
    async getCdList(params: Params): Promise<CdModel[]> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().get('/api/setting/code/list', { payload })
        return res.data
    },
    // 장치별수치목록
    async getDeviceValueList(params: Params): Promise<OptionModel[]> {
        const payload: PayloadModel = { query: params }
        const res = await fetch().get('/api/abnormal/policy/deviceValueList', { payload })
        return res.data
    }
}
