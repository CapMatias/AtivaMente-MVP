import { create } from 'zustand';
import { AppState, User } from '../types';

interface AuthStore {
  state: AppState;
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  setSelectedChild: (childId: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  state: {
    user: null,
    isAuthenticated: false,
    selectedChildId: null,
  },
  setUser: (user) => set((state) => ({ 
    state: { ...state.state, user } 
  })),
  setAuthenticated: (auth) => set((state) => ({ 
    state: { ...state.state, isAuthenticated: auth } 
  })),
  setSelectedChild: (childId) => set((state) => ({ 
    state: { ...state.state, selectedChildId: childId } 
  })),
  logout: () => set({ 
    state: { user: null, isAuthenticated: false, selectedChildId: null } 
  }),
}));
