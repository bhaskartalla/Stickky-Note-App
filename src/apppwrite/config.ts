import type { CollectionType } from '@/types'
import { Client, TablesDB } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID)

const tablesDB = new TablesDB(client)

const collections: CollectionType[] = [
  {
    name: 'notes',
    tableId: import.meta.env.VITE_TABLE_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
]

export { client, tablesDB, collections }
