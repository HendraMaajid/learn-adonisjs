import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import Roles from '#enums/roles'
import { ProfileFactory } from './profile_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      roleId: Roles.USER,
      fullName: faker.person.fullName(),
      profilePicture: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('profile', () => ProfileFactory)
  .build()
