export interface AuditLog {
  id: number;
  admin_id: number | null;
  action: string;
  entity: string;
  entity_id: number | null;
  created_at: string;
}
