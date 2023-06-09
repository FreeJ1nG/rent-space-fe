import ReservationForm from "@/common/components/spaces/ReservationForm";
import SpaceInfo from "@/common/components/spaces/SpaceInfo";
import axiosApi from "@/common/services/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SpaceDetail {
  id: number;
  owner: string;
  name: string;
  date: Date;
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
interface AvailableDate {
  id: number;
  date: Date;
  isAvailable: boolean;
}

const SpaceDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [spaceDetail, setSpaceDetail] = useState<SpaceDetail[]>();
  const [availableDateMap, setAvailableDateMap] = useState(
    new Map<Date, number>()
  );

  const updateMap = (date: Date, id: number) => {
    setAvailableDateMap(new Map(availableDateMap.set(date, id)));
  };

  const getSpace = async () => {
    const response = await axiosApi.get(`/space/${name}`);
    await response.data.forEach(({ id, date, isAvailable }: AvailableDate) => {
      if (isAvailable) {
        updateMap(date, id);
      }
    });

    setSpaceDetail(response.data);
  };

  useEffect(() => {
    if (router.isReady) {
      getSpace();
    }
  }, [router.isReady]);

  return (
    <div className="grid grid-cols-1 justify-center mx-2">
      <span className="text-3xl font-semibold flex justify-center">
        Space Details
      </span>
      {spaceDetail ? (
        <SpaceInfo
          ownerName={spaceDetail[0].owner}
          spaceName={spaceDetail[0].name}
          date={Array.from(availableDateMap.keys())}
          price={spaceDetail[0].price}
          capacity={spaceDetail[0].capacity}
          description={spaceDetail[0].description}
          category={spaceDetail[0].category}
          facilities={spaceDetail[0].facilities}
        ></SpaceInfo>
      ) : (
        <></>
      )}
      <div className="block rounded-lg border border-gray-300 bg-white p-3 shadow-xl m-4">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">Reservation</span>
          <span className="text-lg">Select Date:</span>
          <ReservationForm
            availableDateMap={availableDateMap}
          ></ReservationForm>
        </div>
      </div>
    </div>
  );
};
export default SpaceDetails;
