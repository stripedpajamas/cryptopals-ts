function fixedXor (a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.length !== b.length) {
    throw new Error('inputs are not same length')
  }
  const output = new Uint8Array(a.length)
  for (let i: number = 0; i < a.length; i++) {
    output[i] = a[i] ^ b[i]
  }
  return output
}

export { fixedXor }
