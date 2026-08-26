import { useForm, type InertiaForm } from '@inertiajs/vue3';
import type { ZodType } from 'zod';

/**
 * Substitui `react-hook-form` + `zodResolver`.
 *
 * Envolve o `useForm` do Inertia (que já cuida de `processing`, `errors`
 * vindos do servidor e `reset`) e adiciona validação com o mesmo schema Zod
 * usado antes. Os erros do Zod são escritos no mesmo `form.errors` em que o
 * backend escreve os dele — a `<Input>` não precisa saber a origem.
 */
export function useZodForm<TData extends Record<string, any>>(
  schema: ZodType<any, any, TData>,
  initial: TData,
) {
  const form: InertiaForm<TData> = useForm<TData>(initial);

  /** Valida no cliente; devolve `true` quando o schema passa. */
  function validate(): boolean {
    const result = schema.safeParse({ ...form.data() } as TData);

    form.clearErrors();
    if (result.success) return true;

    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string') {
        form.setError(field as keyof TData & string, issue.message);
      }
    }
    return false;
  }

  /** Só chama `handler` (normalmente `form.post(...)`) se a validação passar. */
  function handleSubmit(handler: (form: InertiaForm<TData>) => void) {
    return () => {
      if (validate()) handler(form);
    };
  }

  return { form, validate, handleSubmit };
}
