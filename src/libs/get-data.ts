import axios from "axios";

import { headers } from "next/headers";

export const getData = async (
  path: string,
  params: Record<string, any> | null = null,
  logs: boolean = false
): Promise<any> => {
  try {
    const paramStr = new URLSearchParams(params || {}).toString();
    // const baseUrl =
    //   typeof window === "undefined"
    //     ? process.env.NEXTAUTH_URL
    //     : window.location.origin;
  const baseUrl = headers().get("x-url") || process.env.NEXTAUTH_URL;
    const formattedUrl = `${baseUrl}/api${path}${
      paramStr ? `?${paramStr}` : ""
    }`;

    const res = await axios.get(formattedUrl, {
      headers: {
        "x-api-key": process.env.ADMIN_API_KEY || "",
      },
    });

    let result = res?.data?.meta ? res?.data : res?.data?.data || res?.data;
    if(logs) {
      console.log("API Call:", { formattedUrl, params, result });
    }
    if (res.status !== 200) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    return result;
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return null;
  }
};
