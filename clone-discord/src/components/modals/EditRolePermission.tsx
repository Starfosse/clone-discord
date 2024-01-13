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
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import {
  AddRoleValidator,
  TAddRoleValidator,
} from "@/lib/validator/add-role-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { MemberRole } from "@prisma/client"
import MemberRoleId, {
  TMemberRoleId,
} from "@/lib/validator/member-role-validator"
import { toast } from "sonner"
import { Check } from "lucide-react"

interface EditRolePermissionProps {
  serverId: string
  MemberRole: MemberRole
  showModalEditRole: boolean
  onClickShowModalEditRole: () => void
  refetch: () => Promise<any>
}

const EditRolePermission = (
  EditRolePermissionProps: EditRolePermissionProps
) => {
  const data = EditRolePermissionProps.MemberRole
  const form = useForm<TMemberRoleId>({
    resolver: zodResolver(MemberRoleId),
    defaultValues: {
      serverId: EditRolePermissionProps.serverId,
      id: data.id,
      role: data.role,
      invite_Member: data.invite_Member,
      expulsate_Member: data.expulsate_Member,
      edit_Server: data.edit_Server,
      role_Management: data.role_Management,
      view_Logs: data.view_Logs,
      create_Remove_Channel: data.create_Remove_Channel,
      edit_Channel: data.edit_Channel,
      view_Channel: data.view_Channel,
      write_Channel: data.write_Channel,
      speak_Channel: data.speak_Channel,
      video_Channel: data.video_Channel,
      download_Channel: data.download_Channel,
    },
  })

  const { mutate } = trpc.EditMemberRole.useMutation({
    onSuccess: () => {
      EditRolePermissionProps.refetch()
    },
  })

  const onSubmit = (data: TMemberRoleId) => {
    console.log("???")
    mutate(data)
    EditRolePermissionProps.onClickShowModalEditRole()
    console.log("???")
    console.log("???")
    console.log("???")
    console.log("???")
    console.log("???")

    console.log("???")
  }

  return (
    <Dialog
      open={EditRolePermissionProps.showModalEditRole}
      onOpenChange={
        EditRolePermissionProps.onClickShowModalEditRole
      }>
      <DialogContent className="sm:max-w-[425px] max-h-[90%] overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4">
            <div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du rôle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={data.role}
                        {...field}
                      />
                    </FormControl>
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
                                // checked={action.value}
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
                <Button
                  type="submit"
                  onClick={() =>
                    toast.success(
                      <div className="flex items-center">
                        <Check />
                        &nbsp;Le rôle a bien été créé
                      </div>,
                      { duration: 3000 }
                    )
                  }>
                  Modifier
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditRolePermission
