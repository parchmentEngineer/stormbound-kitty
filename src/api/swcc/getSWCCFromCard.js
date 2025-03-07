import { getEntry } from '~/helpers/sanity'
import { FIELDS, MAPPER } from './utils'

const getSWCCFromCard = async ({ id, isPreview } = {}) => {
  const card = await getEntry({
    conditions: ['_type == "SWCC"', 'winner.id == $id'],
    fields: FIELDS,
    params: { id },
    options: { isPreview },
  })

  return card ? MAPPER(card) : null
}

export default getSWCCFromCard
