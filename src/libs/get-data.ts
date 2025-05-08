import axios from "axios";
import { headers } from "next/headers";
export const getData = async (path: string) => {
  let data = [];
  try {
    const url = headers().get("x-url") || process.env.NEXTAUTH_URL;
    const formatedUrl = `${url}/api${path}`;
    // console.log({ url, formatedUrl });

    const res = await axios.get(formatedUrl);

    data = (await res?.data) || (await res?.data?.data) || [];
  } catch (error: any) {
    console.log("Featch Er : " + error.message);
  } finally {
    return data;
  }
};
