/**
 * Converte uma data ISO (aaaa-mm-dd) para o formato brasileiro dd/mm/aaaa.
 * Valores que não estão em ISO são devolvidos sem alteração.
 */
export function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}

/** Só dia e mês (dd/mm), para listas compactas. */
export function formatDayMonth(iso?: string | null): string {
  return formatDate(iso).slice(0, 5);
}
