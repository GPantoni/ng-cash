import { SignData } from '../repositories/userRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import errorUtils from '../utils/errorUtils.js';
import { encryptPassword } from '../utils/bcryptUtils.js';

export async function signUp(newUser: SignData) {
  const { username, password } = newUser;

  const isUsernameTaken = await userRepository.findUserByUsername(username);
  if (isUsernameTaken) {
    throw errorUtils(409, 'Username is already taken');
  }

  const hashedPassword = encryptPassword(password);
  newUser.password = hashedPassword;

  return await userRepository.createUser(newUser);
}
