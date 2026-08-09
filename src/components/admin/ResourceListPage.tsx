// ── src/components/admin/ResourceListPage.tsx ─────────────────────────────
'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { LucideIcon } from 'lucide-react'
import { useDeleteResource } from '@/hooks/useAdminMutations'
import { AdminPageHeader } from './AdminPageHeader'
import { ResourceTable } from './ResourceTable'
import type { ResourceConfig } from '@/lib/admin/resourceConfig'

export function ResourceListPage<T extends { id: number }>({
  config,
  useList,
  icon,
}: {
  config: ResourceConfig<T>
  useList: () => UseQueryResult<T[]>
  icon: LucideIcon
}) {
  const { data, isLoading, isError } = useList()
  const deleteMutation = useDeleteResource(config.apiPath, config.queryKey)

  return (
    <div>
      <AdminPageHeader
        icon={icon}
        title={config.labelPlural}
        newHref={`/${config.apiPath}/new`}
        newLabel={`Шинэ ${config.label}`}
      />
      <ResourceTable
        rows={data ?? []}
        columns={config.listColumns}
        isLoading={isLoading}
        isError={isError}
        editBasePath={`/${config.apiPath}`}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  )
}
