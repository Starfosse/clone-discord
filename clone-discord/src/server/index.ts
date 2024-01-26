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
import getMemberByRole from "./procedures/member/getMemberByRole"
import getUserByMember from "./procedures/user/getUserByMember"
import getRolesByChannel from "./procedures/channel/getRolesByChannel"
import getRoleById from "./procedures/role/getRoleById"
import isPrivate from "./procedures/channel/isPrivate"
import getRolesOfMember from "./procedures/member/getRolesOfMember"
import giveMemberRoles from "./procedures/member/giveMemberRoles"
import getChannelById from "./procedures/channel/getChannelById"
import addInputChannel from "./procedures/inputChannel/addInputChannel"
import getInputChannel from "./procedures/inputChannel/getInputsChannel"
import getUsersByMemberByServer from "./procedures/user/getUsersByMemberByServer"
import hello from "./procedures/user/hello"
import deleteInputChannel from "./procedures/inputChannel/deleteInputChannel"
import editInputChannel from "./procedures/inputChannel/editInputChannel"
import joinMemberToChannel from "./procedures/channel/joinMemberToChannel"
import getMemberByUser from "./procedures/member/getMemberByUser"
import getChannelUsers from "./procedures/channel/getChannelUsers"
import editImage from "./procedures/user/editImage"

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
  getMemberByRole,
  getUserByMember,
  getRolesByChannel,
  getRoleById,
  isPrivate,
  getRolesOfMember,
  giveMemberRoles,
  getChannelById,
  addInputChannel,
  getInputChannel,
  getUsersByMemberByServer,
  hello,
  deleteInputChannel,
  editInputChannel,
  joinMemberToChannel,
  getMemberByUser,
  getChannelUsers,
  editImage,
})

export type AppRouter = typeof appRouter
