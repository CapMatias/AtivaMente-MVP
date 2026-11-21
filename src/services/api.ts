import { User } from '../types';
import { MOCK_DATA } from './mockData';

export const AuthService = {
  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.user), 1000);
    });
  },
  async register(data: any): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.user), 1000);
    });
  },
  async recoverPassword(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  },
};
