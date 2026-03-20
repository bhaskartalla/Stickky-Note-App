import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'outline'

type ButtonSize = 'default' | 'sm' | 'full'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  children: ReactNode
}

const Button = ({
  variant = 'primary',
  size = 'default',
  isLoading = false,
  loadingText,
  leftIcon,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) => {
  const cls = [
    styles.btn,
    styles[`btn_${variant}`],
    size !== 'default' ? styles[`btn_${size}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={cls}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className={styles.loading_content}>
          <span
            className={styles.spinner}
            aria-hidden='true'
          />
          {loadingText ?? children}
        </span>
      ) : (
        <>
          {leftIcon && <span className={styles.left_icon}>{leftIcon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
export default Button
