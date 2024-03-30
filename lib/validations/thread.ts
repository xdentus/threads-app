import * as z from 'zod'

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: 'thread has to be at least 3 characters long' }),
  accountId: z.string(),
})

export const CommentValidation = z.object({
  thread: z
    .string()
    .min(3, { message: 'thread has to be at least 3 characters long' }),
})
