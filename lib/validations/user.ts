import * as z from 'zod'

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: 'name has to be at least 3 characters long' })
    .max(30),
  username: z
    .string()
    .min(3, { message: 'username has to be at least 3 characters long' })
    .max(30),
  bio: z
    .string()
    .min(3, { message: 'bio has to be at least 3 characters long' })
    .max(1000),
})
