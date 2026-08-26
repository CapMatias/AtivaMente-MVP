import type {
  Appointment,
  ClinicalEvolution,
  Patient,
  ScheduleSlot,
  SpecialtySlice,
  SystemPreference,
  TeamMember,
} from '../types/admin';

/** Dados de demonstração portados do protótipo Figma Make, sem alterações. */

export const PATIENTS: Patient[] = [
  { id: 1, name: 'Sofia Almeida', age: 7, dob: '2017-03-12', diagnosis: 'TEA Nível 1', responsible: 'Ana Almeida', phone: '(11) 98765-4321', specialty: 'Fonoaudiologia', status: 'Ativo', therapist: 'Dra. Carla Mendes', sessions: 24, avatar: 'SA' },
  { id: 2, name: 'Lucas Pereira', age: 5, dob: '2019-06-20', diagnosis: 'TDAH', responsible: 'Roberto Pereira', phone: '(11) 91234-5678', specialty: 'Psicologia', status: 'Ativo', therapist: 'Dr. Felipe Costa', sessions: 18, avatar: 'LP' },
  { id: 3, name: 'Isabela Santos', age: 9, dob: '2015-11-08', diagnosis: 'Dislexia', responsible: 'Mariana Santos', phone: '(11) 93456-7890', specialty: 'Fonoaudiologia', status: 'Ativo', therapist: 'Dra. Carla Mendes', sessions: 32, avatar: 'IS' },
  { id: 4, name: 'Gabriel Oliveira', age: 6, dob: '2018-02-14', diagnosis: 'Atraso Motor', responsible: 'Cristina Oliveira', phone: '(11) 95678-9012', specialty: 'Fisioterapia', status: 'Inativo', therapist: 'Dr. André Lima', sessions: 12, avatar: 'GO' },
  { id: 5, name: 'Valentina Cruz', age: 4, dob: '2020-07-30', diagnosis: 'Atraso de Fala', responsible: 'Paulo Cruz', phone: '(11) 97890-1234', specialty: 'Fonoaudiologia', status: 'Ativo', therapist: 'Dra. Carla Mendes', sessions: 8, avatar: 'VC' },
  { id: 6, name: 'Mateus Lima', age: 8, dob: '2016-09-05', diagnosis: 'Ansiedade', responsible: 'Fernanda Lima', phone: '(11) 96012-3456', specialty: 'Psicologia', status: 'Ativo', therapist: 'Dr. Felipe Costa', sessions: 28, avatar: 'ML' },
];

