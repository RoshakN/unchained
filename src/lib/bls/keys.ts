import bls from "@chainsafe/bls";
import { Base58 } from "base-ex";
import { KeyPair } from "../types.js";
import { SecretKey } from "@chainsafe/bls/types";

interface EncodedKeyPair {
  secretKey: string;
  publicKey: string;
}

const getPair = (secretKey: SecretKey): KeyPair => {
  const publicKey = secretKey.toPublicKey();
  return { secretKey, publicKey };
};

export const makeKeys = (): KeyPair => {
  const secretKey = bls.SecretKey.fromKeygen();
  return getPair(secretKey);
};

export const loadKeys = (encodedSecretKey: string): KeyPair => {
  const decoded = Buffer.from(encoder.decode(encodedSecretKey));
  const secretKey = bls.SecretKey.fromBytes(decoded);
  return getPair(secretKey);
};

export const encoder = new Base58("bitcoin");

export const encodeKeys = (pair: KeyPair): EncodedKeyPair => {
  return {
    secretKey: encoder.encode(pair.secretKey.toBytes()),
    publicKey: encoder.encode(pair.publicKey.toBytes()),
  };
};

export const decodeKeys = (
  pair: EncodedKeyPair
): { secretKey: Buffer; publicKey: Buffer } => {
  return {
    secretKey: Buffer.from(encoder.decode(pair.secretKey)),
    publicKey: Buffer.from(encoder.decode(pair.publicKey)),
  };
};
