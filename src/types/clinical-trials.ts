export type StudyStatus =
  | "RECRUITING"
  | "NOT_YET_RECRUITING"
  | "ACTIVE_NOT_RECRUITING"
  | "COMPLETED"
  | "ENROLLING_BY_INVITATION"
  | "SUSPENDED"
  | "TERMINATED"
  | "WITHDRAWN"
  | "AVAILABLE"
  | "NO_LONGER_AVAILABLE"
  | "UNKNOWN";

export interface Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
    };
    statusModule: {
      overallStatus: StudyStatus;
      startDateStruct?: { date?: string };
      completionDateStruct?: { date?: string };
      studyFirstPostDateStruct?: { date?: string };
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: { name?: string };
    };
    conditionsModule?: { conditions?: string[] };
    designModule?: {
      phases?: string[];
      enrollmentInfo?: { count?: number; type?: string };
    };
    contactsLocationsModule?: {
      locations?: Array<{
        city?: string;
        state?: string;
        country?: string;
        geoPoint?: { lat?: number; lon?: number };
      }>;
    };
    descriptionModule?: { briefSummary?: string };
  };
}

export interface StudiesResponse {
  studies: Study[];
  nextPageToken?: string;
  totalCount?: number;
}

export interface StudySearchParams {
  query?: string;
  status?: StudyStatus | "";
  country?: string;
  phase?: string;
  pageToken?: string;
  pageSize?: number;
}
