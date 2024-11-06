import { defineStore } from 'pinia'
import { ref } from 'vue'
type LangType = {
    page: string
    labelList: {
        key: string
        value: string
    }[]
}
export const useLangStore = defineStore(
    'langStore',
    () => {
        const lang = ref<any>({})
        function setLang(langData: LangType[]) {
            lang.value = langData.reduce((acc:any, { page, labelList }) => {
                acc[page] = labelList.reduce((labelAcc:any, { key, value }) => {
                    labelAcc[key] = value
                    return labelAcc
                }, {})
                return acc
            }, {})
        }
        return { lang, setLang }
    },
    { persist: true },
)
