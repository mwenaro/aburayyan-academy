import Image from "next/image";
interface UserCardProps {
  type: string;
  num?: number;
  academicYear?: string;
}
const UserCard: React.FC<UserCardProps> = ({
  type,
  num = 1224,
  academicYear = "2024/25",
}) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {academicYear}
        </span>
        <Image src="/u-dashboard/more.png" alt="" width={20} height={20} />
      </div>
      <h3 className="text-2xl font-semibold my-4">{num}</h3>
      <h4 className="capitalize text-sm font-medium text-gray-500">{type}s</h4>
    </div>
  );
};

export default UserCard;
