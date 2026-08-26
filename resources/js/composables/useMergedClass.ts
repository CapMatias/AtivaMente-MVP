import { clsx, type ClassValue } from 'clsx';
import { computed, useAttrs, type ComputedRef } from 'vue';
import { twMerge } from 'tailwind-merge';

/** Junta classes Tailwind resolvendo conflitos (a última vence). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Mescla as classes base de um componente com a `class` recebida do pai.
 *
 * Substitui o padrão `className={...}` do React Native: em Vue os atributos
 * caem por fallthrough, então os componentes usam `inheritAttrs: false` e
 * reaplicam `attrs` sem a classe, junto da classe já mesclada.
 */
export function useMergedClass(base: ClassValue | (() => ClassValue)): {
  classes: ComputedRef<string>;
  rest: ComputedRef<Record<string, unknown>>;
} {
  const attrs = useAttrs();

  const classes = computed(() =>
    cn(typeof base === 'function' ? base() : base, attrs.class as ClassValue),
  );

  const rest = computed(() => {
    const { class: _class, ...others } = attrs;
    return others;
  });

  return { classes, rest };
}
