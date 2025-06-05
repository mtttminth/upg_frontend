export type HomeState = {
  loading: boolean;
  homeErrors: any;
  success: boolean;
  homeMessage: string;
  banner: Banner;
  releaseList: Release[];
  resourceList: Resource[];
  dashboardOverview: DashboardOverview;
}

export type Banner = {
  id: number;
  image: string;
}

export type Release = {
  id: number;
  image: string;
  name: string;
  department: string;
  release_status: string;
  created_at: string;
}

export type Resource = {
  id: number;
  name: string;
} 

export type DashboardOverview = {
  overall: number;
  hr_document: number;
  iso_document: number;
  'non-iso_document': number;
}