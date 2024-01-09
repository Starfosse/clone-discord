import { createTRPCRouter } from "./trpc"
import getUser from "./procedures/getUser"
import updateUser from "./procedures/updateUser"
import createServer from "./procedures/createServer"
import getUserListServ from "./procedures/getUserListServ"
import getServer from "./procedures/getServ"
import getChannels from "./procedures/getChannels"
import deleteServer from "./procedures/deleteServer"
import quitServer from "./procedures/quitServer"
import createGatory from "./procedures/createCategory"
import createcategory from "./procedures/createCategory"
import createChannel from "./procedures/createChannel"
import editServer from "./procedures/editServer"

export const appRouter = createTRPCRouter({
  getUser: getUser,
  updateUser: updateUser,
  createServer: createServer,
  getUserListServ: getUserListServ,
  getServer: getServer,
  getChannels: getChannels,
  deleteServer: deleteServer,
  quitServer: quitServer,
  createcategory: createcategory,
  createChannel: createChannel,
  editServer: editServer,
})

export type AppRouter = typeof appRouter
