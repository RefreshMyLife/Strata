import config from 'config';
import { isEmpty, set } from 'lodash';

interface RestServiceInput {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  token?: string | null;
  params?: Record<string, unknown>;
  apiUrl?: string | null;
}

const createQueryParams = (params: Record<string, unknown>) => {
  const paramArray = Object.entries(params).map(([key, value]) => {
    if (value !== undefined && value !== null) {
      return `${key}=${value}`;
    }
    return '';
  });
  return paramArray.filter(p => p).join('&');
};

export async function restService<D>({
  endpoint,
  method,
  params,
  token = null,
  apiUrl = null,
}: RestServiceInput): Promise<
  | {
      status: number;
      data: { data: D; status: boolean } | undefined;
    }
  | {
      status: boolean;
      data: undefined;
      result: 'error';
      message: string;
    }
> {
  const headers = {};
  let path = `${apiUrl ?? config.apiUrl}${endpoint}`;

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  if (token) {
    set(headers, 'Authorization', `Bearer ${token}`);
  }

  const reqBody = {
    method,
    headers,
    body: null,
  };

  if (params && !isEmpty(params) && method === 'POST') {
    reqBody.body = JSON.stringify(params);
  } else if (params && !isEmpty(params) && method === 'GET') {
    const queryParams = createQueryParams(params);
    path = `${path}?${queryParams}`;
  }

  if (params?.chainId == null) {
    path += `${path.includes('?') ? '&' : '?'}chainId=${config.chainId}`;
  }

  return fetch(path, {
      method: method,
      headers: headers,
      body: reqBody.body
  })
    .then(async response => {
      const { status } = response;

      let data: undefined;

      try {
        data = await response.json();
      } catch (error) {
        // Do nothing
      }

      return { status, data };
    })
    .catch(error => ({
      status: false,
      data: undefined,
      result: 'error',
      message: error,
    }));
}


export async function restServiceRaw<T>({
  endpoint,
  method,
  params,
  token = null,
  apiUrl = null,
}: RestServiceInput): Promise<{
      error?: Error
      data: T;
}> {
  const headers = {};
  let path = `${apiUrl ?? config.apiUrl}${endpoint}`;

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  if (token) {
    set(headers, 'Authorization', `Bearer ${token}`);
  }

  const reqBody = {
    method,
    headers,
    body: null,
  };

  if (params && !isEmpty(params) && method === 'POST') {
    reqBody.body = JSON.stringify(params);
  } else if (params && !isEmpty(params) && method === 'GET') {
    const queryParams = createQueryParams(params);
    path = `${path}?${queryParams}`;
  }

  path += `${path.includes('?') ? '&' : '?'}chainId=${config.chainId}`;

  return fetch(path, {
      method: method,
      headers: headers,
      body: reqBody.body
  })
    .then(async response => {
      const { status } = response;

      let data: any;

      try {
        data = await response.json();
      } catch (error) {
        // Do nothing
      }
      if (status !== 200) {
        return {
          error: new Error(data?.message || 'Unknown error'),
          data: undefined,
        };
      }
      return { error: null, data };
    })
    .catch(error => ({
      status: 0,
      data: undefined,
      result: 'error',
      message: error,
    }));
}




export async function restS3<T = any>(path: string): Promise<{
      error?: Error
      data: T;
}> {

  let url = `https://s3.strata.money${path}`;

  return fetch(url)
    .then(async response => {
      const { status } = response;

      let data = await response.json();
      if (status !== 200) {
        return {
          error: new Error(data?.message || 'Unknown error'),
          data: undefined,
        };
      }
      return { error: null, data };
    })
    .catch(error => ({
      status: 0,
      data: undefined,
      error: error,
    }));
}
