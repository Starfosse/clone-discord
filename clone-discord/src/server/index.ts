import { createTRPCRouter } from "./trpc"
import getUser from "./procedures/getUser"
import updateUser from "./procedures/updateUser"
import createServer from "./procedures/createServer"
import getUserListServ from "./procedures/getUserListServ"
import getServer from "./procedures/getServ"
import getChannels from "./procedures/getChannels"

export const appRouter = createTRPCRouter({
  getUser: getUser,
  updateUser: updateUser,
  createServer: createServer,
  getUserListServ: getUserListServ,
  getServer: getServer,
  getChannels: getChannels,
})

export type AppRouter = typeof appRouter
