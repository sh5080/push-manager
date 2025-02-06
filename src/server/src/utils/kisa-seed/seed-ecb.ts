/* eslint-disable no-bitwise */

import Common from './common';
import { defaults } from './const';
import { KISA_ENC_DEC, KISA_SEED_INFO, KISA_SEED_KEY } from './seed';

export class KISA_SEED_ECB {
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
    T[1] = KISA_SEED_ECB.Subst(T[1]);
    T[0] += T[1];
    T[0] = KISA_SEED_ECB.Subst(T[0]);
    T[1] += T[0];
    T[1] = KISA_SEED_ECB.Subst(T[1]);
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
    K[K_offset + 0] = KISA_SEED_ECB.Subst(T[0]);
    K[K_offset + 1] = KISA_SEED_ECB.Subst(T[1]);
    T[0] = ABCD[0];
    ABCD[0] = ((ABCD[0] >> 8) & 0x00ffffff) ^ (ABCD[1] << 24);
    ABCD[1] = ((ABCD[1] >> 8) & 0x00ffffff) ^ (T[0] << 24);
  }

  private static RoundKeyUpdate1(T: number[], K: number[], K_offset: number, ABCD: number[], KC: number): void {
    T[0] = ABCD[0] + ABCD[2] - KC;
    T[1] = ABCD[1] + KC - ABCD[3];
    K[K_offset + 0] = KISA_SEED_ECB.Subst(T[0]);
    K[K_offset + 1] = KISA_SEED_ECB.Subst(T[1]);
    T[0] = ABCD[2];
    ABCD[2] = (ABCD[2] << 8) ^ ((ABCD[3] >> 24) & 0x000000ff);
    ABCD[3] = (ABCD[3] << 8) ^ ((T[0] >> 24) & 0x000000ff);
  }

  private static readonly LR_L0: number = 0;
  private static readonly LR_L1: number = 1;
  private static readonly LR_R0: number = 2;
  private static readonly LR_R1: number = 3;

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
    LR[KISA_SEED_ECB.LR_L0] = inData[in_offset + 0];
    LR[KISA_SEED_ECB.LR_L1] = inData[in_offset + 1];
    LR[KISA_SEED_ECB.LR_R0] = inData[in_offset + 2];
    LR[KISA_SEED_ECB.LR_R1] = inData[in_offset + 3];

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_ECB.ENDIAN) {
      LR[KISA_SEED_ECB.LR_L0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L0]);
      LR[KISA_SEED_ECB.LR_L1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L1]);
      LR[KISA_SEED_ECB.LR_R0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R0]);
      LR[KISA_SEED_ECB.LR_R1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R1]);
    }

    for (let i = 0; i < 16; i++) {
      KISA_SEED_ECB.SeedRound(
        T,
        LR,
        i % 2 === 0 ? KISA_SEED_ECB.LR_L0 : KISA_SEED_ECB.LR_R0,
        i % 2 === 0 ? KISA_SEED_ECB.LR_L1 : KISA_SEED_ECB.LR_R1,
        i % 2 === 0 ? KISA_SEED_ECB.LR_R0 : KISA_SEED_ECB.LR_L0,
        i % 2 === 0 ? KISA_SEED_ECB.LR_R1 : KISA_SEED_ECB.LR_L1,
        K,
        i * 2,
      );
    }

    if (Common.BIG_ENDIAN !== KISA_SEED_ECB.ENDIAN) {
      LR[KISA_SEED_ECB.LR_L0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L0]);
      LR[KISA_SEED_ECB.LR_L1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L1]);
      LR[KISA_SEED_ECB.LR_R0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R0]);
      LR[KISA_SEED_ECB.LR_R1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R1]);
    }

    // Copying output values from last round to outData
    outData[out_offset + 0] = LR[KISA_SEED_ECB.LR_R0];
    outData[out_offset + 1] = LR[KISA_SEED_ECB.LR_R1];
    outData[out_offset + 2] = LR[KISA_SEED_ECB.LR_L0];
    outData[out_offset + 3] = LR[KISA_SEED_ECB.LR_L1];
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
    LR[KISA_SEED_ECB.LR_L0] = input[in_offset + 0];
    LR[KISA_SEED_ECB.LR_L1] = input[in_offset + 1];
    LR[KISA_SEED_ECB.LR_R0] = input[in_offset + 2];
    LR[KISA_SEED_ECB.LR_R1] = input[in_offset + 3];

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_ECB.ENDIAN) {
      LR[KISA_SEED_ECB.LR_L0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L0]);
      LR[KISA_SEED_ECB.LR_L1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L1]);
      LR[KISA_SEED_ECB.LR_R0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R0]);
      LR[KISA_SEED_ECB.LR_R1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R1]);
    }

    for (let i = 15; i >= 0; i--) {
      KISA_SEED_ECB.SeedRound(
        T,
        LR,
        i % 2 === 1 ? KISA_SEED_ECB.LR_L0 : KISA_SEED_ECB.LR_R0,
        i % 2 === 1 ? KISA_SEED_ECB.LR_L1 : KISA_SEED_ECB.LR_R1,
        i % 2 === 1 ? KISA_SEED_ECB.LR_R0 : KISA_SEED_ECB.LR_L0,
        i % 2 === 1 ? KISA_SEED_ECB.LR_R1 : KISA_SEED_ECB.LR_L1,
        K,
        i * 2,
      );
    }

    if (Common.BIG_ENDIAN !== KISA_SEED_ECB.ENDIAN) {
      LR[KISA_SEED_ECB.LR_L0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L0]);
      LR[KISA_SEED_ECB.LR_L1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_L1]);
      LR[KISA_SEED_ECB.LR_R0] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R0]);
      LR[KISA_SEED_ECB.LR_R1] = KISA_SEED_ECB.EndianChange(LR[KISA_SEED_ECB.LR_R1]);
    }

    // Copying output values from last round to outData
    outData[out_offset + 0] = LR[KISA_SEED_ECB.LR_R0];
    outData[out_offset + 1] = LR[KISA_SEED_ECB.LR_R1];
    outData[out_offset + 2] = LR[KISA_SEED_ECB.LR_L0];
    outData[out_offset + 3] = LR[KISA_SEED_ECB.LR_L1];
  }

  public static SEED_ECB_init(pInfo: KISA_SEED_INFO, enc: KISA_ENC_DEC, pbszUserKey: Uint8Array) {
    if (!pInfo || !pbszUserKey) return 0;

    const ABCD: number[] = new Array(4); // Iuput/output values at each rounds
    const T: number[] = new Array(2); // Temporary variable
    const K: number[] = pInfo.seed_key.key_data; // Pointer of round keys

    pInfo.encrypt = enc.value;
    pInfo.last_block_flag = 0;
    pInfo.buffer_length = 0;

    // Set up input values for Key Schedule
    ABCD[0] = Common.byte_to_int_2(pbszUserKey, 0 * 4, KISA_SEED_ECB.ENDIAN);
    ABCD[1] = Common.byte_to_int_2(pbszUserKey, 1 * 4, KISA_SEED_ECB.ENDIAN);
    ABCD[2] = Common.byte_to_int_2(pbszUserKey, 2 * 4, KISA_SEED_ECB.ENDIAN);
    ABCD[3] = Common.byte_to_int_2(pbszUserKey, 3 * 4, KISA_SEED_ECB.ENDIAN);

    // Reorder for big endian
    if (Common.BIG_ENDIAN !== KISA_SEED_ECB.ENDIAN) {
      ABCD[0] = KISA_SEED_ECB.EndianChange(ABCD[0]);
      ABCD[1] = KISA_SEED_ECB.EndianChange(ABCD[1]);
      ABCD[2] = KISA_SEED_ECB.EndianChange(ABCD[2]);
      ABCD[3] = KISA_SEED_ECB.EndianChange(ABCD[3]);
    }

    // i-th round keys( K_i,0 and K_i,1 ) are denoted as K[2*(i-1)] and K[2*i-1], respectively
    for (let i = 0; i < 15; i++) {
      if (i % 2 === 0) {
        KISA_SEED_ECB.RoundKeyUpdate0(T, K, i * 2, ABCD, defaults.KC[i]);
      } else {
        KISA_SEED_ECB.RoundKeyUpdate1(T, K, i * 2, ABCD, defaults.KC[i]);
      }
    }

    T[0] = ABCD[0] + ABCD[2] - defaults.KC[15];
    T[1] = ABCD[1] - ABCD[3] + defaults.KC[15];

    K[30] = KISA_SEED_ECB.Subst(T[0]); // K_16,0
    K[31] = KISA_SEED_ECB.Subst(T[1]); // K_16,1

    return 1;
  }

  public static SEED_ECB_Process(
    pInfo: KISA_SEED_INFO,
    input: number[],
    inLen: number,
    output: number[],
    outLen: number[],
  ): number {
    let nCurrentCount = KISA_SEED_ECB.BLOCK_SIZE_SEED;
    let in_offset = 0;
    let out_offset = 0;

    if (!pInfo || !input || !output || inLen < 0) return 0;

    if (KISA_ENC_DEC._KISA_ENCRYPT === pInfo.encrypt) {
      in_offset = 0;
      out_offset = 0;

      while (nCurrentCount <= inLen) {
        KISA_SEED_ECB.KISA_SEED_Encrypt_Block(input, in_offset, output, out_offset, pInfo.seed_key);
        nCurrentCount += KISA_SEED_ECB.BLOCK_SIZE_SEED;
        in_offset += KISA_SEED_ECB.BLOCK_SIZE_SEED_INT;
        out_offset += KISA_SEED_ECB.BLOCK_SIZE_SEED_INT;
      }

      outLen[0] = nCurrentCount - KISA_SEED_ECB.BLOCK_SIZE_SEED;
      pInfo.buffer_length = inLen - outLen[0];

      Common.memcpy_2(pInfo.buffer, input, in_offset, pInfo.buffer_length);
    } else {
      in_offset = 0;
      out_offset = 0;

      while (nCurrentCount <= inLen) {
        KISA_SEED_ECB.KISA_SEED_Decrypt_Block(input, in_offset, output, out_offset, pInfo.seed_key);
        nCurrentCount += KISA_SEED_ECB.BLOCK_SIZE_SEED;
        in_offset += KISA_SEED_ECB.BLOCK_SIZE_SEED_INT;
        out_offset += KISA_SEED_ECB.BLOCK_SIZE_SEED_INT;
      }
      outLen[0] = nCurrentCount - KISA_SEED_ECB.BLOCK_SIZE_SEED;
      Common.memcpy_2(pInfo.last_block, output, out_offset - 4, KISA_SEED_ECB.BLOCK_SIZE_SEED);
    }

    return 1;
  }

  public static SEED_ECB_Close(pInfo: KISA_SEED_INFO, output: number[], out_offset: number, outLen: number[]): number {
    if (output.length === 0) return 0;

    let nPaddngLeng: number;
    let i: number;
    outLen[0] = 0;

    if (KISA_ENC_DEC._KISA_ENCRYPT === pInfo.encrypt) {
      nPaddngLeng = KISA_SEED_ECB.BLOCK_SIZE_SEED - pInfo.buffer_length;
      for (i = pInfo.buffer_length; i < KISA_SEED_ECB.BLOCK_SIZE_SEED; i++) {
        Common.set_byte_for_int(pInfo.buffer, i, nPaddngLeng & 0xff, KISA_SEED_ECB.ENDIAN);
      }
      KISA_SEED_ECB.KISA_SEED_Encrypt_Block(pInfo.buffer, 0, output, Math.floor(out_offset / 4), pInfo.seed_key);
      outLen[0] = KISA_SEED_ECB.BLOCK_SIZE_SEED;
    } else {
      nPaddngLeng = Common.get_byte_for_int(pInfo.last_block, KISA_SEED_ECB.BLOCK_SIZE_SEED - 1, KISA_SEED_ECB.ENDIAN);
      if (nPaddngLeng > 0 && nPaddngLeng <= KISA_SEED_ECB.BLOCK_SIZE_SEED) {
        for (i = nPaddngLeng; i > 0; i--) {
          Common.set_byte_for_int(output, out_offset - i, 0x00, KISA_SEED_ECB.ENDIAN);
        }
        outLen[0] = nPaddngLeng;
      } else return 0;
    }
    return 1;
  }

  public static SEED_ECB_Encrypt(
    pbszUserKey: Uint8Array,
    pbData: Uint8Array,
    offset: number,
    length: number,
  ): Uint8Array {
    const info = new KISA_SEED_INFO();
    const nRetOutLeng: number[] = [0];
    const nPaddingLeng: number[] = [0];

    const pbszPlainText: Uint8Array = pbData;
    const nPlainTextLen: number = length;

    const nPlainTextPadding: number = KISA_SEED_ECB.BLOCK_SIZE_SEED - (nPlainTextLen % KISA_SEED_ECB.BLOCK_SIZE_SEED);
    const newpbszPlainText: Uint8Array = new Uint8Array(nPlainTextLen + nPlainTextPadding);
    Common.arraycopy(newpbszPlainText, pbszPlainText, nPlainTextLen);

    const pbszCipherText: Uint8Array = new Uint8Array(newpbszPlainText.length);

    KISA_SEED_ECB.SEED_ECB_init(info, KISA_ENC_DEC.KISA_ENCRYPT, pbszUserKey);

    const data: number[] = Common.chartoint32(newpbszPlainText, nPlainTextLen, KISA_SEED_ECB.ENDIAN);
    const outlen: number =
      (newpbszPlainText.length / KISA_SEED_ECB.BLOCK_SIZE_SEED) * KISA_SEED_ECB.BLOCK_SIZE_SEED_INT;
    const outbuf: number[] = new Array(outlen);

    KISA_SEED_ECB.SEED_ECB_Process(info, data, nPlainTextLen, outbuf, nRetOutLeng);
    KISA_SEED_ECB.SEED_ECB_Close(info, outbuf, nRetOutLeng[0], nPaddingLeng);

    const cdata: Uint8Array = Common.int32tochar(outbuf, nRetOutLeng[0] + nPaddingLeng[0], KISA_SEED_ECB.ENDIAN);
    Common.arraycopy(pbszCipherText, cdata, nRetOutLeng[0] + nPaddingLeng[0]);

    return pbszCipherText;
  }

  public static SEED_ECB_Decrypt(
    pbszUserKey: Uint8Array,
    pbData: Uint8Array,
    offset: number,
    length: number,
  ): Uint8Array {
    const info = new KISA_SEED_INFO();
    const nRetOutLeng: number[] = [0];
    const nPaddingLeng: number[] = [0];

    const pbszCipherText: Uint8Array = pbData;
    const nCipherTextLen: number = length;

    if (nCipherTextLen % KISA_SEED_ECB.BLOCK_SIZE_SEED > 0) {
      return new Uint8Array(0);
    }

    const newpbszCipherText: Uint8Array = new Uint8Array(nCipherTextLen);
    Common.arraycopy(newpbszCipherText, pbszCipherText, nCipherTextLen);

    KISA_SEED_ECB.SEED_ECB_init(info, KISA_ENC_DEC.KISA_DECRYPT, pbszUserKey);

    const data: number[] = Common.chartoint32(newpbszCipherText, nCipherTextLen, KISA_SEED_ECB.ENDIAN);
    const outlen: number = Math.floor(nCipherTextLen / 16) * 4;
    const outbuf: number[] = new Array(outlen);

    KISA_SEED_ECB.SEED_ECB_Process(info, data, nCipherTextLen, outbuf, nRetOutLeng);

    if (KISA_SEED_ECB.SEED_ECB_Close(info, outbuf, nRetOutLeng[0], nPaddingLeng) > 0) {
      const cdata: Uint8Array = Common.int32tochar(outbuf, nRetOutLeng[0] - nPaddingLeng[0], KISA_SEED_ECB.ENDIAN);

      const pbszPlainText: Uint8Array = new Uint8Array(nRetOutLeng[0] - nPaddingLeng[0]);
      Common.arraycopy(pbszPlainText, cdata, nRetOutLeng[0] - nPaddingLeng[0]);

      let message_length: number = nRetOutLeng[0] - nPaddingLeng[0];
      if (message_length < 0) message_length = 0;
      let result: Uint8Array = new Uint8Array(message_length);
      result = pbszPlainText.slice(0, message_length);

      return result;
    }
    return new Uint8Array(0);
  }

  public static encrypt(pbszUserKey: string, message_str: string): string {
    const pbszUserKeyUint8Array: Uint8Array = Common.base64ToUint8Array(pbszUserKey);
    const message: Uint8Array = Common.stringToUint8Array(message_str);
    const result: Uint8Array = KISA_SEED_ECB.SEED_ECB_Encrypt(pbszUserKeyUint8Array, message, 0, message.length);
    return btoa(String.fromCharCode(...result));
  }

  public static decrypt(pbszUserKey: string, base64_str: string): string {
    const pbszUserKeyUint8Array: Uint8Array = Common.base64ToUint8Array(pbszUserKey);
    const message: Uint8Array = Common.base64ToUint8Array(base64_str);
    const result: Uint8Array = KISA_SEED_ECB.SEED_ECB_Decrypt(pbszUserKeyUint8Array, message, 0, message.length);
    return Common.uint8ArrayToString(result);
  }
}
