// import Image from "next/image";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
interface DashboardItemCardProps {
  title?: string;
  value?: number | string;
  dev?: string;
  icon?: ReactElement;
}
export const DashboardItemCard: React.FC<DashboardItemCardProps> = ({
  title = "Monthly Revenue ",
  value = "$ 1224",
  dev = "20.1% from last mont",
  icon = null,
}) => {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon ? (
          icon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-2xl font-bold text-center">{value}</div>
        <p className="text-xs text-muted-foreground">{dev}</p>
      </CardContent>
    </Card>
  );
};
