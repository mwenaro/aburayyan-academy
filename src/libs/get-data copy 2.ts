import axios from "axios";
import { headers } from "next/headers";

export const getData = async (
  path: string,
  params: Record<string, any> | null = null
): Promise<any> => {
  let data: any = null;

  const paramStr = params
    ? Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&")
    : "";

  try {
    const url = headers().get("x-url") || process.env.NEXTAUTH_URL;
    const formattedUrl = `${url}/api${path}${paramStr ? "?" + paramStr : ""}`;

    console.log({ url, formattedUrl });

    const res = await axios.get(formattedUrl, {
      headers: { "x-api-key": process.env.ADMIN_API_KEY || "" },
    });

    data = res?.data?.data ?? res?.data ?? null;
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
  }

  return data;
};
