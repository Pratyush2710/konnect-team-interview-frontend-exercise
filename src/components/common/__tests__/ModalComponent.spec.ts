import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalComponent from '../ModalComponent.vue'

describe('ModalComponent test', () => {
  it('emits the "close" event when clicking outside the modal content', () => {
    const wrapper = mount(ModalComponent)
    const modal = wrapper.findTestId('modal-container')
    const modalBody = wrapper.findTestId('modal-body')
    modalBody.trigger('click')
    // Clicking inside modal body should not emit close event
    expect(wrapper.emitted('close')).toBeUndefined()
    modal.trigger('click')
    // Outside modal click should emit close event
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('slot content replaces the modal-body and close button should close the modal', () => {
    const customContent = 'Custom modal body to be rendered'
    const wrapper = mount(ModalComponent, {
      slots: {
        default: customContent,
      },
    })
    const modalBody = wrapper.findTestId('modal-body')
    expect(modalBody.text()).toBe(customContent)
  })
})
