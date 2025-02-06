/* eslint-disable no-bitwise */

import Common from './common';
import { defaults } from './const';
import { KISA_ENC_DEC, KISA_SEED_INFO, KISA_SEED_KEY } from './seed';

export class KISA_SEED_CBC {
  private static ENDIAN: number = Common.BIG_ENDIAN;

  private static readonly BLOCK_SIZE_SEED: number = 16;
  private static readonly BLOCK_SIZE_SEED_INT: number = 4;

  private static Subst(A: number): number {
    return (
      defaults.SS0[A & 0x0ff] ^
      defaults.SS1[(A >> 8) & 0x0ff] ^
      defaults.SS2[(A >> 16) & 0x0ff] ^
      defaults.SS3[(A >> 24) & 0x0ff]
    );
  }

  private static SeedRound(
    T: number[],
    LR: number[],
    L0: number,
    L1: number,
    R0: number,
    R1: number,
    K: number[],
    K_offset: number,
  ): void {
    T[0] = LR[R0] ^ K[K_offset + 0];
    T[1] = LR[R1] ^ K[K_offset + 1];
    T[1] ^= T[0];
    T[1] = KISA_SEED_CBC.Subst(T[1]);
    T[0] += T[1];
    T[0] = KISA_SEED_CBC.Subst(T[0]);
    T[1] += T[0];
    T[1] = KISA_SEED_CBC.Subst(T[1]);
    T[0] += T[1];
    LR[L0] ^= T[0];
    LR[L1] ^= T[1];
  }

  private static EndianChange(dwS: number): number {
    return (
      (((dwS << 8) | ((dwS >> (32 - 8)) & 0x000000ff)) & 0x00ff00ff) |
      (((dwS << 24) | ((dwS >> (32 - 24)) & 0x00ffffff)) & 0xff00ff00)
    );
  }

  private static RoundKeyUpdate0(T: number[], K: number[], K_offset: number, ABCD: number[], KC: number): void {
    T[0] = ABCD[0] + ABCD[2] - KC;
    T[1] = ABCD[1] + KC - ABCD[3];
    K[K_offset + 0] = KISA_SEED_CBC.Subst(T[0]);
    K[K_offset + 1] = KISA_SEED_CBC.Subst(T[1]);
    T[0] = ABCD[0];
    ABCD[0] = ((ABCD[0] >> 8) & 0x00ffffff) ^ (ABCD[1] << 24);
    ABCD[1] = ((ABCD[1] >> 8) & 0x00ffffff) ^ (T[0] << 24);
  }

  private static RoundKeyUpdate1(T: number[], K: number[], K_offset: number, ABCD: number[], KC: number): void {
    T[0] = ABCD[0] + ABCD[2] - KC;
    T[1] = ABCD[1] + KC - ABCD[3];
    K[K_offset + 0] = KISA_SEED_CBC.Subst(T[0]);
    K[K_offset + 1] = KISA_SEED_CBC.Subst(T[1]);
    T[0] = ABCD[2];
    ABCD[2] = (ABCD[2] << 8) ^ ((ABCD[3] >> 24) & 0x000000ff);
    ABCD[3] = (ABCD[3] << 8) ^ ((T[0] >> 24) & 0x000000ff);
  }

  private static readonly LR_L0: number = 0;
  private static readonly LR_L1: number = 1;
  private static readonly LR_R0: number = 2;
  private static readonly LR_R1: number = 3;

