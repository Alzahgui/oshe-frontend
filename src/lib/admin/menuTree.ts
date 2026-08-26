import type { MenuItem } from '@/types/auth'

export interface FlatMenuItem {
  id: number
  label: string
  icon?: string
  path?: string
  order: number
  required_role?: string
  required_permissions?: string[]
  parentId: number | null
  depth: number
}

/** Flattens the nested MenuItem tree returned by GET /api/menus into a depth-annotated list. */
export function flattenMenus(items: MenuItem[], parentId: number | null = null, depth = 0): FlatMenuItem[] {
  return items.flatMap((item) => [
    {
      id: item.id,
      label: item.label,
      icon: item.icon,
      path: item.path,
      order: item.order,
      required_role: item.required_role,
      required_permissions: item.required_permissions,
      parentId,
      depth,
    },
    ...flattenMenus(item.children ?? [], item.id, depth + 1),
  ])
}

/** IDs of a menu item and every descendant — used to keep the parent picker from offering a cycle. */
export function descendantIds(items: FlatMenuItem[], id: number): Set<number> {
  const ids = new Set<number>([id])
  let added = true
  while (added) {
    added = false
    for (const item of items) {
      if (item.parentId !== null && ids.has(item.parentId) && !ids.has(item.id)) {
        ids.add(item.id)
        added = true
      }
    }
  }
  return ids
}
