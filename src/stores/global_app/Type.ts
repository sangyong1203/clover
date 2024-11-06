import type { Union } from '@/common/types/Common'

export interface GlobalAppState {
  progress: boolean // progress bar 사용여부
  percentCompleted: number // 파일 업로드 진행율
  editMode: boolean
  endPointUrl: string
  unreadAlarmCount: number
  eventBus: Map<EventType, any>
}

export const GLOBAL_EVENT_TYPE = {
  SHARE_BBS: 'share_bbs',
} as const

export type EventType = Union<typeof GLOBAL_EVENT_TYPE>