export const APPOINTMENTS_TODAY: Appointment[] = [
  { time: '08:00', child: 'Sofia Almeida', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', room: 'Sala 1', status: 'Confirmado' },
  { time: '09:00', child: 'Lucas Pereira', therapist: 'Dr. Felipe Costa', specialty: 'Psicologia', room: 'Sala 2', status: 'Confirmado' },
  { time: '10:00', child: 'Mateus Lima', therapist: 'Dr. Felipe Costa', specialty: 'Psicologia', room: 'Sala 2', status: 'Em Atendimento' },
  { time: '11:00', child: 'Isabela Santos', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', room: 'Sala 1', status: 'Aguardando' },
  { time: '14:00', child: 'Valentina Cruz', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', room: 'Sala 3', status: 'Confirmado' },
];

export const CLINICAL_EVOLUTIONS: ClinicalEvolution[] = [
  { id: 1, child: 'Sofia Almeida', childId: 1, date: '2024-06-18', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', text: 'Sessão produtiva com foco em articulação de fonemas /r/ e /l/. Sofia demonstrou excelente engajamento nas atividades lúdicas. Conseguiu articular corretamente o fonema /r/ em 7 de 10 tentativas — melhoria significativa.', objectives: 'Articulação de fonemas', evolution: 'Boa evolução' },
  { id: 2, child: 'Lucas Pereira', childId: 2, date: '2024-06-17', therapist: 'Dr. Felipe Costa', specialty: 'Psicologia', text: 'Trabalho com técnicas de regulação emocional. Lucas apresentou maior capacidade de identificar suas emoções. Utilizamos cartões de emoções e jogos simbólicos. Mãe relatou melhora no comportamento em casa.', objectives: 'Regulação emocional', evolution: 'Progresso moderado' },
  { id: 3, child: 'Sofia Almeida', childId: 1, date: '2024-06-11', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', text: 'Continuação do trabalho com consciência fonológica. Atividades de rima e segmentação silábica. Sofia mostrou dificuldade inicial mas progrediu bem.', objectives: 'Consciência fonológica', evolution: 'Progresso moderado' },
  { id: 4, child: 'Isabela Santos', childId: 3, date: '2024-06-16', therapist: 'Dra. Carla Mendes', specialty: 'Fonoaudiologia', text: 'Foco em leitura e decodificação. Isabela demonstra boa compreensão oral mas ainda apresenta dificuldades na decodificação. Introduzidas estratégias multissensoriais.', objectives: 'Leitura e decodificação', evolution: 'Progresso estável' },
];

export const WEEKLY_DATA = [
  { day: 'Seg', sessions: 8, evolutions: 6 },
  { day: 'Ter', sessions: 10, evolutions: 9 },
  { day: 'Qua', sessions: 7, evolutions: 7 },
  { day: 'Qui', sessions: 12, evolutions: 10 },
  { day: 'Sex', sessions: 9, evolutions: 8 },
];

export const MONTHLY_DATA = [
  { month: 'Jan', sessions: 42 },
  { month: 'Fev', sessions: 58 },
  { month: 'Mar', sessions: 65 },
  { month: 'Abr', sessions: 71 },
  { month: 'Mai', sessions: 68 },
  { month: 'Jun', sessions: 79 },
];

export const SPECIALTY_DATA: SpecialtySlice[] = [
  { name: 'Fonoaudiologia', value: 38, color: '#2563EB' },
  { name: 'Psicologia', value: 28, color: '#8B5CF6' },
  { name: 'T. Ocupacional', value: 20, color: '#22C55E' },
  { name: 'Fisioterapia', value: 14, color: '#F59E0B' },
];

export const WEEK_SCHEDULE: Record<string, ScheduleSlot[]> = {
  Seg: [
    { time: '08:00', child: 'Sofia A.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '09:00', child: 'Lucas P.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
    { time: '10:00', child: 'Mateus L.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
  ],
  Ter: [
    { time: '08:00', child: 'Isabela S.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '11:00', child: 'Valentina C.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
  ],
  Qua: [
    { time: '09:00', child: 'Gabriel O.', specialty: 'Fisio', color: '#FFFBEB', border: '#FDE68A' },
    { time: '14:00', child: 'Sofia A.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '15:00', child: 'Lucas P.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
  ],
  Qui: [
    { time: '08:00', child: 'Mateus L.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
    { time: '09:00', child: 'Isabela S.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '10:00', child: 'Valentina C.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '15:00', child: 'Gabriel O.', specialty: 'Fisio', color: '#FFFBEB', border: '#FDE68A' },
  ],
  Sex: [
    { time: '08:00', child: 'Sofia A.', specialty: 'Fono', color: '#EFF6FF', border: '#BFDBFE' },
    { time: '09:00', child: 'Lucas P.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
    { time: '14:00', child: 'Mateus L.', specialty: 'Psico', color: '#F5F3FF', border: '#DDD6FE' },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Dra. Clara Souza', role: 'Coordenadora', specialty: 'Gestão', status: 'Ativo', av: 'CS', ai: 2 },
  { name: 'Dra. Carla Mendes', role: 'Fonoaudióloga', specialty: 'Fonoaudiologia', status: 'Ativo', av: 'CM', ai: 0 },
  { name: 'Dr. Felipe Costa', role: 'Psicólogo', specialty: 'Psicologia', status: 'Ativo', av: 'FC', ai: 3 },
  { name: 'Dr. André Lima', role: 'Fisioterapeuta', specialty: 'Fisioterapia', status: 'Ativo', av: 'AL', ai: 1 },
  { name: 'Dra. Renata Pires', role: 'T. Ocupacional', specialty: 'T. Ocupacional', status: 'Férias', av: 'RP', ai: 4 },
];

export const SYSTEM_PREFERENCES: SystemPreference[] = [
  { label: 'Notificações por e-mail', desc: 'Alertas de agendamentos e lembretes', on: true },
  { label: 'Notificações push', desc: 'Notificações em tempo real', on: true },
  { label: 'Confirmação automática', desc: 'Confirmar agendamentos via WhatsApp', on: false },
  { label: 'Modo compacto', desc: 'Reduzir espaçamento para mais informações', on: false },
  { label: 'Relatório semanal', desc: 'Resumo de atendimentos toda segunda', on: true },
];

export const THERAPISTS = ['Dra. Carla Mendes', 'Dr. Felipe Costa', 'Dr. André Lima', 'Dra. Renata Pires'];
export const SPECIALTIES = ['Fonoaudiologia', 'Psicologia', 'Terapia Ocupacional', 'Fisioterapia', 'Neuropsicologia'];
export const ROOMS = ['Sala 1', 'Sala 2', 'Sala 3'];
export const EVOLUTION_RATINGS = ['Boa evolução', 'Progresso moderado', 'Progresso estável', 'Sem evolução', 'Regressão observada'];

export const CLINIC = {
  name: 'Clínica Bem Crescer',
  cnpj: '12.345.678/0001-99',
  phone: '(99) 9999-9999',
  address: 'Av. Saquarema — Saquarema, RJ',
  email: 'contato@bemcrescer.com.br',
  site: 'www.bemcrescer.com.br',
  about: 'Clínica especializada em terapias infantis com foco no desenvolvimento integral da criança.',
};

export const ADMIN_USER = {
  name: 'Dr. Daniel',
  fullName: 'Dr. Daniel Matias',
  role: 'Coordenadora',
  register: 'CRP 06/123456',
  phone: '(99) 99999-0000',
  email: '',
  initials: 'DC',
};
