import RoleNetworkRepository from '@/repositories/network/RoleNetworkRepository'

const createRoles = (payload) => RoleNetworkRepository.createRoles(payload)

const updateRoles = (id, payload) => RoleNetworkRepository.updateRoles(id, payload)

const getRoles = async () => {
  return await RoleNetworkRepository.getRoles()
}

const getRoleById = async (id) => {
  return await RoleNetworkRepository.getRoleById(id)
}

export default { createRoles, updateRoles, getRoles, getRoleById }
