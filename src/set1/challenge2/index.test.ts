import test from 'ava'
import * as Challenge1 from '../challenge1'
import * as Challenge2 from './'

test('fixedXor: xor two equal length buffers', (t) => {
  const input1 = Challenge1.hexToBuff('1c0111001f010100061a024b53535009181c')
  const input2=  Challenge1.hexToBuff('686974207468652062756c6c277320657965')
  const expected = Challenge1.hexToBuff('746865206b696420646f6e277420706c6179')

  const output = Challenge2.fixedXor(input1, input2)

  t.deepEqual(output, expected)
})

test('fixedXor: throws if inputs are not same length', (t) => {
  const input1 = new Uint8Array(4)
  const input2 = new Uint8Array(5)
  t.throws(() => Challenge2.fixedXor(input1, input2))
})
