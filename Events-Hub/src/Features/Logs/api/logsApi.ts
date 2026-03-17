import { safeRequest } from "../../../Api/ApiConfig";
import type { AuditLog } from "../types";

export const getAuditLogs = async (): Promise<AuditLog[]> => {
  return await safeRequest<AuditLog[]>("GET", "/audit-logs");
};
