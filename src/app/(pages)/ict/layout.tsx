import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren{}

export default function ICTLayout({children}:Props) {
  return (
    <>{children}</>
  )
}
