import { sha256 } from "js-sha256";

export function encryptKey(key) {
  // console.log("Entramos al metodo")
  // const seedAfter = seed.split("@")[0];
  // console.log(seedAfter)
  // const seedReverse = seedAfter
  //   .split("")
  //   .reverse()
  //   .join("");
  // // console.log(seedReverse)
  // const seedEncrypt = sha256.hex(seedReverse);
  // console.log(seedEncrypt)
  // console.log("Clave final")
  const psw = sha256.hex(key);
  // console.log(psw)
  return psw;
}
