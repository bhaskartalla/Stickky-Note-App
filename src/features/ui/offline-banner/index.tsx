import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { OfflineIcon } from '@/src/shared/components/icons'

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.icon_wrap}>
          <div className={styles.icon_circle}>
            <OfflineIcon />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.title}>You're offline</div>
          <p className={styles.subtitle}>
            No internet connection detected.
            <br />
            Please check your connection and try again.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btn_primary}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <div className={styles.status}>
            <span className={styles.dot} />
            Waiting for connection…
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfflineBanner
