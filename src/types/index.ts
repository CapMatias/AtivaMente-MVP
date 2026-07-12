export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  parentId: string;
  avatarUrl?: string;
  nextSession?: Session;
}

export interface Session {
  id: string;
  childId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Evolution {
  id: string;
  childId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  description: string;
  attachments: string[];
  photos: string[];
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  selectedChildId: string | null;
}