  private static BLOCK_XOR_CBC(
    OUT_VALUE: number[],
    out_value_offset: number,
    IN_VALUE1: number[],
    in_value1_offset: number,
    IN_VALUE2: number[],
    in_value2_offset: number,
  ): void {
    OUT_VALUE[out_value_offset + 0] =
      (in_value1_offset < IN_VALUE1.length ? IN_VALUE1[in_value1_offset + 0] : 0) ^
      (in_value2_offset < IN_VALUE2.length ? IN_VALUE2[in_value2_offset + 0] : 0);
    OUT_VALUE[out_value_offset + 1] =
      (in_value1_offset + 1 < IN_VALUE1.length ? IN_VALUE1[in_value1_offset + 1] : 0) ^
      (in_value2_offset + 1 < IN_VALUE2.length ? IN_VALUE2[in_value2_offset + 1] : 0);
    OUT_VALUE[out_value_offset + 2] =
      (in_value1_offset + 2 < IN_VALUE1.length ? IN_VALUE1[in_value1_offset + 2] : 0) ^
      (in_value2_offset + 2 < IN_VALUE2.length ? IN_VALUE2[in_value2_offset + 2] : 0);
    OUT_VALUE[out_value_offset + 3] =
      (in_value1_offset + 3 < IN_VALUE1.length ? IN_VALUE1[in_value1_offset + 3] : 0) ^
      (in_value2_offset + 3 < IN_VALUE2.length ? IN_VALUE2[in_value2_offset + 3] : 0);
  }

