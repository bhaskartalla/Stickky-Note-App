import AddButton from './AddButton'
import { colors as colorsData } from '@/src/shared/utils'
import Color from './Color'
import type { ColorType } from '@/types'
import styles from './Controls.module.css'

const Controls = () => {
  const colors: ColorType[] = colorsData

  return (
    <div
      id='controls-main'
      className={styles.controls_main}
    >
      <div
        id='controls'
        className={styles.controls}
      >
        <AddButton />
        {colors.map((color) => (
          <Color
            key={color.id}
            color={color}
          />
        ))}
      </div>
    </div>
  )
}
export default Controls
