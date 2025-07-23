import RoleNetworkRepository from '@/repositories/network/RoleNetworkRepository'
import { useAppQuery, useAppMutation, createQueryKey } from '@/plugins/QueryPlugin'
import { unref } from 'vue'

const ROLES_QUERY_KEY = 'roles'
const ROLE_DETAIL_QUERY_KEY = 'role-detail'

const createRoles = (payload) => RoleNetworkRepository.createRoles(payload)

const updateRoles = (id, payload) => RoleNetworkRepository.updateRoles(id, payload)

const getRoles = async () => {
  return await RoleNetworkRepository.getRoles()
}

const getRoleById = async (id) => {
  return await RoleNetworkRepository.getRoleById(id)
}

const useGetRoles = (options = {}) => {
  return useAppQuery([ROLES_QUERY_KEY], getRoles, {
    initialData: [],
    ...options,
  })
}

const useGetRoleById = (roleId, options = {}) => {
  return useAppQuery(createQueryKey(ROLE_DETAIL_QUERY_KEY, roleId), getRoleById, {
    payload: roleId,
    initialData: {},
    ...options,
  })
}

const useCreateRole = (options = {}) => {
  return useAppMutation(createRoles, {
    invalidateQueries: [[ROLES_QUERY_KEY]],
    ...options,
  })
}

const useUpdateRole = (roleId, options = {}) => {
  return useAppMutation((payload) => updateRoles(unref(roleId), payload), {
    invalidateQueries: [[ROLE_DETAIL_QUERY_KEY, roleId], [ROLES_QUERY_KEY]],
    ...options,
  })
}

export default {
  createRoles,
  updateRoles,
  getRoles,
  getRoleById,

  useGetRoles,
  useGetRoleById,
  useCreateRole,
  useUpdateRole,
}
