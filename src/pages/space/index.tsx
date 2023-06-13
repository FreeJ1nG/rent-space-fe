import SpaceCard from "@/common/components/spaces/SpaceCard";
import useAccessToken from "@/common/hooks/useAccessToken";
import axiosApi from "@/common/services/axios";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Space {
  name: string;
  owner: string;
  price: number;
  capacity: number;
  description: string;
  category: SpaceCategory;
}

interface SpaceCategory {
  name: string;
  type: "OPEN_SPACE" | "CLOSED_SPACE";
}

const SpacePage = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceCategory, setSpaceCategory] = useState<String[]>([] as String[]);
  const [filter, setFilter] = useState("");
  const { getAccessToken } = useAccessToken();
  const token = getAccessToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const getSpaces = async () => {
    const response = await axiosApi.get("/space",config);
    setSpaces(response.data);
  };
  const getSpaceCategory = async () => {
    const response = await axiosApi.get(`/space-category`,config);
    const categories = ["All"];
    response.data.forEach((category: SpaceCategory) => {
      categories.push(category.name);
    });
    setSpaceCategory(categories);
  };
  const getSpaceByCategory = async (category: String) => {
    const response = await axiosApi.get(`/space/category/${category}`,config);
    setSpaces(response.data);
  };
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getSpaceCategory();
  }, []);

  useEffect(() => {
    if (filter === "All" || filter === "") {
      getSpaces();
    } else {
      getSpaceByCategory(filter);
    }
  }, [filter]);

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold py-1">Spaces</span>
      </div>
      <div className="flex flex-row mx-4 items-center">
        <span className="text-2xl font-bold">Select Category :</span>
        <FormControl className="pl-3">
          <Select
            id="demo-simple-select"
            value={filter}
            onChange={handleFilterChange}
            autoWidth
          >
            {spaceCategory &&
              spaceCategory.map((category) => (
                <MenuItem value={category.toString()}>{category}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {spaces ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center mx-2">
          {spaces.map(
            ({ name, owner, price, capacity, description, category }) => (
              <SpaceCard
                key={name}
                name={name}
                owner={owner}

                price={price}
                capacity={capacity}
                description={description}
                categoryName={category.name}
                categoryType={category.type}
              ></SpaceCard>
            )
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default SpacePage;
