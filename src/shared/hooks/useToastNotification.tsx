import { useCallback, useEffect, useRef, useState } from 'react'
import Toast from '../components/uikit/toast'
import type {
  NotificationConfigType,
  NotificationItemType,
  PositionType,
} from '../components/uikit/toast/types'
import { POSITION_CSS } from '../components/uikit/toast/constants'

let notificationCount = 0
const generateId = () => `notification-${Date.now()}-${notificationCount++}`

const useToastNotification = (position: PositionType) => {
  const timersRef = useRef(new Map())
  const [notifications, setNotifications] = useState<NotificationItemType[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timerId) => clearTimeout(timerId))
      timers.clear()
    }
  }, [])

  const removeNotification = useCallback((id: string) => {
    const timerId = timersRef.current.get(id)

    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    )
    if (timerId) {
      clearTimeout(timerId)
      timersRef.current.delete(id)
    }
  }, [])

  const triggerNotification = useCallback(
    (notificationConfig: NotificationConfigType) => {
      const id = generateId()
      setNotifications((prev) => [...prev, { id, ...notificationConfig }])

      const timerId = setTimeout(() => {
        removeNotification(id)
      }, notificationConfig.duration)

      timersRef.current.set(id, timerId)
    },
    [removeNotification]
  )

  const NotificationComp = notifications.length ? (
    <div style={POSITION_CSS[position]}>
      {notifications.map((notificationConfig) => (
        <Toast
          key={notificationConfig.id}
          type={notificationConfig.type}
          text={notificationConfig.text}
          animation={notificationConfig.animation}
          onClose={() => removeNotification(notificationConfig.id)}
        />
      ))}
    </div>
  ) : null

  return { NotificationComp, triggerNotification }
}

export default useToastNotification
