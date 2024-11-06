import { defineStore } from 'pinia'
import type { EventType, GlobalAppState } from '@/stores/global_app/Type'
import { isNil } from 'lodash'
export const useGlobalAppStore = defineStore('globalApp', {
  state: (): GlobalAppState => ({
    progress: false,
    percentCompleted: 0,
    editMode: false,
    endPointUrl: '',
    unreadAlarmCount: 0,
    eventBus: new Map(),
  }),
  getters: {},
  actions: {
    setPercentCompleted(value:number){
      this.percentCompleted = value
    },
    setProgress(value:boolean){
      this.progress = value
    },
    onEditMode() {
      this.editMode = true
    },
    offEditMode() {
      this.editMode = false
    },
    emitEventBus(type: EventType, data: { [key: string]: any }) {
      this.eventBus.set(type, data)
    },
    onEventBus(type: EventType): { [key: string]: any } {
      if (isNil(type) || !this.eventBus.has(type)) return {}
      const data = this.eventBus.get(type)
      this.eventBus.delete(type)
      return data
    },
  },
})
