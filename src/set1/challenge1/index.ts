const HEX_CHAR_SET = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
const B64_CHAR_SET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']
const B64_PADDING = '='

function hexToBuff (s: string): Uint8Array {
  // confirm that we are dealing with an even length str of hex
  if (s.length % 2 !== 0) {
    throw new Error('invalid input (length % 2 !== 0)')
  }
  // create a buffer to work with
  const a = new Uint8Array(s.length / 2)
  // copy the hex string into the buffer as bytes
  let arrIdx = 0
  let strIdx = 0
  while (strIdx < s.length) {
    const byteStr = s.slice(strIdx, strIdx + 2)
    const byte = parseInt(byteStr, 16)
    a[arrIdx] = byte

    strIdx += 2
    arrIdx++
  }
  return a
}

function buffToHex (input: Uint8Array): string {
  let output = ''
  // iterate through bytes
  for (let i: number = 0; i < input.length; i++) {
    // derive two 4-bit indices from the byte
    const idx1 = input[i] >> 0x4
    const idx2 = input[i] & 0xF
    // append characters at those indices to output
    output += HEX_CHAR_SET[idx1]
    output += HEX_CHAR_SET[idx2]
  }
  return output
}

function buffToBase64 (input: Uint8Array): string {
  let output = ''

  // iterate through 24-bit sections (3 bytes)
  for (let i: number = 0; i < input.length; i += 3) {
    let slice = new Uint8Array(3)
    let padding = 0
    slice[0] = input[i]
    if (typeof input[i + 1] !== 'undefined') {
      slice[1] = input[i + 1]
    } else {
      padding++
    }
    if (typeof input[i + 2] !== 'undefined') {
      slice[2] = input[i + 2]
    } else {
      padding++
    }

    // derive 4 6-bit indices
    const idx1 = (slice[0] >> 0x2) & 0x3F
    const idx2 = ((slice[0] & 0x3) << 0x4) | ((slice[1] >> 0x4) & 0xF)
    const idx3 = ((slice[1] << 2) & 0x3C) | ((slice[2] >> 0x6) & 0x3)
    const idx4 = slice[2] & 0x3F

    // get the 4 characters at these indices in the b64 char set
    output += B64_CHAR_SET[idx1]
    output += B64_CHAR_SET[idx2]
    output += padding > 1 ? B64_PADDING : B64_CHAR_SET[idx3]
    output += padding ? B64_PADDING : B64_CHAR_SET[idx4]
  }
  return output
}

function hexToBase64 (s: string): string {
  // convert hex to buffer
  const buff: Uint8Array = hexToBuff(s)
  // convert buffer to base64
  const output: string = buffToBase64(buff)
  return output
}

export {
  hexToBuff,
  buffToHex,
  buffToBase64,
  hexToBase64
}
