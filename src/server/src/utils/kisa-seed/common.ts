/* eslint-disable no-bitwise */

class Common {
  public static readonly BIG_ENDIAN: number = 0;
  public static readonly LITTLE_ENDIAN: number = 1;

  public static arraycopy(dst: Uint8Array, src: Uint8Array, length: number): void {
    for (let i = 0; i < length; i++) {
      dst[i] = src[i];
    }
  }

  public static arraycopy_offset(
    dst: Uint8Array,
    dst_offset: number,
    src: Uint8Array,
    src_offset: number,
    length: number,
  ): void {
    for (let i = 0; i < length; i++) {
      dst[dst_offset + i] = src[src_offset + i];
    }
  }

  public static arrayinit(dst: Uint8Array, value: number, length: number): void {
    for (let i = 0; i < length; i++) {
      dst[i] = value;
    }
  }

  public static arrayinit_offset(dst: Uint8Array, dst_offset: number, value: number, length: number): void {
    for (let i = 0; i < length; i++) {
      dst[dst_offset + i] = value;
    }
  }

  public static memcpy_1(dst: number[], src: Uint8Array, length: number, endian: number): void {
    const iLen = Math.floor(length / 4);
    for (let i = 0; i < iLen; i++) {
      Common.byte_to_int_1(dst, i, src, i * 4, endian);
    }
  }

  public static memcpy_2(dst: number[], src: number[], src_offset: number, length: number): void {
    const iLen = Math.floor(length / 4) + (length % 4 !== 0 ? 1 : 0);
    for (let i = 0; i < iLen; i++) {
      dst[i] = src[src_offset + i];
    }
  }

  public static set_byte_for_int(dst: number[], b_offset: number, value: number, endian: number): void {
    let shift_value: number;
    let mask_value: number;
    let mask_value2: number;
    let value2: number;
    if (endian === Common.BIG_ENDIAN) {
      shift_value = (3 - (b_offset % 4)) * 8;
      mask_value = 0xff << shift_value;
      mask_value2 = ~mask_value;
      value2 = (value & 0xff) << shift_value;
      dst[Math.floor(b_offset / 4)] = (dst[Math.floor(b_offset / 4)] & mask_value2) | (value2 & mask_value);
    } else {
      shift_value = (b_offset % 4) * 8;
      mask_value = 0xff << shift_value;
      mask_value2 = ~mask_value;
      value2 = (value & 0xff) << shift_value;
      dst[Math.floor(b_offset / 4)] = (dst[Math.floor(b_offset / 4)] & mask_value2) | (value2 & mask_value);
    }
  }

  public static get_byte_for_int(src: number[], b_offset: number, endian: number): number {
    let shift_value: number;
    let mask_value: number;
    let value: number;
    if (endian === Common.BIG_ENDIAN) {
      shift_value = (3 - (b_offset % 4)) * 8;
      mask_value = 0xff << shift_value;
      value = (src[Math.floor(b_offset / 4)] & mask_value) >> shift_value;
      return value & 0xff;
    }
    shift_value = (b_offset % 4) * 8;
    mask_value = 0xff << shift_value;
    value = (src[Math.floor(b_offset / 4)] & mask_value) >> shift_value;
    return value & 0xff;
  }

  public static get_bytes_for_ints(src: number[], offset: number, endian: number): Uint8Array {
    const iLen = src.length - offset;
    const result = new Uint8Array(iLen * 4);
    for (let i = 0; i < iLen; i++) {
      Common.int_to_byte(result, i * 4, src, offset + i, endian);
    }
    return result;
  }

  public static byte_to_int_1(
    dst: number[],
    dst_offset: number,
    src: Uint8Array,
    src_offset: number,
    endian: number,
  ): void {
    if (endian === Common.BIG_ENDIAN) {
      dst[dst_offset] =
        (src[src_offset] << 24) | (src[src_offset + 1] << 16) | (src[src_offset + 2] << 8) | src[src_offset + 3];
    } else {
      dst[dst_offset] =
        src[src_offset] | (src[src_offset + 1] << 8) | (src[src_offset + 2] << 16) | (src[src_offset + 3] << 24);
    }
  }

