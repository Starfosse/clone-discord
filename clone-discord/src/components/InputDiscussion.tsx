import { trpc } from "@/app/_trpc/client"
import {
  TDiscussionProps,
  discussionProps,
} from "@/lib/validator/discussion-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Input } from "./ui/input"

interface discussionIdProps {
  discussionId: string
  friend: string
}

const InputDiscussion = ({
  discussionId,
  friend,
}: discussionIdProps) => {
  const utils = trpc.useUtils()
  const { mutate: addMessage } =
    trpc.addInputDiscussion.useMutation({
      onSuccess: () => utils.getInputChat.invalidate(),
    })
  const form = useForm<TDiscussionProps>({
    resolver: zodResolver(discussionProps),
    defaultValues: {
      message: "",
    },
  })
  const onSubmit = ({ message }: TDiscussionProps) => {
    form.reset()
    if (message === "") return
    addMessage({ discussionId, message })
    form.reset()
  }
  return (
    <div className="bg-primaryColor h-14 overflow-hidden">
      <div className=" w-[98%] mx-auto bg-secondaryColor rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Envoyez un message à @${friend}`}
                      className="relative w-full h-full bg-secondaryColor border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default InputDiscussion
