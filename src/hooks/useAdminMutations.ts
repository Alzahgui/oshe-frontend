// ── src/hooks/useAdminMutations.ts ────────────────────────────────────────
// Generic authenticated create/update/delete mutations shared by every admin
// CRUD resource. All 3 hit the auth:sanctum-gated store/update/destroy routes
// in yosh-backend's routes/api.php and invalidate the given query key so both
// the admin list and (when the key matches) the public home page's
// useContent.ts hooks refetch fresh data.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useCreateResource<T>(apiPath: string, queryKey: unknown[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      api.post<{ data: T }>(`/api/${apiPath}`, payload).then((r) => r.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useUpdateResource<T>(apiPath: string, queryKey: unknown[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number | string; payload: Record<string, unknown> }) =>
      api.put<{ data: T }>(`/api/${apiPath}/${id}`, payload).then((r) => r.data.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useDeleteResource(apiPath: string, queryKey: unknown[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => api.delete(`/api/${apiPath}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}
