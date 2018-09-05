import test from 'ava'
import { hexToBuff } from '../challenge1'
import * as Challenge3 from './'

test('getEnglishness: scores english', (t) => {
  const english = 'The quick brown fox jumps over the lazy dog.'
  const notEnglish = 'Vo eda riba verijm zdrovie, ktor domof ne kai.'

  const scoreEnglish = Challenge3.getEnglishness(english)
  const scoreNotEnglish = Challenge3.getEnglishness(notEnglish)

  t.true(scoreEnglish > scoreNotEnglish)
})

test('singleByteXorCrack: finds likely plaintext', (t) => {
  const input = hexToBuff('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736')
  const expected = 'Cooking MC\'s like a pound of bacon'
  const output = Challenge3.singleByteXorCrack(input)

  t.is(output, expected)
})
