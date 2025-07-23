import UserNetworkRepository from '@/repositories/network/UserNetworkRepository'
import { useAppQuery, useAppMutation, createQueryKey } from '@/plugins/QueryPlugin'

const USERS_QUERY_KEY = 'users'

const createUser = (payload) => UserNetworkRepository.createUser(payload)

const createChannel = (payload) => UserNetworkRepository.createChannel(payload)

/**
 *
 * @param {String} userType - either CHANNEL/USER
 * @returns
 */
const getUsers = async (userType) => {
  const response = await UserNetworkRepository.getUsers(userType)
  if (response.code === 200) {
    response.data = response.data.map((user, index) => {
      return { ...user, no: index + 1, status: user.status === 1 ? 'Aktif' : 'Tidak Aktif' }
    })
  }
  return response
}

const useGetUsers = (userType, options = {}) => {
  return useAppQuery(createQueryKey(USERS_QUERY_KEY, userType), getUsers, {
    payload: userType,
    initialData: [],
    ...options,
  })
}

const useCreateUser = (options = {}) => {
  return useAppMutation(createUser, {
    invalidateQueries: [[USERS_QUERY_KEY]],
    ...options,
  })
}

const useCreateChannel = (options = {}) => {
  return useAppMutation(createChannel, {
    invalidateQueries: [[USERS_QUERY_KEY]],
    ...options,
  })
}

export default {
  createUser,
  createChannel,
  getUsers,

  useGetUsers,
  useCreateUser,
  useCreateChannel,
}
