import { z } from "zod"
import { publicProcedure } from "../trpc"
import { prisma } from "@/lib/db"

const ServerId = z.object({ serverId: z.string() })

const getRoleServer = publicProcedure
  .input(ServerId)
  .query(async ({ input }) => {
    return await prisma.server.findFirst({
      where: { id: input.serverId },
      select: { memberRoles: true },
    })
  })

export default getRoleServer
