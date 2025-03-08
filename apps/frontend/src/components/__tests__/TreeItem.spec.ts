import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TreeItem from '../TreeItem.vue'

describe('TreeItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TreeItem, {
      props: {
        item: {
          id: 1,
          name: 'My folder',
          type: 'folder',
          folder: '/',
          items: [],
        },
      },
    })

    expect(wrapper.text()).toContain('My folder')
  })
})
