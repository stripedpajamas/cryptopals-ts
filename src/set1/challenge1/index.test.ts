import test from 'ava'
import * as Challenge1 from './'

test('hexToBase64: converts hex to base64', (t) => {
  const input = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
  const expected = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'

  const output = Challenge1.hexToBase64(input)

  t.is(output, expected)
})

test('buffToHex: converts bytes to hex', (t) => {
  const input = new Uint8Array([104, 101, 108, 108, 111])
  const expected = '68656c6c6f'

  const output = Challenge1.buffToHex(input)

  t.is(output, expected)
})

test('buffToBase64: converts bytes to base64', (t) => {
  let input = new Uint8Array([104, 101, 108, 108, 111])
  let expected = 'aGVsbG8='

  let output = Challenge1.buffToBase64(input)

  t.is(output, expected)

  input = new Uint8Array([104, 101, 108, 108])
  expected = 'aGVsbA=='

  output = Challenge1.buffToBase64(input)

  t.is(output, expected)
})

test('hexToBuff: converts hex string to raw bytes', (t) => {
  const input = '68656c6c6f'
  const expected = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f])

  const output = Challenge1.hexToBuff(input)

  t.deepEqual(output, expected)
})

test('hexToBuff: throws on invalid hex string', (t) => {
  const input = '68656c6c6fa' // odd number of characters
  t.throws(() => Challenge1.hexToBuff(input))
})
