import type { CollectionType } from '@/types'
import { tablesDB } from './config'
import type { Models } from 'appwrite'

type RowListResponse = Models.RowList<Models.DefaultRow>

type WrapperFunctionType = {
  listRows: () => Promise<RowListResponse>
}

const collections: CollectionType[] = [
  {
    name: 'notes',
    tableId: import.meta.env.VITE_TABLE_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
]

type DBType = Record<string, WrapperFunctionType>

const db: DBType = {}

collections.forEach((collection: CollectionType) => {
  db[collection.name] = {
    listRows: async () => {
      return await tablesDB.listRows({
        databaseId: collection.dbId,
        tableId: collection.tableId,
      })
    },
  }
})

export { db }
