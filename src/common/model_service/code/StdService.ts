import api from './SelfApi'
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

export class StdService {
    stdRcpList: StdRcpModel[]
    stdCmpnsList: StdCmpnsModel[]
    stdLineList: StdLineModel[]
    stdPrdctList: StdPrdctModel[]
    stdEqpmnList: StdEqpmnModel[]
    stdAlrList: StdAlrModel[]
    stdDevList: StdDevModel[]
    prdctnOrdrMmCdList: PrdctnOrdrMmCdModel[]
    prdTypNoList: PrdTypNoModel[]
    grdCdList: GrdCdModel[]
    clsfCdList: ClsfCdModel[]
    eqDevCdList: EqDevCdModel[]
    errTypeList: CdModel[]
    deviceValueList: OptionModel[]

    constructor() {
        this.stdRcpList = []
        this.stdCmpnsList = []
        this.stdLineList = []
        this.stdPrdctList = []
        this.stdEqpmnList = []
        this.stdAlrList = []
        this.stdDevList = []
        this.prdctnOrdrMmCdList = []
        this.prdTypNoList = []
        this.grdCdList = []
        this.clsfCdList = []
        this.eqDevCdList = []
        this.errTypeList = []
        this.deviceValueList = []
    }

    async setStdRcpList() {
        const res = await api.getStdRcpList()
        this.stdRcpList = res
    }
    async setStdCmpnsList() {
        const res = await api.getStdCmpnsList()
        this.stdCmpnsList = res
    }
    async setStdLineList(params: { cmpCd: string }) {
        const res = await api.getStdLineList(params)
        this.stdLineList = res.map(item => {
            item.lineName = item.cmpLineId.concat(' - ', item.lineCmnt)
            return item
        })
    }
    async setStdPrdctList(params: { cmpCd: string; cmpLineId: string }) {
        const res = await api.getStdPrdctList(params)
        this.stdPrdctList = res
    }
    async setStdEqpmnList(params: { cmpCd: string; cmpLineId: string }) {
        const res = await api.getStdEqpmnList(params)
        this.stdEqpmnList = res.map(item => {
            item.eqName = item.cmpEqId.concat(' - ', item.prcCmnt)
            return item
        })
    }
    async setStdAlrList() {
        const res = await api.getStdAlrList()
        this.stdAlrList = res
    }
    async setStdDevList() {
        const res = await api.getStdDevList()
        this.stdDevList = res
    }
    async setPrdctnOrdrMmCdList(params: { groupSn: number }) {
        const res = await api.getPrdctnOrdrMmCdList(params)
        this.prdctnOrdrMmCdList = res
    }
    async setPrdTypNoList(params: { groupSn: number }) {
        const res = await api.getPrdTypNoList(params)
        this.prdTypNoList = res
    }
    async setGrdCdList() {
        const res = await api.getGrdCdList()
        this.grdCdList = res
    }
    async setClsfCdList() {
        const res = await api.getClsfCdList()
        this.clsfCdList = res
    }
    async setEqDevCdList(params: { cmpCd: string; cmpLineId: string; cmpEqId: string }) {
        const res = await api.getEqDevCdList(params)
        this.eqDevCdList = res
    }
    async getImageList(params: { seNm: String; rfrncNo: number }): Promise<any[]> {
        const res = await api.getImageList(params)
        if (res.isError) return []
        return res.data ?? []
    }
    async imageDelete(params: { sn: number }): Promise<boolean> {
        return await api.imageDelete(params)
    }
    async setErrTypeList(params: { groupCode: string }) {
        const res = await api.getCdList(params)
        this.errTypeList = res
    }
    async setDeviceValueList(params: { devCd: string }) {
        const res = await api.getDeviceValueList(params)
        this.deviceValueList = res
    }
}
