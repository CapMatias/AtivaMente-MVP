import { User, Child, Session, Evolution } from '../types';
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

export const ChildService = {
  async getChildren(parentId: string): Promise<Child[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.children.filter(c => c.parentId === parentId)), 1000);
    });
  },
  async getChildById(id: string): Promise<Child | null> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.children.find(c => c.id === id) || null), 1000);
    });
  },
};

export const SessionService = {
  async getSessionsByChild(childId: string): Promise<Session[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.sessions.filter(s => s.childId === childId)), 1000);
    });
  },
  async requestScheduling(childId: string, date: string, time: string): Promise<Session> {
    return new Promise((resolve) => {
      const newSession: Session = {
        id: `s${Date.now()}`,
        childId,
        professionalId: 'p-new',
        professionalName: 'Aguardando Atribuição',
        date,
        time,
        type: 'A definir',
        status: 'scheduled',
      };
      resolve(newSession);
    });
  },
};

export const EvolutionService = {
  async getEvolutionsByChild(childId: string): Promise<Evolution[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA.evolutions.filter(e => e.childId === childId)), 1000);
    });
  },
};
