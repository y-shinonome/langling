import { createClient } from 'contentful'

const config = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
}

const client = createClient(config)

export const getAnglingFields = async () => {
  const response = await client.getEntries({
    content_type: 'anglingFields',
  })
  return response.items
}

export const getAnglingFieldIds = async () => {
  const response = await client.getEntries({
    content_type: 'anglingFields',
    select: 'sys.id',
  })
  return response.items
}

export const getAnglingField = async (id: string | undefined) => {
  const response = await client.getEntries({
    content_type: 'anglingFields',
    'sys.id': id,
  })
  return response.items
}