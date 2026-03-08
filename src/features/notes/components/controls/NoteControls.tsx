import AddButton from './AddButton'
import colorsData from '@/src/shared/utils/colors.json'
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
