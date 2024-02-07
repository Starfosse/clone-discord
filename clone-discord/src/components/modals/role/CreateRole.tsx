"use client"

import { trpc } from "@/app/_trpc/client"
import listActions from "@/app/config/listActionsRole"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import {
  AddRoleValidator,
  TAddRoleValidator,
} from "@/lib/validator/add-role-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "../../ui/input"

interface Server {
  id: string
  name: string
  imageUrl: string
  inviteCode: string
  userId: string
  createdAt: Date
  updatedAt: Date
  showModalCreateRole: boolean
  onClickCreateRole: () => void
}

const CreateRole = (currentServer: Server) => {
  const form = useForm<TAddRoleValidator>({
    resolver: zodResolver(AddRoleValidator),
    defaultValues: {
      id: currentServer.id,
      order_serv: 1,
      name_role: "",
      invite_Member: false,
      expel_Member: false,
      edit_Server: false,
      delete_Server: false,
      role_Management: false,
      view_Logs: false,
      channel_Management: false,
      view_Channel: false,
      write_Channel: false,
      speak_Channel: false,
      video_Channel: false,
      reaction_Channel: false,
      download_Channel: false,
      category_Management: false,
      delete_Input_Channel: false,
    },
  })

  const { mutate } = trpc.createRole.useMutation({
    onSuccess: () =>
      toast.success(
        <div className="flex items-center">
          <Check />
          &nbsp;Le rôle a bien été créé
        </div>,
        { duration: 3000 }
      ),
  })

  const onSubmit = (data: TAddRoleValidator) => {
    mutate(data)
    currentServer.onClickCreateRole()
  }

  return (
    <Dialog
      open={currentServer.showModalCreateRole}
      onOpenChange={currentServer.onClickCreateRole}>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4">
            <div>
              <FormField
                control={form.control}
                name="name_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du rôle</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h3 className="text-lg font-medium text-white">
                Gestion des rôles
              </h3>
              <div className="space-y-4">
                {listActions.map((list) => (
                  <div key={list.name}>
                    {list.name}
                    {list.actions.map((action) => (
                      <FormField
                        key={action.action}
                        control={form.control}
                        name={action.value}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border px-2 m-2 gap-2">
                            <div className="space-y-0.5">
                              <FormLabel className="">
                                {action.action}
                              </FormLabel>
                              <FormDescription>
                                {action.description}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={
                                  field.onChange
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Button type="submit">Ajouter</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRole
