// types.d.ts (in project root)

declare module '@/fakeData' {
  export interface FakeDataType {
    $id: number
    body: string
    colors: string
    position: string
  }

  export const fakeData: FakeDataType[]
}

export interface FakeDataType {
  $id: number
  body: string
  colors: string
  position: string
}
