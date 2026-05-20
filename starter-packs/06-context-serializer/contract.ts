export interface UiContextSnapshot {
  route: string;
  selectedRecordId?: string;
  actorRole?: string;
  visibleFields: string[];
  tenantId?: string;
  redactions?: string[];
}
