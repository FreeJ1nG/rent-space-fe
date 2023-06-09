import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import Link from "next/link";
import TypeBadge from "./TypeBadge";

interface SpaceCardProps {
  name: string;
  owner: string;
  price: number;
  capacity: number;
  description: string;
  categoryName: String;
  categoryType: "OPEN_SPACE" | "CLOSED_SPACE";
}

const SpaceCard = ({
  name,
  owner,
  price,
  capacity,
  description,
  categoryName,
  categoryType,
}: SpaceCardProps) => {
  return (
    <Link href={`/space/${name}`} prefetch={false} className="flex">
      <div className="block rounded-lg border border-gray-300 bg-white p-3 shadow-xl mx-5 mt-3 mb-6 hover:text-gray-400 flex-1">
        <div className="flex flex-col h-full">
          <div className="flex flex-row justify-between">
            <span className="font-bold text-lg">{name}</span>
            <TypeBadge type={categoryType} />
          </div>
          <span className="font-semibold text-md">{categoryName}</span>
          <hr className="border-t-[1px] border-black my-1 mr-2" />
          <span className="font-normal">{description}</span>
          <div className="inline-flex">
            <PersonIcon className="inline-block mr-1" />
            {owner}
          </div>
          <div className="grow"></div>
          <div className="flex flex-row justify-between pt-5">
            <span className="text-lg font-semibold">Rp {price}</span>
            <div className="inline-flex space-x-1 items-center">
              <span className="text-lg">{capacity}</span>
              <GroupsIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpaceCard;
