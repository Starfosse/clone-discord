import { createTRPCRouter } from "./trpc"
import getUser from "./procedures/getUser"
import updateUser from "./procedures/updateUser"
import createServer from "./procedures/createServer"
import getUserListServ from "./procedures/getUserListServ"
import getServer from "./procedures/getServ"
import getChannels from "./procedures/getChannels"
import deleteServer from "./procedures/deleteServer"
import quitServer from "./procedures/quitServer"
import createcategory from "./procedures/createCategory"
import createChannel from "./procedures/createChannel"
import editServer from "./procedures/editServer"
import createRole from "./procedures/createRole"
import getRoleServer from "./procedures/getRoleServer"
import EditMemberRole from "./procedures/EditMemberRole"
import EditOrderMemberRole from "./procedures/EditOrderMemberRole"
import deleteRole from "./procedures/DeleteRole"
import getChannelsGroups from "./procedures/getChannelsGroups"

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
  createRole: createRole,
  getRoleServer: getRoleServer,
  EditMemberRole: EditMemberRole,
  EditOrderMemberRole: EditOrderMemberRole,
  deleteRole: deleteRole,
  getChannelsGroups: getChannelsGroups,
})

export type AppRouter = typeof appRouter
