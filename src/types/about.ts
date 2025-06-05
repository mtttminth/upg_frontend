export type AboutState = {
  loading: boolean;
  aboutErrors: any;
  success: boolean;
  aboutMessage: string;
  aboutDetail: AboutDetail;
};

export type CreateAboutBody = {
  policy_and_mission: string;
  our_commitments: string;
  company_organization_structure: string;
};

export type AboutDetail = {
  id: number;
  policy_and_mission: string;
  our_commitments: string;
  company_organization_structure: string;
  company_profile: string;
  video_url: string;
  updated_at?: string | null;
  updated_by?: string | null;
};
