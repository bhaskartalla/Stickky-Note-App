import { Component, type ReactNode, type ErrorInfo } from 'react'
import styles from './Errorboundary.module.css'

interface ErrorFallbackProps {
  error?: Error | null
  onReset?: () => void
}

export const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => (
  <div className={`${styles.wrapper} grid_bg`}>
    <div className={styles.card}>
      <div className={styles.icon_wrap}>
        <div className={styles.icon}>⚡</div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.description}>
          An unexpected error occurred in the application. Your notes are safe —
          this is a display issue only.
        </p>

        {error && (
          <details className={styles.details}>
            <summary className={styles.details_summary}>Error details</summary>
            <pre className={styles.error_text}>{error.message}</pre>
          </details>
        )}
      </div>

      <div className={styles.actions}>
        {onReset && (
          <button
            className={styles.btn_ghost}
            onClick={onReset}
            type='button'
          >
            Try again
          </button>
        )}
        <button
          className={styles.btn_primary}
          onClick={() => window.location.reload()}
          type='button'
        >
          Reload page
        </button>
      </div>
    </div>
  </div>
)

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static Fallback = ErrorFallback

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      console.log('🚀 ~ ErrorBoundary ~ render ~  :', {
        a: this.props.fallback,
      })

      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
