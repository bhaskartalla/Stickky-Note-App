export type NotificationTypesType = 'success' | 'info' | 'warning' | 'error'

export type AnimationType = 'pop' | 'fade' | 'slideLeft' | 'slideRight'

export type PositionType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type NotificationConfigType = {
  duration: number
  text: string
  type: NotificationTypesType
  animation: AnimationType
}

export type NotificationItemType = NotificationConfigType & {
  id: string
}
