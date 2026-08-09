// ── src/lib/admin/formSchema.ts ────────────────────────────────────────────
// Builds a zod schema + Laravel-shaped submit payload from a ResourceConfig's
// FieldDef[], so every generic admin form gets validation without a bespoke
// schema per resource.

import { z } from 'zod'
import type { FieldDef } from './resourceConfig'

export function buildFormSchema(fields: FieldDef[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    if (field.type === 'boolean') {
      shape[field.key] = z.boolean()
    } else if (field.type === 'number') {
      shape[field.key] = field.required === false
        ? z.number().nullable().optional()
        : z.number({ message: 'Тоо оруулна уу' })
    } else if (field.type === 'select') {
      shape[field.key] = z.string().min(1, 'Сонгоно уу')
    } else {
      shape[field.key] = field.required === false
        ? z.string().optional()
        : z.string().min(1, 'Заавал бөглөнө үү')
    }
  }

  return z.object(shape)
}

/** Converts camelCase form values to the snake_case body the Laravel validators expect. */
export function buildPayload(fields: FieldDef[], values: Record<string, unknown>) {
  const payload: Record<string, unknown> = {}
  for (const field of fields) {
    let value = values[field.key]
    if (field.type === 'text' && field.required === false && value === '') value = null
    payload[field.apiKey] = value
  }
  return payload
}
