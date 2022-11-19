import { SignData } from '../repositories/userRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import errorUtils from '../utils/errorUtils.js';
import { encryptPassword, validatePassword } from '../utils/bcryptUtils.js';
import { createToken } from '../utils/tokenUtils.js';

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
