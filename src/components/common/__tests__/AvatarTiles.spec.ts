import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { type Developer } from '@/common/types'
import AvatarTiles from '../AvatarTiles.vue'
describe('AvatarTiles tests', () => {
  it('should render avatar items per limit and offset time if there are more users', () => {
    const users: Developer[] = [
      {
        id: '50d292d3-49e2-4261-b88f-8cb85642cfc8',
        name: "Stuart Doyle-D'Amore",
        email: 'Stuart_Doyle-DAmore@hotmail.com',
        avatar: 'https://avatars.githubusercontent.com/u/67181384',
      },
      {
        id: 'b696c390-e793-4324-9f40-82cc8f354a1a',
        name: 'Marilyn Gusikowski',
        email: 'Marilyn.Gusikowski32@hotmail.com',
        avatar: 'https://avatars.githubusercontent.com/u/38734936',
      },
      {
        id: '6b965c7e-27d1-4616-b634-58fbf98c0b8d',
        name: 'Lester Gleason',
        email: 'Lester_Gleason28@gmail.com',
        avatar: 'https://avatars.githubusercontent.com/u/6992175',
      },
    ]
    const limit = 2

    const wrapper = mount(AvatarTiles, {
      props: {
        users,
        limit,
      },
    })

    const avatarList = wrapper.findTestId('avatar-list')
    const avatars = avatarList.findAll('.avatar')

    expect(avatarList.isVisible()).toBe(true)
    expect(avatars.length).toBe(limit)

    const offsetTile = wrapper.find('.offset-tile')
    expect(offsetTile.exists()).toBe(true)

    avatars.forEach((avatar, index) => {
      expect(avatar.attributes('src')).toBe(users[index].avatar)
      expect(avatar.attributes('alt')).toBe(users[index].name)
    })
  })
})
