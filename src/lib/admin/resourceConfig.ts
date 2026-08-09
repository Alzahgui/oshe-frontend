// ── src/lib/admin/resourceConfig.ts ───────────────────────────────────────
// Config-driven shape for the generic admin CRUD engine (ResourceListPage /
// ResourceFormPage). One config per flat backend resource — see src/lib/admin/configs/.

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  /** camelCase key on the fetched record (matches src/types/content.ts). */
  key: string;
  /** snake_case key expected by the Laravel store/update validators. */
  apiKey: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  required?: boolean;
  /** Shown next to text fields whose value is a hex/rgba color or icon name. */
  preview?: "color" | "icon";
}

export interface ColumnDef {
  key: string;
  label: string;
}

export interface ResourceConfig<T extends { id: number }> {
  /** Matches the route segment in routes/api.php, e.g. "news-articles". */
  apiPath: string;
  /** Singular display name, e.g. "Мэдээ". */
  label: string;
  /** Plural display name, e.g. "Мэдээнүүд". */
  labelPlural: string;
  listColumns: ColumnDef[];
  formFields: FieldDef[];
  /** React Query key used for the list — matches the matching hook in useContent.ts
   * so admin mutations invalidate the public page's cached data too. */
  queryKey: unknown[];
  /** Builds sensible blank defaults for the create form. */
  emptyValues: () => Record<string, unknown>;
  __type?: T;
}
