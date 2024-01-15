import { createTRPCRouter } from "./trpc"
import getUser from "./procedures/user/getUser"
import updateUser from "./procedures/user/updateUser"
import createServer from "./procedures/server/createServer"
import getUserListServ from "./procedures/server/getUserListServ"
import getServer from "./procedures/server/getServ"
import getChannels from "./procedures/channel/getChannels"
import deleteServer from "./procedures/server/deleteServer"
import quitServer from "./procedures/server/quitServer"
import createcategory from "./procedures/category/createCategory"
import createChannel from "./procedures/channel/createChannel"
import editServer from "./procedures/server/editServer"
import createRole from "./procedures/role/createRole"
import getRoleServer from "./procedures/role/getRoleServer"
import EditMemberRole from "./procedures/role/EditMemberRole"
import EditOrderMemberRole from "./procedures/role/EditOrderMemberRole"
import deleteRole from "./procedures/role/DeleteRole"
import getChannelsGroups from "./procedures/category/getChannelsGroups"
import getChannelsByGroupId from "./procedures/channel/getChannelsByGroupId"
import createChannelByGroupId from "./procedures/channel/createChannelByGroupId"
import deleteChannel from "./procedures/channel/deleteChannel"
import editChannel from "./procedures/channel/editChannel"
import editCategory from "./procedures/category/editCategory"
import deleteCategory from "./procedures/category/deleteCategory"

export const appRouter = createTRPCRouter({
  getUser,
  updateUser,
  createServer,
  getUserListServ,
  getServer,
  getChannels,
  deleteServer,
  quitServer,
  createcategory,
  createChannel,
  editServer,
  createRole,
  getRoleServer,
  EditMemberRole,
  EditOrderMemberRole,
  deleteRole,
  getChannelsGroups,
  getChannelsByGroupId,
  createChannelByGroupId,
  deleteChannel,
  editChannel,
  editCategory,
  deleteCategory,
})

export type AppRouter = typeof appRouter
