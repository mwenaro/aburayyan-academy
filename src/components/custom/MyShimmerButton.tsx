import { PropsWithChildren } from "react";
import { ShimmerButton } from "../ui/shimmer-button";
import { twMerge } from "tailwind-merge";
interface Props extends PropsWithChildren {
  className?: string;
  background?: string;
  shimmerColor?: string;
  shimmerSize?: string;
}

export function MyShimmerButton({
  children,
  className = "",
  background = "white",
  shimmerColor = "skyblue",
  shimmerSize = "0.05em",
}: Props) {
  return (
    <ShimmerButton
      className={twMerge("px-6 py-3 mx-auto", className)}
      background={background}
      shimmerColor={shimmerColor}
      shimmerSize={shimmerSize}
    >
      {children}
    </ShimmerButton>
  );
}
