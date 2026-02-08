// src/pages/NotesPage/index.tsx

// import type { FakeDataType } from '../../../types'
import type { FakeDataType } from '@/types'
import { fakeData } from '@/src/fakeData'

const index = () => {
  console.log('🚀 ~ fakeData:', fakeData)

  // Now you have full type safety!
  fakeData.forEach((item: FakeDataType) => {
    console.log(item.$id)
    console.log(item.body)
    console.log(item.colors)
  })

  return <div>Notes Page</div>
}

export default index
