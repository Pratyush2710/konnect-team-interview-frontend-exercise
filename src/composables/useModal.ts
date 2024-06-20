import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const component = ref()

/**
 * Hook to manage a modal component in Vue applications.
 *
 * @returns - An object containing properties and methods to control the visibility and state of the modal
 */
export default function useModal() {
  const hideModal = (): void => {
    show.value = false
  }

  const showModal = (): void => {
    show.value = true
  }
  const handleEscKeyDown = (event: KeyboardEvent): void => {
    // Closing the modal on Esc key press
    if (event.key === 'Escape') {
      hideModal()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscKeyDown)
  })

  return {
    component,
    show,
    showModal,
    hideModal,
  }
}
