import { ref } from 'vue';

type ToastType = 'success' | 'error' | 'info';

/** Estado local do `<Toast>` — equivalente ao par `useState` do React. */
export function useToast() {
  const visible = ref(false);
  const message = ref('');
  const type = ref<ToastType>('info');

  function show(text: string, kind: ToastType = 'info') {
    message.value = text;
    type.value = kind;
    visible.value = true;
  }

  function hide() {
    visible.value = false;
  }

  return { visible, message, type, show, hide };
}
