import axios from "axios";

export const getData = async (
  path: string,
  params: Record<string, any> | null = null
): Promise<any> => {
  try {
    const paramStr = new URLSearchParams(params || {}).toString();
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXTAUTH_URL
        : window.location.origin;

    const formattedUrl = `${baseUrl}/api${path}${
      paramStr ? `?${paramStr}` : ""
    }`;

    const res = await axios.get(formattedUrl, {
      headers: {
        "x-api-key": process.env.ADMIN_API_KEY || "",
      },
    });

    let result = res?.data?.meta ? res?.data : res?.data?.data || res?.data;
    // console.log({ result });
    return result;
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return null;
  }
};
