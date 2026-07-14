"use server";

const baseUrl = process.env.BASE_URL as string;

export const serverFetch = async (path: string) => {
  const response = await fetch(`${baseUrl}${path}`);
  
  return response.json();
}