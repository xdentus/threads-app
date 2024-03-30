'use client'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { usePathname, useRouter } from 'next/navigation'
import { CommentValidation } from '@/lib/validations/thread'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'
// import { createThread } from '@/lib/actions/thread.actions'
// import { updateUser } from '@/lib/actions/user.actions'

interface Props {
  threadId: string
  currentUserImg: string
  currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    )

    form.reset()
  }

  return (
    <div>
      <h1 className="text-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
            <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    <Image
                      src={currentUserImg}
                      alt="profile image"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </FormLabel>
                  <FormControl className="border-none bg-transparent">
                    <Input
                      type="text"
                      placeholder="comment..."
                      className="no-focus outline-none text-light-1"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="comment-form_btn">
              Reply
            </Button>
          </form>
        </Form>
      </h1>
    </div>
  )
}

export default Comment
