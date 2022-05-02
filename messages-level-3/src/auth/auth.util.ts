import {
  createDecipheriv,
  createCipheriv,
  randomBytes,
  scrypt as _scrypt,
} from 'crypto';
import { promisify } from 'util';

import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

export class AuthUtil {

  public async buildPassword(password: string) {
    // hash the user pws
    //Generate Salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and pwd
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and salt
    const result = salt + '.' + hash.toString('hex');

    return result;
  }

  public async isPwdValid(password: string, userPassword: string) {
    const [salt, storageHash] = userPassword.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return storageHash === hash.toString('hex');
  }

  public async buildPasswordV2(password: string) {
    const iv = randomBytes(16);
    const word = 'Word used to generate key';
    const key = (await promisify(scrypt)(word, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);

    return encryptedText.toString('hex');
  }

  // It will not working because the valur decrypted is not equal password
  // If you try encrypt the passaword to compar with userPassword will not work as well
  // because the value created is different
  public async isPwdValidV2(password: string, userPassword: string) {
    const iv = randomBytes(16);
    const word = 'Word used to generate key';
    const key = (await promisify(scrypt)(word, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(userPassword)),
      decipher.final(),
    ]);

    console.log(decryptedText.toString());
    console.log(password);

    return decryptedText.toString() === password;
  }

  public async buildPasswordV3(password: string) {
    // const saltOrRounds = 10;
    // const hash = await bcrypt.hash(password, saltOrRounds);
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  public async isPwdValidV3(password: string, userPassword: string) {
    const isMatch = await bcrypt.compare(password, userPassword);
    console.log(`isMatch: ${isMatch}`);
    return isMatch;
  }
}
