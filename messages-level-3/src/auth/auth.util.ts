import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { BadRequestException } from '@nestjs/common';

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
}
