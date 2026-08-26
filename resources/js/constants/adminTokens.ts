/** Helpers de cor portados 1:1 do protótipo Figma Make. */

const SPECIALTY_MAP: Record<string, string> = {
  Fonoaudiologia: 'bg-blue-50 text-blue-700 border-blue-200',
  Psicologia: 'bg-purple-50 text-purple-700 border-purple-200',
  'T. Ocupacional': 'bg-green-50 text-green-700 border-green-200',
  Fisioterapia: 'bg-amber-50 text-amber-700 border-amber-200',
};

export function specialtyColor(specialty: string): string {
  return SPECIALTY_MAP[specialty] ?? 'bg-slate-50 text-slate-600 border-slate-200';
}

export function statusColor(status: string): string {
  if (status === 'Ativo' || status === 'Confirmado' || status === 'Concluído') {
    return 'bg-green-50 text-green-700 border-green-200';
  }
  if (status === 'Em Atendimento') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (status === 'Aguardando') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-50 text-slate-500 border-slate-200';
}

export const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-indigo-500',
];

/** "Sofia Almeida" -> "SA" */
export function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

/** "Dra. Carla Mendes" -> "Mendes" (usado nas listagens compactas). */
export function lastName(name: string): string {
  return name.split(' ').slice(-1)[0];
}
