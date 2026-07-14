"use server";

const baseUrl = process.env.BASE_URL as string;

export const serverFetch = async (path: string) => {
  const response = await fetch(`${baseUrl}${path}`);
  
  return response.json();
}

export const serverMutation = async (path : string, options : RequestInit = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
    }
  });

  return response.json();
}