import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import TypeBadge from "./TypeBadge";

interface SpaceInfoProps {
  ownerName: string;
  spaceName: string;
  date: Date[];
  price: number;
  capacity: number;
  description: string;
  category: SpaceCategory;
  facilities: String[];
}
interface SpaceCategory {
  name: string;
  type: "OPEN_SPACE" | "CLOSED_SPACE";
}

export default function SpaceInfo({
  ownerName,
  spaceName,
  date,
  price,
  capacity,
  description,
  category,
  facilities,
}: SpaceInfoProps) {
  console.log(date);
  return (
    <div className="block rounded-lg border border-gray-300 bg-white p-3 shadow-xl mx-5 mt-3 mb-6">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <span className="font-bold text-lg">{spaceName}</span>
          <TypeBadge type={category.type} />
        </div>
        <span className="font-semibold">{category.name}</span>
        <hr className="border-t-[1px] border-black my-1 mr-2" />
        <span className="font-normal">{description}</span>
        <div className="inline-flex mb-5 font-medium ">
          <PersonIcon className="inline-block mr-1" />
          {ownerName}
        </div>
        <div>
          <span className="text-lg font-medium">Rp {price}</span>/day
        </div>
        <div className="inline-flex space-x-1 items-center">
          <span className=" text-lg font-semibold">Capacity :</span>
          <span className="text-lg pr-1">{capacity}</span>
          <GroupsIcon />
        </div>
        <div className="mt-2 font-medium text-xl">
          Facilities
          <ul className="list-disc list-inside text-lg font-normal">
            {facilities.map((facility) => (
              <li>{facility}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2 font-medium text-xl grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6">
          <span className="col-span-full">Available Date:</span>
          {date.map((date) => (
            <div className="rounded-lg border text-base border-gray-600 bg-gray-300 p-2 shadow-xl m-2 text-center">
              {date.toString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
