import axios from "axios";
import { headers } from "next/headers";
export const getData = async (path: string) => {
  const url = headers().get("x-url") || process.env.NEXTAUTH_URL;
  const formatedUrl = `${url}/api${path}`;
  console.log({ url, formatedUrl });

  const res = await axios.get(formatedUrl);

  return (await res?.data?.data) || [];
};
