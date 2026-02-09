// types.d.ts (in project root)

declare module '@/fakeData' {
  export type NoteDataType = {
    $id: number
    body: string
    colors: string
    position: string
  }

  export const fakeData: NoteDataType[]
}

export type NoteDataType = {
  $id: string
  body: string
  colors: string
  position: string
}

export type MousePointerPosType = { x: number; y: number }

export type CollectionType = {
  name: string
  tableId: string
  dbId: string
}