  public static KISA_SEED_Encrypt_Block(
    inData: number[],
    in_offset: number,
    outData: number[],
    out_offset: number,
    ks: KISA_SEED_KEY,
  ): void {
    const LR: number[] = new Array(4); // Input/output values at each rounds
    const T: number[] = new Array(2); // Temporary variables for round function F
    const K: number[] = ks.key_data; // Pointer of round keys

    // Set up input values for first round
    LR[KISA_SEED_CBC.LR_L0] = inData[in_offset + 0];
    LR[KISA_SEED_CBC.LR_L1] = inData[in_offset + 1];
    LR[KISA_SEED_CBC.LR_R0] = inData[in_offset + 2];
    LR[KISA_SEED_CBC.LR_R1] = inData[in_offset + 3];

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_CBC.ENDIAN) {
      LR[KISA_SEED_CBC.LR_L0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L0]);
      LR[KISA_SEED_CBC.LR_L1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L1]);
      LR[KISA_SEED_CBC.LR_R0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R0]);
      LR[KISA_SEED_CBC.LR_R1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R1]);
    }

    for (let i = 0; i < 16; i++) {
      KISA_SEED_CBC.SeedRound(
        T,
        LR,
        i % 2 === 0 ? KISA_SEED_CBC.LR_L0 : KISA_SEED_CBC.LR_R0,
        i % 2 === 0 ? KISA_SEED_CBC.LR_L1 : KISA_SEED_CBC.LR_R1,
        i % 2 === 0 ? KISA_SEED_CBC.LR_R0 : KISA_SEED_CBC.LR_L0,
        i % 2 === 0 ? KISA_SEED_CBC.LR_R1 : KISA_SEED_CBC.LR_L1,
        K,
        i * 2,
      );
    }

    if (Common.BIG_ENDIAN !== KISA_SEED_CBC.ENDIAN) {
      LR[KISA_SEED_CBC.LR_L0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L0]);
      LR[KISA_SEED_CBC.LR_L1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L1]);
      LR[KISA_SEED_CBC.LR_R0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R0]);
      LR[KISA_SEED_CBC.LR_R1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R1]);
    }

    // Copying output values from last round to outData
    outData[out_offset + 0] = LR[KISA_SEED_CBC.LR_R0];
    outData[out_offset + 1] = LR[KISA_SEED_CBC.LR_R1];
    outData[out_offset + 2] = LR[KISA_SEED_CBC.LR_L0];
    outData[out_offset + 3] = LR[KISA_SEED_CBC.LR_L1];
  }

  public static KISA_SEED_Decrypt_Block(
    input: number[],
    in_offset: number,
    outData: number[],
    out_offset: number,
    ks: KISA_SEED_KEY,
  ): void {
    const LR: number[] = new Array(4); // Input/output values at each rounds
    const T: number[] = new Array(2); // Temporary variables for round function F
    const K: number[] = ks.key_data; // Pointer of round keys

    // Set up input values for first round
    LR[KISA_SEED_CBC.LR_L0] = input[in_offset + 0];
    LR[KISA_SEED_CBC.LR_L1] = input[in_offset + 1];
    LR[KISA_SEED_CBC.LR_R0] = input[in_offset + 2];
    LR[KISA_SEED_CBC.LR_R1] = input[in_offset + 3];

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_CBC.ENDIAN) {
      LR[KISA_SEED_CBC.LR_L0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L0]);
      LR[KISA_SEED_CBC.LR_L1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L1]);
      LR[KISA_SEED_CBC.LR_R0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R0]);
      LR[KISA_SEED_CBC.LR_R1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R1]);
    }

    for (let i = 15; i >= 0; i--) {
      KISA_SEED_CBC.SeedRound(
        T,
        LR,
        i % 2 === 1 ? KISA_SEED_CBC.LR_L0 : KISA_SEED_CBC.LR_R0,
        i % 2 === 1 ? KISA_SEED_CBC.LR_L1 : KISA_SEED_CBC.LR_R1,
        i % 2 === 1 ? KISA_SEED_CBC.LR_R0 : KISA_SEED_CBC.LR_L0,
        i % 2 === 1 ? KISA_SEED_CBC.LR_R1 : KISA_SEED_CBC.LR_L1,
        K,
        i * 2,
      );
    }

    if (Common.BIG_ENDIAN !== KISA_SEED_CBC.ENDIAN) {
      LR[KISA_SEED_CBC.LR_L0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L0]);
      LR[KISA_SEED_CBC.LR_L1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_L1]);
      LR[KISA_SEED_CBC.LR_R0] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R0]);
      LR[KISA_SEED_CBC.LR_R1] = KISA_SEED_CBC.EndianChange(LR[KISA_SEED_CBC.LR_R1]);
    }

    // Copying output values from last round to outData
    outData[out_offset + 0] = LR[KISA_SEED_CBC.LR_R0];
    outData[out_offset + 1] = LR[KISA_SEED_CBC.LR_R1];
    outData[out_offset + 2] = LR[KISA_SEED_CBC.LR_L0];
    outData[out_offset + 3] = LR[KISA_SEED_CBC.LR_L1];
  }

  public static SEED_CBC_init(pInfo: KISA_SEED_INFO, enc: KISA_ENC_DEC, pbszUserKey: Uint8Array, pbszIV: Uint8Array) {
    if (!pInfo || !pbszUserKey || !pbszIV) return 0;

    const ABCD: number[] = new Array(4); // Iuput/output values at each rounds
    const T: number[] = new Array(2); // Temporary variable
    const K: number[] = pInfo.seed_key.key_data; // Pointer of round keys;

    pInfo.encrypt = enc.value;
    Common.memcpy_1(pInfo.ivec, pbszIV, 16, KISA_SEED_CBC.ENDIAN);
    pInfo.last_block_flag = 0;
    pInfo.buffer_length = 0;

    // Set up input values for Key Schedule
    ABCD[0] = Common.byte_to_int_2(pbszUserKey, 0 * 4, KISA_SEED_CBC.ENDIAN);
    ABCD[1] = Common.byte_to_int_2(pbszUserKey, 1 * 4, KISA_SEED_CBC.ENDIAN);
    ABCD[2] = Common.byte_to_int_2(pbszUserKey, 2 * 4, KISA_SEED_CBC.ENDIAN);
    ABCD[3] = Common.byte_to_int_2(pbszUserKey, 3 * 4, KISA_SEED_CBC.ENDIAN);

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_CBC.ENDIAN) {
      ABCD[0] = KISA_SEED_CBC.EndianChange(ABCD[0]);
      ABCD[1] = KISA_SEED_CBC.EndianChange(ABCD[1]);
      ABCD[2] = KISA_SEED_CBC.EndianChange(ABCD[2]);
      ABCD[3] = KISA_SEED_CBC.EndianChange(ABCD[3]);
    }

    // i-th round keys( K_i,0 and K_i,1 ) are denoted as K[2*(i-1)] and K[2*i-1], respectively
    for (let i = 0; i < 15; i++) {
      if (i % 2 === 0) {
        KISA_SEED_CBC.RoundKeyUpdate0(T, K, i * 2, ABCD, defaults.KC[i]);
      } else {
        KISA_SEED_CBC.RoundKeyUpdate1(T, K, i * 2, ABCD, defaults.KC[i]);
      }
    }

    T[0] = ABCD[0] + ABCD[2] - defaults.KC[15];
    T[1] = ABCD[1] - ABCD[3] + defaults.KC[15];

    K[30] = KISA_SEED_CBC.Subst(T[0]); // K_16,0
    K[31] = KISA_SEED_CBC.Subst(T[1]); // K_16,1

    return 1;
  }

  public static SEED_CBC_Process(
    pInfo: KISA_SEED_INFO,
    input: number[],
    inLen: number,
    output: number[],
    outLen: number[],
  ): number {
    let nCurrentCount = KISA_SEED_CBC.BLOCK_SIZE_SEED;
    let pdwXOR: number[];
    let in_offset = 0;
    let out_offset = 0;
    let pdwXOR_offset = 0;

    if (!pInfo || !input || !output || inLen < 0) return 0;

    if (KISA_ENC_DEC._KISA_ENCRYPT === pInfo.encrypt) {
      pdwXOR = pInfo.ivec;
      in_offset = 0;
      out_offset = 0;
      pdwXOR_offset = 0;

      while (nCurrentCount <= inLen) {
        KISA_SEED_CBC.BLOCK_XOR_CBC(output, out_offset, input, in_offset, pdwXOR, pdwXOR_offset);

        KISA_SEED_CBC.KISA_SEED_Encrypt_Block(output, out_offset, output, out_offset, pInfo.seed_key);

        pdwXOR = output;
        pdwXOR_offset = out_offset;

        nCurrentCount += KISA_SEED_CBC.BLOCK_SIZE_SEED;
        in_offset += KISA_SEED_CBC.BLOCK_SIZE_SEED_INT;
        out_offset += KISA_SEED_CBC.BLOCK_SIZE_SEED_INT;
      }

      outLen[0] = nCurrentCount - KISA_SEED_CBC.BLOCK_SIZE_SEED;
      pInfo.buffer_length = inLen - outLen[0];

      Common.memcpy_2(pInfo.ivec, pdwXOR, KISA_SEED_CBC.BLOCK_SIZE_SEED, pdwXOR_offset);
      Common.memcpy_2(pInfo.buffer, input, pInfo.buffer_length, in_offset);
    } else {
      pdwXOR = pInfo.ivec;
      in_offset = 0;
      out_offset = 0;
      pdwXOR_offset = 0;

      while (nCurrentCount <= inLen) {
        KISA_SEED_CBC.KISA_SEED_Decrypt_Block(input, in_offset, output, out_offset, pInfo.seed_key);

        KISA_SEED_CBC.BLOCK_XOR_CBC(output, out_offset, output, out_offset, pdwXOR, pdwXOR_offset);

        pdwXOR = input;
        pdwXOR_offset = in_offset;

        nCurrentCount += KISA_SEED_CBC.BLOCK_SIZE_SEED;
        in_offset += KISA_SEED_CBC.BLOCK_SIZE_SEED_INT;
        out_offset += KISA_SEED_CBC.BLOCK_SIZE_SEED_INT;
      }

      outLen[0] = nCurrentCount - KISA_SEED_CBC.BLOCK_SIZE_SEED;

      Common.memcpy_2(pInfo.ivec, pdwXOR, pdwXOR_offset, KISA_SEED_CBC.BLOCK_SIZE_SEED);
      Common.memcpy_2(
        pInfo.last_block,
        output,
        out_offset - KISA_SEED_CBC.BLOCK_SIZE_SEED_INT,
        KISA_SEED_CBC.BLOCK_SIZE_SEED,
      );
    }

    return 1;
  }

  public static SEED_CBC_Close(pInfo: KISA_SEED_INFO, output: number[], out_offset: number, outLen: number[]): number {
    if (output.length === 0) return 0;

    let nPaddngLeng: number;
    let i: number;
    outLen[0] = 0;

    if (KISA_ENC_DEC._KISA_ENCRYPT === pInfo.encrypt) {
      nPaddngLeng = KISA_SEED_CBC.BLOCK_SIZE_SEED - pInfo.buffer_length;
      for (i = pInfo.buffer_length; i < KISA_SEED_CBC.BLOCK_SIZE_SEED; i++) {
        Common.set_byte_for_int(pInfo.buffer, i, nPaddngLeng & 0xff, KISA_SEED_CBC.ENDIAN);
      }
      KISA_SEED_CBC.BLOCK_XOR_CBC(pInfo.buffer, 0, pInfo.buffer, 0, pInfo.ivec, 0);
      KISA_SEED_CBC.KISA_SEED_Encrypt_Block(pInfo.buffer, 0, output, out_offset, pInfo.seed_key);
      outLen[0] = KISA_SEED_CBC.BLOCK_SIZE_SEED;
      return 1;
    }
    nPaddngLeng = Common.get_byte_for_int(pInfo.last_block, KISA_SEED_CBC.BLOCK_SIZE_SEED - 1, KISA_SEED_CBC.ENDIAN);

    if (nPaddngLeng > 0 && nPaddngLeng <= KISA_SEED_CBC.BLOCK_SIZE_SEED) {
      for (i = nPaddngLeng; i > 0; i--) {
        Common.set_byte_for_int(output, out_offset - i, 0x00, KISA_SEED_CBC.ENDIAN);
      }
      outLen[0] = nPaddngLeng;
    } else return 0;

    return 1;
  }

  public static SEED_CBC_Encrypt(
    pbszUserKey: Uint8Array,
    pbszIV: Uint8Array,
    message: Uint8Array,
    message_offset: number,
    message_length: number,
  ): Uint8Array {
    const info = new KISA_SEED_INFO();
    const nRetOutLeng: number[] = [0];
    const nPaddingLeng: number[] = [0];

    const pbszPlainText: Uint8Array = message.slice(message_offset, message_offset + message_length);
    const nPlainTextLen: number = pbszPlainText.length;

    const nPlainTextPadding: number = KISA_SEED_CBC.BLOCK_SIZE_SEED - (nPlainTextLen % KISA_SEED_CBC.BLOCK_SIZE_SEED);
    const newpbszPlainText: Uint8Array = new Uint8Array(nPlainTextLen + nPlainTextPadding);
    Common.arraycopy(newpbszPlainText, pbszPlainText, nPlainTextLen);

    const pbszCipherText: Uint8Array = new Uint8Array(newpbszPlainText.length);

    KISA_SEED_CBC.SEED_CBC_init(info, KISA_ENC_DEC.KISA_ENCRYPT, pbszUserKey, pbszIV);

    const data: number[] = Common.chartoint32(newpbszPlainText, nPlainTextLen, KISA_SEED_CBC.ENDIAN);
    const outlen: number =
      (newpbszPlainText.length / KISA_SEED_CBC.BLOCK_SIZE_SEED) * KISA_SEED_CBC.BLOCK_SIZE_SEED_INT;
    const outbuf: number[] = new Array(outlen);

    KISA_SEED_CBC.SEED_CBC_Process(info, data, nPlainTextLen, outbuf, nRetOutLeng);
    KISA_SEED_CBC.SEED_CBC_Close(info, outbuf, Math.floor(nRetOutLeng[0] / 4), nPaddingLeng);

    const cdata: Uint8Array = Common.int32tochar(outbuf, nRetOutLeng[0] + nPaddingLeng[0], KISA_SEED_CBC.ENDIAN);
    Common.arraycopy(pbszCipherText, cdata, nRetOutLeng[0] + nPaddingLeng[0]);

    return pbszCipherText;
  }

  public static SEED_CBC_Decrypt(
    pbszUserKey: Uint8Array,
    pbszIV: Uint8Array,
    message: Uint8Array,
    message_offset: number,
    message_length: number,
  ): Uint8Array {
    const info = new KISA_SEED_INFO();
    const nRetOutLeng: number[] = [0];
    const nPaddingLeng: number[] = [0];

    const pbszCipherText: Uint8Array = message.slice(message_offset, message_offset + message_length);
    let nCipherTextLen: number = pbszCipherText.length;

    if (pbszCipherText.length % KISA_SEED_CBC.BLOCK_SIZE_SEED !== 0) {
      return new Uint8Array(0);
    }

    const newpbszCipherText: Uint8Array = new Uint8Array(nCipherTextLen);
    Common.arraycopy(newpbszCipherText, pbszCipherText, nCipherTextLen);

    nCipherTextLen = newpbszCipherText.length;

    KISA_SEED_CBC.SEED_CBC_init(info, KISA_ENC_DEC.KISA_DECRYPT, pbszUserKey, pbszIV);

    const data: number[] = Common.chartoint32(newpbszCipherText, nCipherTextLen, KISA_SEED_CBC.ENDIAN);
    const outlen: number = (nCipherTextLen / 16) * 4;
    const outbuf: number[] = new Array(outlen);

    KISA_SEED_CBC.SEED_CBC_Process(info, data, nCipherTextLen, outbuf, nRetOutLeng);

    if (KISA_SEED_CBC.SEED_CBC_Close(info, outbuf, nRetOutLeng[0], nPaddingLeng) === 1) {
      const cdata: Uint8Array = Common.int32tochar(outbuf, nRetOutLeng[0] - nPaddingLeng[0], KISA_SEED_CBC.ENDIAN);

      const pbszPlainText: Uint8Array = new Uint8Array(nRetOutLeng[0] - nPaddingLeng[0]);
      Common.arraycopy(pbszPlainText, cdata, nRetOutLeng[0] - nPaddingLeng[0]);

      const pdmessage_length: number = nRetOutLeng[0] - nPaddingLeng[0];
      let result: Uint8Array = new Uint8Array(pdmessage_length);
      result = pbszPlainText.slice(0, pdmessage_length);

      return result;
    }
    return new Uint8Array(0);
  }

  public static encrypt(pbszUserKey: string, pbszIV: string, message_str: string): string {
    const pbszUserKeyUint8Array: Uint8Array = Common.base64ToUint8Array(pbszUserKey);
    const pbszIVUint8Array: Uint8Array = Common.base64ToUint8Array(pbszIV);
    const message: Uint8Array = Common.stringToUint8Array(message_str);
    const result: Uint8Array = KISA_SEED_CBC.SEED_CBC_Encrypt(
      pbszUserKeyUint8Array,
      pbszIVUint8Array,
      message,
      0,
      message.length,
    );
    return btoa(String.fromCharCode(...result));
  }

  public static decrypt(pbszUserKey: string, pbszIV: string, base64_str: string): string {
    const pbszUserKeyUint8Array: Uint8Array = Common.base64ToUint8Array(pbszUserKey);
    const pbszIVUint8Array: Uint8Array = Common.base64ToUint8Array(pbszIV);
    const message: Uint8Array = Common.base64ToUint8Array(base64_str);
    const result: Uint8Array = KISA_SEED_CBC.SEED_CBC_Decrypt(
      pbszUserKeyUint8Array,
      pbszIVUint8Array,
      message,
      0,
      message.length,
    );
    return Common.uint8ArrayToString(result);
  }
}
