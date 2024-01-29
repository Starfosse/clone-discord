"use client"

import { trpc } from "@/app/_trpc/client"
import {
  TInputContent,
  inputContent,
} from "@/lib/validator/input-content-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Channel } from "@prisma/client"
import { useForm } from "react-hook-form"
import GiphySearch from "./GiphySearch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form"
import { Input } from "./ui/input"

const InputChannel = (currentChannel: Channel) => {
  const utils = trpc.useUtils()
  // const [selectedGif, setSelectedGif] = useState<string>("")
  // const handleGifSelect = (url: string) => {
  //   setSelectedGif(url)
  //   const channelId = {
  //     id: currentChannel.id,
  //     gif: selectedGif,
  //   }
  //   addGif(channelId)
  //   console.log(selectedGif)
  // }

  // const { mutate: addGif } =
  //   trpc.addGifInputChannel.useMutation({
  //     onSuccess: () => utils.getInputChannel.invalidate(),
  //   })
  const { mutate: addMessage } =
    trpc.addInputChannel.useMutation({
      onSuccess: () => utils.getInputChannel.invalidate(),
    })
  const form = useForm<TInputContent>({
    resolver: zodResolver(inputContent),
    defaultValues: {
      id: currentChannel.id,
      message: "",
    },
  })
  const onSubmit = ({ message }: TInputContent) => {
    const id = currentChannel.id
    addMessage({ id, message })
    form.reset()
  }
  // const [isOpenGif, setIsOpenGif] = useState(false)

  // const handleClickOpenGif = () => {
  //   setIsOpenGif(true)
  // }

  // const closeOpenGif = () => {
  //   setIsOpenGif(false)
  // }
  // console.log(isOpenGif)
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
                      placeholder={`Envoyez un message dans ${currentChannel?.name}`}
                      className="relative w-full h-full  bg-secondaryColor border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      {/*<div className="flex w-[98%] relative flex-row gap-2">
        <div className="text-xs text-black justify-end ml-auto relative bottom-[1.9rem]">
          <DropdownMenu
            open={isOpenGif}
            onOpenChange={closeOpenGif}>
            <DropdownMenuTrigger>
              <button
                onClick={handleClickOpenGif}
                className=" bg-gray-400 p-1 rounded-sm">
                GIF
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-56 text-muted-foreground border-black bg-secondaryColor h-[400px] overflow-scroll overflow-x-hidden relative right-16 bottom-2">
              <DropdownMenuItem>
                <GiphySearch
                  onGifSelect={handleGifSelect}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-xs text-black relative bottom-[1.9rem]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className=" bg-gray-400 p-1 rounded-sm">
                :
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-56 text-muted-foreground bg-tertiaryColor">
              <DropdownMenuItem>
                Inviter des gens (WIP)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
              </div>*/}
    </div>
  )
}

export default InputChannel
//todo retirer la couleur en bg au profit de celle pour le chat, retirer ler border blanc quand focus
//gérer l'envoie du gif dans le formulaire pour l'intégrer dans les input
