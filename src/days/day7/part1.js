import { sum } from "../../helpers"

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const typeValues = {
  five: 600,
  four: 500,
  full: 400,
  three: 300,
  twoPair: 200,
  pair: 100,
  highCard: 50
}

const countCards = cards => {
  const count = {}

  cards.forEach(card => {
    const x = count[card] ?? 0
    count[card] = x + 1
  })

  return count
}

const isFiveOfAKind = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  return differentCards.length === 1
}

const isFourOfAKind = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  return differentCards.reduce((truth, card) => truth || count[card] === 4, false)
}

const isFullHouse = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  if (differentCards > 2) return false

  if (count[differentCards[0]] === 2 && count[differentCards[1]] === 3) return true
  if (count[differentCards[0]] === 3 && count[differentCards[1]] === 2) return true

  return false
}

const isTwoPair = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  const pairs = differentCards.reduce((p, card) => count[card] === 2 ? p + 1 : p, false)
  return pairs === 2
}

const isPair = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  const pairs = differentCards.reduce((p, card) => count[card] === 2 ? p + 1 : p, false)
  return pairs === 1
}

const isThreeOfAKind = cards => {
  const count = countCards(cards)
  const differentCards = Object.keys(count)

  return differentCards.reduce((truth, card) => truth || count[card] === 3, false)
}

const determineType = hand => {
  const cards = hand.split('')

  if (isFiveOfAKind(cards)) return 'five'
  if (isFourOfAKind(cards)) return 'four'
  if (isFullHouse(cards)) return 'full'
  if (isThreeOfAKind(cards)) return 'three'
  if (isTwoPair(cards)) return 'twoPair'
  if (isPair(cards)) return 'pair'

  return 'highCard'
}

// Wrong: 250562487
// Wrong: 250620301
// Wrong: 251165055
//        251216224

export const part1 = (data) => {
  const lines = data.trim().split('\n')
  const handsAndBids = lines.map(x => x.split(' '))

  const types = handsAndBids
    .map(([hand, bid]) => {
      const type = determineType(hand)
      return {
        hand,
        bid,
        type,
        typeValue: typeValues[type]
      }
    })
    .sort((a, b) => {
      const av = typeValues[a.type]
      const bv = typeValues[b.type]

      if (av === bv) {
        for (let i = 0; i < a.hand.length; i++) {
          const acv = cardValues[a.hand[i]]
          const bcv = cardValues[b.hand[i]]

          console.log(a.hand[i], b.hand[i], acv, bcv)

          if (acv === bcv) continue

          return acv - bcv
        }
      }

      return av - bv
    })
    .map((hand, i) => {
      const rank = i + 1
      return { ...hand, rank, value: hand.bid * rank }
    })

  const result = types
    .map(hand => hand.value)
    .reduce(sum)

  // return types.map(x => `${x.hand} [${x.type}]`)

  return { result, types, lines, handsAndBids }
}