import ApprovalsNetworkRepository from '@/repositories/network/ApprovalsNetworkRepository'
import ApprovalStatusList from '@/repositories/default/ApprovalStatusList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

const useGetMasterApprovalTypesList = (options = {}, formatter = (data) => data) => {
  return useQuery({
    queryKey: ['APPROVAL_MASTER_TYPES_LIST_KEY'],
    initialData: [],
    queryFn: async () => {
      const response = await ApprovalsNetworkRepository.getMasterApprovalTypesList()
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const useGetApprovalStatusList = (options = {}, formatter = (data) => data) => {
  return useQuery({
    queryKey: ['APPROVAL_STATUS_LIST_KEY'],
    initialData: [],
    queryFn: () => {
      const response = ApprovalStatusList.get()
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const useGetApprovalsList = (payload, options = {}, formatter = (data) => data) => {
  return useQuery({
    queryKey: ['APPROVAL_LIST_KEY', payload],
    initialData: [],
    queryFn: async () => {
      const response = await ApprovalsNetworkRepository.getApprovalsList(payload)
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const useGetApprovalDetail = (payload, options = {}, formatter = (data) => data) => {
  return useQuery({
    queryKey: ['APPROVAL_DETAIL_KEY', payload],
    initialData: [],
    queryFn: async () => {
      const response = await ApprovalsNetworkRepository.getApprovalDetail(payload)
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const useSubmitRejectApproval = (options = {}, formatter = (data) => data) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const response = await ApprovalsNetworkRepository.rejectApproval(payload.id, {
        notes: payload.notes,
      })
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      options.onSuccess?.(data)
    },
    ...options,
  })
}

const useSubmitApproveApproval = (options = {}, formatter = (data) => data) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const response = await ApprovalsNetworkRepository.approveApproval(id)
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      options.onSuccess?.(data)
    },
    ...options,
  })
}

export default {
  useGetApprovalsList,
  useGetApprovalStatusList,
  useGetMasterApprovalTypesList,
  useGetApprovalDetail,
  useSubmitRejectApproval,
  useSubmitApproveApproval,
}
