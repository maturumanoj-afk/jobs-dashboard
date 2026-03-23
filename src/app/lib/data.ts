import { gql } from './graphql-client';
import type { JobsPage, Job, JobInput } from './types';

const JOB_FIELDS = `
  id
  jobTitle
  department
  level
  location
  marketMedian
  internalMedian
  compaRatio
  status
  employmentType
  remoteEligible
  headcountBudget
  createdAt
`;

export async function fetchJobs(params: {
  query?: string;
  status?: string;
  department?: string;
  page?: number;
  pageSize?: number;
}): Promise<JobsPage> {
  const data = await gql<{ jobs: JobsPage }>(
    `query GetJobs(
      $query: String
      $status: String
      $department: String
      $page: Int
      $pageSize: Int
    ) {
      jobs(query: $query, status: $status, department: $department, page: $page, pageSize: $pageSize) {
        jobs { ${JOB_FIELDS} }
        totalCount
        totalPages
      }
    }`,
    params,
  );
  return data.jobs;
}

export async function fetchJob(id: string): Promise<Job | null> {
  const data = await gql<{ job: Job | null }>(
    `query GetJob($id: ID!) { job(id: $id) { ${JOB_FIELDS} } }`,
    { id },
  );
  return data.job;
}

export async function fetchDepartments(): Promise<string[]> {
  const data = await gql<{ departments: string[] }>(`query { departments }`);
  return data.departments;
}

export async function fetchStatuses(): Promise<string[]> {
  const data = await gql<{ statuses: string[] }>(`query { statuses }`);
  return data.statuses;
}

export async function createJob(input: JobInput): Promise<Job> {
  const data = await gql<{ createJob: Job }>(
    `mutation CreateJob($input: JobInput!) { createJob(input: $input) { ${JOB_FIELDS} } }`,
    { input },
  );
  return data.createJob;
}

export async function updateJob(id: string, input: JobInput): Promise<Job> {
  const data = await gql<{ updateJob: Job }>(
    `mutation UpdateJob($id: ID!, $input: JobInput!) { updateJob(id: $id, input: $input) { ${JOB_FIELDS} } }`,
    { id, input },
  );
  return data.updateJob;
}

export async function deleteJob(id: string): Promise<boolean> {
  const data = await gql<{ deleteJob: boolean }>(
    `mutation DeleteJob($id: ID!) { deleteJob(id: $id) }`,
    { id },
  );
  return data.deleteJob;
}
