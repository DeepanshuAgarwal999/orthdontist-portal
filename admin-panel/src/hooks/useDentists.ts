import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorService } from "@/services/doctor.service";
import { DentistQueryParams, DentistListResponse, DentistStatistics } from "@/types/dentist";

// Query Keys
export const dentistKeys = {
  all: ["dentists"] as const,
  lists: () => [...dentistKeys.all, "list"] as const,
  list: (params: DentistQueryParams) => [...dentistKeys.lists(), params] as const,
  statistics: () => [...dentistKeys.all, "statistics"] as const,
} as const;

// Hook to fetch dentists with pagination and filters
export const useDentists = (params: DentistQueryParams) => {
  return useQuery({
    queryKey: dentistKeys.list(params),
    queryFn: () => DoctorService.getAllDoctors(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
  });
};

// Hook to fetch dentist statistics
export const useDentistStatistics = () => {
  return useQuery({
    queryKey: dentistKeys.statistics(),
    queryFn: DoctorService.getDoctorStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to verify/unverify dentist
export const useVerifyDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isVerified }: { id: string; isVerified: boolean }) => DoctorService.verifyDentist(id, isVerified),
    onSuccess: () => {
      // Invalidate and refetch dentist lists and statistics
      queryClient.invalidateQueries({ queryKey: dentistKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dentistKeys.statistics() });
    },
  });
};

// Hook to delete dentist
export const useDeleteDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DoctorService.deleteDentist(id),
    onSuccess: () => {
      // Invalidate and refetch dentist lists and statistics
      queryClient.invalidateQueries({ queryKey: dentistKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dentistKeys.statistics() });
    },
  });
};

// Hook to update dentist profile
export const useUpdateDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, updateData }: { userId: string; updateData: any }) => DoctorService.updateDentistProfile(userId, updateData),
    onSuccess: () => {
      // Invalidate and refetch dentist lists
      queryClient.invalidateQueries({ queryKey: dentistKeys.lists() });
    },
  });
};
