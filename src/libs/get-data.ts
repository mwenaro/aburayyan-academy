import axios from "axios";
import { headers } from "next/headers";
export const getData = async (path: string, params = null) => {
  let data = [];
  const paramStr = params
    ? Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")
    : "";
  try {
    const url = headers().get("x-url") || process.env.NEXTAUTH_URL;
    const formattedUrl = `${url}/api${path}${
      paramStr.length ? "?" + paramStr : ""
    }`;
    // console.log({ url, formattedUrl });

    const res = await axios.get(formattedUrl);

    data = (await res?.data) || (await res?.data?.data) || [];
    // console.log({ data, then: 1 });
  } catch (error: any) {
    console.log("Featch Er : " + error.message);
  } finally {
    return await data;
  }
};
