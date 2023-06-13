import { useAuthContext } from "@/common/contexts/authContext";
import useAccessToken from "@/common/hooks/useAccessToken";
import axiosApi from "@/common/services/axios";
import { Button, Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";

import { useState } from "react";

interface ReservationProps {
  availableDateMap: Map<Date, number>;
}

export default function ReservationForm({
  availableDateMap,
}: ReservationProps) {
  const [selectedSpaceId, setSelectedSpaceId] = useState<number[]>(
    [] as number[]
  );

  const { email } = useAuthContext() || {};
  const { getAccessToken } = useAccessToken();
  const token = getAccessToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  console.log(email);
  const router = useRouter();

  const handleRemoveId = (id: number) => {
    setSelectedSpaceId(selectedSpaceId.filter((spaceId) => spaceId !== id));
  };
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      setSelectedSpaceId((selectedSpaceId) => [
        ...selectedSpaceId,
        parseInt(event.target.value),
      ]);
    } else {
      handleRemoveId(parseInt(event.target.value));
    }
  };
  const handleSubmit = async () => {
    const response = await axiosApi.post("/reservation", {
      spaceId: selectedSpaceId,
      email: email,
    },config);
    router.replace(router.asPath);
  };

  return (
    <div>
      {Array.from(availableDateMap).map(([date, id]) => (
        <div>
          <FormControlLabel
            label={date.toString()}
            control={<Checkbox onChange={handleClick} value={id} />}
          ></FormControlLabel>
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSubmit()}
          className=" bg-neutral-700"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
