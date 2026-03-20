import SpinnerIcon from '@/src/shared/components/icons/SpinnerIcon'

/**
 * Full-viewport centred spinner overlay.
 * Uses the .main-spinner class from globals.css.
 */
const Spinner = ({
  size = '48',
  color = 'var(--accent)',
}: {
  size?: string
  color?: string
}) => (
  <div className='main-spinner'>
    <SpinnerIcon
      size={size}
      color={color}
    />
  </div>
)

export default Spinner
