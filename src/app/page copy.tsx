"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Hello There!</h2>
      <div className="w-3/5 flex flex-col px-12 mx-auto">     <Button>Button</Button>
      <Button variant={"secondary"} className="bg-slate-600 m-2 text-white">
        Button2
      </Button>
      <Button2
        className=""
        onClick={() => alert("Hello there")}
        variant={"destructive"}
      >
        Hello Btn 2
      </Button2>

      <Select >
        <SelectTrigger className="min-w-[180px] m-5 ">
          <SelectValue placeholder="County" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      </div>
 
    </div>
  );
}

interface Button2Props extends React.ComponentProps<typeof Button> {}
function Button2(props: Button2Props) {
  const { children, ...others } = props;
  return <Button {...others}>{children}</Button>;
}
