export enum EventVersionStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface FlagshipEventVersion {
  id: string;
  version_name: string;
  slug: string;
  version_number: number;
  status: EventVersionStatus;
  start_date: string;
  end_date: string;
  is_current: boolean;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVersionPayload {
  version_name: string;
  slug: string;
  version_number: number;
  start_date: string;
  end_date: string;
  status?: EventVersionStatus;
  is_current?: boolean;
  logo?: File;
}

export interface UpdateVersionPayload extends Partial<CreateVersionPayload> {}
