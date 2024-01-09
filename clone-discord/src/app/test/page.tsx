"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const listActions = [
  {
    name: "Gestion du server",
    actions: [
      {
        action: "Inviter",
        description: "Permet d'inviter de nouveaux membres",
        value: "invite_Member" as const,
      },
      {
        action: "Expulser",
        description: "Permet d'expluser un membre",
        value: "expulsate_Member" as const,
      },
      {
        action: "Modifier le serveur",
        description:
          "Permet la modification du profil du serveur",
        value: "edit_Server" as const,
      },
      {
        action: "Gestion des rôles",
        description:
          "Permet de créer,attribuer et modifier les rôles",
        value: "role_Management" as const,
      },
      {
        action: "Voir les logs",
        description:
          "Permet de consulter l'historique des actions administrateurs du serveur",
        value: "view_Logs" as const,
      },
    ],
  },
  {
    name: "Gestions des salons et catégories",
    actions: [
      {
        action: "Créér/Supprimer",
        description:
          "Permet la création et suppression des salons ou catégories",
        value: "create_Remove_Channel" as const,
      },
      {
        action: "Modifier",
        description:
          "Permet la modification du profil d'un salon ou catégorie'",
        value: "edit_Channel" as const,
      },
      {
        action: "Voir",
        description: "Permet de voir les salons non-privés",
        value: "view_Channel" as const,
      },
      {
        action: "Ecrire",
        description:
          "Permet décrire dans les salons non-privés",
        value: "write_Channel" as const,
      },
      {
        action: "Parler",
        description:
          "Permet de parler les salons non-privés",
        value: "speak_Channel" as const,
      },
      {
        action: "Vidéo",
        description:
          "Permet de démarrer un chat visuel sur les salons non-privés",
        value: "video_Channel" as const,
      },
      {
        action: "Télécharger",
        description:
          "Permet de télécharger dans les salons non-privés",
        value: "download_Channel" as const,
      },
    ],
  },
]

const ListActionsValidator = z.object({
  invite_Member: z.boolean().default(false).optional(),
  expulsate_Member: z.boolean().default(false).optional(),
  edit_Server: z.boolean().default(false).optional(),
  role_Management: z.boolean().default(false).optional(),
  view_Logs: z.boolean().default(false).optional(),
  create_Remove_Channel: z
    .boolean()
    .default(false)
    .optional(),
  edit_Channel: z.boolean().default(false).optional(),
  view_Channel: z.boolean().default(false).optional(),
  write_Channel: z.boolean().default(false).optional(),
  speak_Channel: z.boolean().default(false).optional(),
  video_Channel: z.boolean().default(false).optional(),
  download_Channel: z.boolean().default(false).optional(),
})

type TListActionsValidator = z.infer<
  typeof ListActionsValidator
>

const editActions = () => {
  const form = useForm<TListActionsValidator>({
    resolver: zodResolver(ListActionsValidator),
    defaultValues: {
      invite_Member: false,
      expulsate_Member: false,
      edit_Server: false,
      role_Management: false,
      view_Logs: false,
      create_Remove_Channel: false,
      edit_Channel: false,
      view_Channel: false,
      write_Channel: false,
      speak_Channel: false,
      video_Channel: false,
      download_Channel: false,
    },
  }) //gérer le schema
  const onSubmit = (data: TListActionsValidator) => {
    console.log("zzzz")
    console.log(data)
  }
  // console.log(listActions[0].actions[1].description)

  return (
    // <Dialog open={true}>
    //   <DialogContent className="sm:max-w-[425px]">
    /* <DialogHeader>
          <DialogTitle>Créer votre serveur</DialogTitle>
          <DialogDescription>
            Vous pourrez tout modifier plus tard.
          </DialogDescription>
        </DialogHeader> */
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium text-white">
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
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base text-white">
                            {action.action}
                          </FormLabel>
                          <FormDescription>
                            {action.description}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    //   </DialogContent>
    // </Dialog>
  )
}

export default editActions
