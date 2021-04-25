import { sha256 } from "js-sha256";

export function encryptKey(key) {
  const psw = sha256.hex(key);
  return psw;
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
  // console.log(psw)
}
