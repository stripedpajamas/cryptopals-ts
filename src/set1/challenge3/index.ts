import { fixedXor } from '../challenge2'

interface Frequency {
  [propName: string]: number
}

const ENGLISH = <Frequency>{
  ' ': 0.12902, // space is slightly more common than e
  a: 0.8167,
  b: 0.1492,
  c: 0.2782,
  d: 0.4253,
  e: 0.12702,
  f: 0.2228,
  g: 0.2015,
  h: 0.6094,
  i: 0.6966,
  j: 0.0153,
  k: 0.0772,
  l: 0.4025,
  m: 0.2406,
  n: 0.6749,
  o: 0.7507,
  p: 0.1929,
  q: 0.0095,
  r: 0.5987,
  s: 0.6327,
  t: 0.9056,
  u: 0.2758,
  v: 0.0978,
  w: 0.2360,
  x: 0.0150,
  y: 0.1974,
  z: 0.0074
}

function getEnglishness(input: string): number {
  const s = input.toLowerCase()
  // determine letter counts
  interface LetterData {
    count: number
    frequency: number
  }
  interface StringData {
    [propName: string]: LetterData
  }
  const data = <StringData>{}

  for (let i: number = 0; i < s.length; i++) {
    if (data[s[i]]) {
      data[s[i]].count++
      data[s[i]].frequency = data[s[i]].count / s.length
    } else {
      data[s[i]] = {
        count: 1,
        frequency: 1 / s.length
      }
    }
  }

  // determine difference of this string's letter frequencies to english
  const score: number = Object.keys(data).reduce((acc, letter) => {
    if (ENGLISH[letter]) {
      const difference = Math.abs(data[letter].frequency - ENGLISH[letter])
      return acc - difference
    } else {
      // not an english letter, but could be punctuation
      return acc - 5 // arbitrarily penalizing
    }
  }, 100)
  return score
}

function singleByteXorCrack (ciphertext: Uint8Array): string {
  // xor ciphertext with each possible key (byte)
  // keep track of the englishness of the result
  // return the highest english score
  let winner: string
  let highScore: number = 0
  for (let i: number = 0; i < 255; i++) {
    const key = new Uint8Array(ciphertext.length).fill(i)
    const plaintextBytes = fixedXor(ciphertext, key)
    const plaintext = plaintextBytes.reduce((acc, byte) => {
      return acc + String.fromCharCode(byte)
    }, '')
    const score = getEnglishness(plaintext)
    if (score > highScore) {
      highScore = score
      winner = plaintext
    }
  }
  return winner
}

export { getEnglishness, singleByteXorCrack }
