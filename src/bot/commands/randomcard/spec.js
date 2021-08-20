import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import command from './'
import getRawCardData from '~/helpers/getRawCardData'
const randomcard = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/card/'
const ALIASES = [
  { keyword: 'struct', key: 'type', value: 'structure' },
  { keyword: 'ic', key: 'faction', value: 'ironclad' },
  { keyword: 'red', key: 'faction', value: 'ironclad' },
  { keyword: 'sf', key: 'faction', value: 'shadowfen' },
  { keyword: 'green', key: 'faction', value: 'shadowfen' },
  { keyword: 'w', key: 'faction', value: 'winter' },
  { keyword: 'wp', key: 'faction', value: 'winter' },
  { keyword: 'blue', key: 'faction', value: 'winter' },
  { keyword: 'sw', key: 'faction', value: 'swarm' },
  { keyword: 'yellow', key: 'faction', value: 'swarm' },
]

const getCardId = url =>
  url ? url.replace(BASE_URL, '').replace('/display', '') : url

describe('Bot — !randomcard', () => {
  it('should return a random card for an empty search', () => {
    expect(randomcard('')).to.contain(BASE_URL)
  })

  it('should handle factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      const id = getCardId(randomcard(faction))
      expect(getRawCardData(id).faction).to.equal(faction)
    })
  })

  it('should handle negative factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      const id = getCardId(randomcard('!' + faction))
      expect(getRawCardData(id).faction).to.not.equal(faction)
    })
  })

  it('should handle types', () => {
    Object.keys(TYPES).forEach(type => {
      const id = getCardId(randomcard(type))
      expect(getRawCardData(id).type).to.equal(type)
    })
  })

  it('should handle negative types', () => {
    Object.keys(TYPES).forEach(type => {
      const id = getCardId(randomcard('!' + type))
      expect(getRawCardData(id).type).to.not.equal(type)
    })
  })

  it('should handle races', () => {
    Object.keys(RACES)
      .filter(race => race === 'Ancient')
      .forEach(race => {
        const id = getCardId(randomcard(race))
        expect(getRawCardData(id).race).to.equal(race)
      })
  })

  it('should handle negative races', () => {
    Object.keys(RACES).forEach(race => {
      const id = getCardId(randomcard('!' + race))
      expect(getRawCardData(id).race).to.not.equal(race)
    })
  })

  it('should handle rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      const id = getCardId(randomcard(rarity))
      expect(getRawCardData(id).rarity).to.equal(rarity)
    })
  })

  it('should handle negative rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      const id = getCardId(randomcard('!' + rarity))
      expect(getRawCardData(id).rarity).to.not.equal(rarity)
    })
  })

  it('should handle hero', () => {
    const id = getCardId(randomcard('hero'))
    expect(getRawCardData(id).hero).to.equal(true)
  })

  it('should handle negative hero', () => {
    const id = getCardId(randomcard('!hero'))
    expect(getRawCardData(id).hero).to.equal(undefined)
  })

  it('should handle elder', () => {
    const id = getCardId(randomcard('elder'))
    expect(getRawCardData(id).elder).to.equal(true)
  })

  it('should handle negative elder', () => {
    const id = getCardId(randomcard('!elder'))
    expect(getRawCardData(id).elder).to.equal(undefined)
  })

  it('should handle aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard(test.keyword))
      expect(getRawCardData(id)[test.key]).to.equal(test.value)
    })
  })

  it('should handle negative aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard('!' + test.keyword))
      expect(getRawCardData(id)[test.key]).to.not.equal(test.value)
    })
  })

  it('should handle multi-searches', () => {
    const id = getCardId(randomcard('ic spell rare'))
    const card = getRawCardData(id)

    expect(card.faction).to.equal('ironclad')
    expect(card.type).to.equal('spell')
    expect(card.rarity).to.equal('rare')
  })

  it('should ignore unknown terms', () => {
    const output = getCardId(randomcard('ic foo spell bar rare'))

    expect(output).to.contain('~~foo~~')
    expect(output).to.contain('~~bar~~')
  })

  it('should return nothing for unknown search', () => {
    expect(getCardId(randomcard('foo bar'))).to.equal(undefined)
    expect(getCardId(randomcard('foo bar'))).to.equal(undefined)
  })
})
