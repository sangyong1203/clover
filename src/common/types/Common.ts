export type Union<T> = T[keyof T]

export type FcmType = 'fcm' | 'socket' | 'none'
export type LocaleCode = 'ko' | 'en'

export const CRUD_TYPE = {
  CREATE: 'DATA_FLAG_C',
  READ: 'DATA_FLAG_R',
  UPDATE: 'DATA_FLAG_U',
  DELETE: 'DATA_FLAG_D',
} as const
export type CrudType = Union<typeof CRUD_TYPE>

export const BUTTON_TYPE = {
  저장: 'save',
  취소: 'cancel',
  삭제: 'delete',
  목록: 'goList',
  등록: 'register',
  수정: 'update',
  선택삭제: 'deleteSelection',
} as const
export type ButtonType = Union<typeof BUTTON_TYPE>

export const SIZE = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const
export type Size = Union<typeof SIZE>

export const IMAGE_RATIO = {
  일대일: '1',
  십육대구: '16/9',
  사대삼: '4/3',
} as const
export type ImageRatio = Union<typeof IMAGE_RATIO>
