const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/api/graphql';

export async function gql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const isServer = typeof window === 'undefined';
  const prefix = isServer ? ' [Server-GQL]' : ' [Client-GQL]';
  const start = Date.now();

  // Extract operation name (e.g., GetJobs from "query GetJobs...")
  const opMatch = query.match(/(query|mutation)\s+(\w+)/);
  const opName = opMatch ? opMatch[2] : 'Unnamed';
  const temp = Date.now() - start;
  console.log(`${prefix} START: ${opName} (${temp}ms)`, JSON.stringify(variables || {}));

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    const duration = Date.now() - start;
    const requestId = res.headers.get('X-Request-ID') || 'Unknown';
    const supportMsg = `[Support ID: ${requestId}]`;

    if (!res.ok) {
      console.error(`${prefix} HTTP ERROR: ${opName} (${duration}ms) - Status ${res.status} ${supportMsg}`);
      throw new Error(`GraphQL HTTP error: ${res.status}. ${supportMsg}`);
    }

    const json = await res.json();
    if (json.errors?.length) {
      console.error(`${prefix} GQL ERRORS: ${opName} (${duration}ms) ${supportMsg}`, JSON.stringify(json.errors));
      const mainError = json.errors.map((e: { message: string, extensions?: { requestId?: string } }) => e.message).join(', ');
      // Use requestId from extension if available, else header
      const errorReqId = json.errors[0]?.extensions?.requestId || requestId;
      throw new Error(`${mainError}. [Support ID: ${errorReqId}]`);
    }

    console.log(`${prefix} Backend URL: ${GRAPHQL_URL} (${duration}ms) [ReqID: ${requestId}]`);
    console.log(`${prefix} SUCCESS: ${opName} (${duration}ms) [ReqID: ${requestId}]`);
    return json.data as T;
  } catch (error: any) {
    const duration = Date.now() - start;
    // If error doesn't already have a support ID, it's a network error (no response)
    const errMessage = error.message.includes('Support ID') ? error.message : `${error.message}. [Support ID: Network/Fatal Error]`;
    console.error(`${prefix} FATAL: ${opName} (${duration}ms)`, errMessage);
    throw new Error(errMessage);
  }
}
