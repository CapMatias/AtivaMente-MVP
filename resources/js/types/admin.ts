/** Tipos do painel administrativo (protótipo Figma Make "AtivaMente SaaS"). */

export type Specialty =
  | 'Fonoaudiologia'
  | 'Psicologia'
  | 'T. Ocupacional'
  | 'Terapia Ocupacional'
  | 'Fisioterapia'
  | 'Neuropsicologia'
  | 'Gestão';

export type PatientStatus = 'Ativo' | 'Inativo';
export type AppointmentStatus = 'Confirmado' | 'Em Atendimento' | 'Aguardando' | 'Concluído';

export interface Patient {
  id: number;
  name: string;
  age: number;
  dob: string;
  diagnosis: string;
  responsible: string;
  phone: string;
  specialty: string;
  status: string;
  therapist: string;
  sessions: number;
  avatar: string;
}

export interface Appointment {
  time: string;
  child: string;
  therapist: string;
  specialty: string;
  room: string;
  status: string;
}

export interface ClinicalEvolution {
  id: number;
  child: string;
  childId: number;
  date: string;
  therapist: string;
  specialty: string;
  text: string;
  objectives: string;
  evolution: string;
}

export interface ScheduleSlot {
  time: string;
  child: string;
  specialty: string;
  color: string;
  border: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  status: string;
  av: string;
  ai: number;
}

export interface SystemPreference {
  label: string;
  desc: string;
  on: boolean;
}

export interface SpecialtySlice {
  name: string;
  value: number;
  color: string;
}

/** Série de um gráfico de barras (Components/admin/charts/BarChart.vue). */
export interface BarSeries {
  key: string;
  name: string;
  color: string;
}
