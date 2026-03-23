export type JobStatus = 'active' | 'draft' | 'archived';
export type EmploymentType = 'full_time' | 'part_time' | 'contract';

export interface Job {
  id: string;
  jobTitle: string;
  department: string;
  level: string;
  location: string;
  marketMedian: number | null;
  internalMedian: number | null;
  compaRatio: number | null;
  status: JobStatus;
  employmentType: EmploymentType;
  remoteEligible: boolean;
  headcountBudget: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobsPage {
  jobs: Job[];
  totalCount: number;
  totalPages: number;
}

export interface JobInput {
  jobTitle: string;
  department: string;
  level: string;
  location: string;
  marketMedian?: number;
  internalMedian?: number;
  status?: JobStatus;
  employmentType?: EmploymentType;
  remoteEligible?: boolean;
  headcountBudget?: number;
}
