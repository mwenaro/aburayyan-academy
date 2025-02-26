import { Button } from "../ui/button";

const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <Button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </Button>
      <div className="flex items-center gap-2 text-sm">
        <Button className="px-2 rounded-sm bg-lamaSky">1</Button>
        <Button className="px-2 rounded-sm ">2</Button>
        <Button className="px-2 rounded-sm ">3</Button>
        ...
        <Button className="px-2 rounded-sm ">10</Button>
      </div>
      <Button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
