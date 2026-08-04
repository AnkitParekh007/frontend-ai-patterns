import { Injectable } from '@angular/core';
import { UiContext } from '../models/ui-context.model';

export interface SerializableRecord {
  id: string;
  route: string;
  pageTitle: string;
  status: string;
  owner: string;
  visibleFields: string[];
  role: string;
}

export function buildUiContext(record: SerializableRecord): UiContext {
  return {
    route: record.route,
    pageTitle: record.pageTitle,
    selectedRecordId: record.id,
    visibleFields: record.visibleFields,
    userRole: record.role,
    selectedRecordStatus: record.status,
    selectedRecordOwner: record.owner,
  };
}

@Injectable({ providedIn: 'root' })
export class ContextSerializerService {
  serialize(record: SerializableRecord): UiContext {
    return buildUiContext(record);
  }
}
