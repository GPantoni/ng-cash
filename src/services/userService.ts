import { SignData } from '../repositories/userRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import * as accountRepository from '../repositories/accountRepository.js';
import errorUtils from '../utils/errorUtils.js';
import { encryptPassword, validatePassword } from '../utils/bcryptUtils.js';
import { createToken } from '../utils/tokenUtils.js';

export async function signUp(newUserData: SignData) {
  const { username, password } = newUserData;

  const isUsernameTaken = await userRepository.findUserByUsername(username);
  if (isUsernameTaken) {
    throw errorUtils(409, 'Username is already taken');
  }

  const hashedPassword = encryptPassword(password);
  newUserData.password = hashedPassword;

  const newUser = await userRepository.createUser(newUserData);
  newUser?.id && (await accountRepository.createAccount(newUser.id));

  return;
}

export async function signIn(userData: SignData) {
  const { username, password } = userData;

  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw errorUtils(401, 'Invalid username or password');
  }

  const isPasswordCorrect = await validatePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw errorUtils(401, 'Invalid username or password');
  }

  const token = createToken(user);

  return token;
}
