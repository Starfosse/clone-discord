import { currentUser } from "@clerk/nextjs"
import { publicProcedure } from "../../trpc"
import { prisma } from "@/lib/db"
import { ChannelValidator } from "@/lib/validator/channel-validator"

//ajouter dans les input tous les ids des roles, supprimer ces roles et ajouter les nouveaux

const editChannel = publicProcedure
  .input(ChannelValidator)
  .mutation(async ({ input }) => {
    const user = await currentUser()
    const res = await prisma.channel.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        type: input.type,
        isPrivate: input.isPrivate,
      },
    })
    const size = await prisma.channel.findFirst({
      where: { id: input.id },
      include: { roleRequired: true },
    })
    const roleRequiredSize = size?.roleRequired.length
    if (roleRequiredSize) {
      for (let i = 0; i < roleRequiredSize; i++) {
        const res2 = await prisma.channel.update({
          where: { id: input.id },
          data: {
            roleRequired: {
              disconnect: [{ id: size.roleRequired[i].id }],
            },
          },
        })
      }
    }
    // for (let i = 0; i < input.rolesRequired.length; i++) {
    //   const res3 = await prisma.channel.update({
    //     where: {
    //       id: res.id,
    //     },
    //     data: {
    //       roleRequired: {
    //         connect: [{ id: input.rolesRequired[i] }],
    //       },
    //     },
    //   })
    // }
  })

export default editChannel