  public static byte_to_int_2(src: Uint8Array, src_offset: number, endian: number): number {
    if (endian === Common.BIG_ENDIAN) {
      return (src[src_offset] << 24) | (src[src_offset + 1] << 16) | (src[src_offset + 2] << 8) | src[src_offset + 3];
    }
    return src[src_offset] | (src[src_offset + 1] << 8) | (src[src_offset + 2] << 16) | (src[src_offset + 3] << 24);
  }

  public static int_to_byte(
    dst: Uint8Array,
    dst_offset: number,
    src: number[],
    src_offset: number,
    endian: number,
  ): void {
    Common.int_to_byte_unit(dst, dst_offset, src[src_offset], endian);
  }

  public static int_to_byte_unit(dst: Uint8Array, dst_offset: number, src: number, endian: number): void {
    if (endian === Common.BIG_ENDIAN) {
      dst[dst_offset] = (src >> 24) & 0xff;
      dst[dst_offset + 1] = (src >> 16) & 0xff;
      dst[dst_offset + 2] = (src >> 8) & 0xff;
      dst[dst_offset + 3] = src & 0xff;
    } else {
      dst[dst_offset] = src & 0xff;
      dst[dst_offset + 1] = (src >> 8) & 0xff;
      dst[dst_offset + 2] = (src >> 16) & 0xff;
      dst[dst_offset + 3] = (src >> 24) & 0xff;
    }
  }

  public static URShift(x: number, n: number): number {
    if (n === 0) return x;
    if (n >= 32) return 0;
    const v = x >> n;
    const v_mask = ~(0x80000000 >> (n - 1));
    return v & v_mask;
  }

  static readonly INT_RANGE_MAX: number = 2 ** 32;

  public static intToUnsigned(x: number): number {
    if (x >= 0) return x;
    return x + Common.INT_RANGE_MAX;
  }

  public static Padding(pbData: Uint8Array, padData: Uint8Array, length: number): number {
    const padvalue = 16 - (length % 16);
    for (let i = 0; i < length; i++) {
      padData[i] = pbData[i];
    }
    let i = length;
    do {
      padData[i] = padvalue;
      i++;
    } while (i % 16 !== 0);
    return i;
  }

  public static BLOCK_XOR_PROPOSAL(
    OUT_VALUE: number[],
    out_value_offset: number,
    IN_VALUE1: number[],
    in_value1_offset: number,
    IN_VALUE2: number[],
    in_value2_offset: number,
  ): void {
    for (let i = 0; i < 4; i++) {
      OUT_VALUE[out_value_offset + i] =
        (in_value1_offset + i < IN_VALUE1.length ? IN_VALUE1[in_value1_offset + i] : 0) ^
        (in_value2_offset + i < IN_VALUE2.length ? IN_VALUE2[in_value2_offset + i] : 0);
    }
  }

  public static chartoint32(input: Uint8Array, inLen: number, endian: number): number[] {
    let len: number;
    if (inLen % 4 > 0) {
      len = Math.floor(inLen / 4) + 1;
    } else {
      len = inLen / 4;
    }
    const data: number[] = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
      Common.byte_to_int_1(data, i, input, i * 4, endian);
    }
    return data;
  }

  public static int32tochar(input: number[], inLen: number, endian: number): Uint8Array {
    const data: Uint8Array = new Uint8Array(inLen * 4);
    if (endian === Common.BIG_ENDIAN) {
      for (let i = 0; i < data.length; i++) {
        data[i] = (input[Math.floor(i / 4)] >> ((3 - (i % 4)) * 8)) & 0xff;
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        data[i] = (input[Math.floor(i / 4)] >> ((i % 4) * 8)) & 0xff;
      }
    }
    return data;
  }

  public static stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(str);
    return uint8Array;
  }

  public static uint8ArrayToString(uint8Array: Uint8Array): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(uint8Array);
  }

  public static base64ToUint8Array(base64: string): Uint8Array {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
}

export default Common;
