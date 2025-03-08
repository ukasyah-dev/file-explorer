import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Tree from '../Tree.vue'

describe('Tree', () => {
  it('renders properly', () => {
    const wrapper = mount(Tree, {
      props: {
        items: [
          {
            id: 1,
            name: 'My folder',
            type: 'folder',
            folder: '/',
            items: [],
          },
        ],
      },
    })

    expect(wrapper.text()).toContain('My folder')
  })
})
