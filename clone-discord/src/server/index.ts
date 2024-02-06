import createcategory from "./procedures/category/createCategory"
import deleteCategory from "./procedures/category/deleteCategory"
import editCategory from "./procedures/category/editCategory"
import getChannelsGroups from "./procedures/category/getChannelsGroups"
import createChannel from "./procedures/channel/createChannel"
import createChannelByGroupId from "./procedures/channel/createChannelByGroupId"
import deleteChannel from "./procedures/channel/deleteChannel"
import editChannel from "./procedures/channel/editChannel"
import getChannelById from "./procedures/channel/getChannelById"
import getChannelUsers from "./procedures/channel/getChannelUsers"
import getChannels from "./procedures/channel/getChannels"
import getChannelsByGroupId from "./procedures/channel/getChannelsByGroupId"
import getRolesByChannel from "./procedures/channel/getRolesByChannel"
import isPrivate from "./procedures/channel/isPrivate"
import joinMemberToChannel from "./procedures/channel/joinMemberToChannel"
import addFriend from "./procedures/friend/add-friend"
import addGifDiscussion from "./procedures/friend/add-gif-discussion"
import deleteFriend from "./procedures/friend/delete-friend"
import deleteInputChat from "./procedures/friend/delete-input-chat"
import editInputChat from "./procedures/friend/edit-input-chat"
import editMessageShown from "./procedures/friend/edit-message-shown"
import editMessageShownBypage from "./procedures/friend/edit-message-shown-by-page"
import getAllFriends from "./procedures/friend/get-all-friends"
import getFriendDiscussion from "./procedures/friend/get-friend-discussion"
import getFriendsOnline from "./procedures/friend/get-friends-online"
import getInputChat from "./procedures/friend/get-input-chat"
import getListDiscussion from "./procedures/friend/get-list-discussion"
import getListUnseenDiscussion from "./procedures/friend/get-list-unseen-discussion"
import getUsersDiscussion from "./procedures/friend/get-users-discussion"
import addInputDiscussion from "./procedures/friend/input-discussion"
import pendingInvitationFriend from "./procedures/friend/pending-invitation-friend"
import unshowDiscussion from "./procedures/friend/unshow-discussion"
import validFriendDemand from "./procedures/friend/valid-friend-demand"
import addGifInputChannel from "./procedures/inputChannel/addGifInputChannel"
import addInputChannel from "./procedures/inputChannel/addInputChannel"
import deleteInputChannel from "./procedures/inputChannel/deleteInputChannel"
import editInputChannel from "./procedures/inputChannel/editInputChannel"
import getInputChannel from "./procedures/inputChannel/getInputsChannel"
import expelMember from "./procedures/member/expelMember"
import getMemberByRole from "./procedures/member/getMemberByRole"
import getMemberByUser from "./procedures/member/getMemberByUser"
import getRolesOfMember from "./procedures/member/getRolesOfMember"
import getListPermissions from "./procedures/member/getlistPermissions"
import giveMemberRoles from "./procedures/member/giveMemberRoles"
import deleteRole from "./procedures/role/DeleteRole"
import EditMemberRole from "./procedures/role/EditMemberRole"
import EditOrderMemberRole from "./procedures/role/EditOrderMemberRole"
import createRole from "./procedures/role/createRole"
import getListRoleByMember from "./procedures/role/getListRoleByMember"
import getRoleById from "./procedures/role/getRoleById"
import getRoleServer from "./procedures/role/getRoleServer"
import createServer from "./procedures/server/createServer"
import deleteServer from "./procedures/server/deleteServer"
import editServer from "./procedures/server/editServer"
import findFirstPublicChannel from "./procedures/server/findFirstPublicChannel"
import getServer from "./procedures/server/getServ"
import getUserListServ from "./procedures/server/getUserListServ"
import quitServer from "./procedures/server/quitServer"
import createNewUser from "./procedures/user/createNewUser"
import editImage from "./procedures/user/editImage"
import getUser from "./procedures/user/getUser"
import getUserByMember from "./procedures/user/getUserByMember"
import getUserId from "./procedures/user/getUserId"
import getUsersByMemberByServer from "./procedures/user/getUsersByMemberByServer"
import hello from "./procedures/user/hello"
import updateUser from "./procedures/user/updateUser"
import { createTRPCRouter } from "./trpc"

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
  addGifInputChannel,
  addFriend,
  pendingInvitationFriend,
  createNewUser,
  validFriendDemand,
  getFriendsOnline,
  getAllFriends,
  getFriendDiscussion,
  addInputDiscussion,
  getInputChat,
  getUsersDiscussion,
  deleteInputChat,
  editInputChat,
  getListDiscussion,
  getListRoleByMember,
  unshowDiscussion,
  deleteFriend,
  getListUnseenDiscussion,
  editMessageShown,
  editMessageShownBypage,
  addGifDiscussion,
  findFirstPublicChannel,
  expelMember,
  getListPermissions,
  getUserId,
})

export type AppRouter = typeof appRouter
