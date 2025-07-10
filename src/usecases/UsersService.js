import UserNetworkRepository from '@/repositories/network/UserNetworkRepository'

const createUser = (payload) => UserNetworkRepository.createUser(payload)

const createAgent = (payload) => UserNetworkRepository.createAgent(payload)

/**
 *
 * @param {String} userType - either AGENT/USER
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

export default { createUser, createAgent, getUsers }
