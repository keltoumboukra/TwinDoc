 // Custom error class for errors from Strapi API
 class APIResponseError extends Error {
  constructor(response: Response) {
      super(`API Error Response: ${response.status} ${response.statusText}`);
  }
}

export const checkStatus = (response: Response) => {
  if (response.ok) {
      // response.status >= 200 && response.status < 300
      return response;
  } else {
      throw new APIResponseError(response);
  }
}

class MissingEnvVariable extends Error {
  constructor(name: string) {
      super(`Missing Environment Variable: The ${name} environment variable must be defined`);
  }
}

export const checkEnvVariables = () => {
  const envVariables = [
      'STRAPI_URL_BASE',
      'STRAPI_API_TOKEN'
  ];

  for (const envVar of envVariables) {
      if (!process.env[envVar]) {
          throw new MissingEnvVariable(envVar)
      }
  }
}