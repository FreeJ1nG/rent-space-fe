import useAccessToken from "@/common/hooks/useAccessToken";
import axiosApi from "@/common/services/axios";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";

interface SpaceCategory {
  name: string;
  type: "OPEN_SPACE" | "CLOSED_SPACE";
}

export default function CreateSpace() {
  const [owner, setOwner] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [price, setPrice] = useState<number>();
  const [capacity, setCapacity] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [facilities, setFacilities] = useState<string[]>([] as string[]);

  const [currentText, setCurrentText] = useState<string>("");
  const [spaceCategories, setSpaceCategories] = useState<string[]>(
    [] as string[]
  );
  const { getAccessToken } = useAccessToken();
  const token = getAccessToken();
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const getSpaceCategory = async () => {
    const response = await axiosApi.get(`/space-category`, config);
    const categories: string[] = [];
    response.data.forEach((category: SpaceCategory) => {
      categories.push(category.name);
    });
    setSpaceCategories(categories);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosApi.post("/space", {
        owner: owner,
        name: spaceName,
        date: selectedDate?.toString().split(","),
        price: price,
        capacity: capacity,
        description: description,
        categoryName: category,
        facilities: facilities,
      }, config);
      window.alert("Space " + spaceName + " Created Successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // The client was given an error response (5xx, 4xx)
          window.alert(err.response.data.message);
        } else if (err.request) {
          // The client never received a response, and the request was never left
          window.alert(err.request.data.message);
        } else {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    getSpaceCategory();
    console.log(selectedDate?.toString().split(","));
    // console.log(category);
  }, [selectedDate]);
  return (
    <div className="block rounded-lg border border-gray-300 bg-white p-3 shadow-xl m-4">
      <div className="flex flex-col space-y-3">
        <span className="text-3xl font-bold self-center">Create New Space</span>
        <TextField
          required
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="Your Name"
          label="Owner Name"
          type="text"
        />
        <TextField
          required
          value={spaceName}
          onChange={(event) => setSpaceName(event.target.value)}
          placeholder="Villa Ubud"
          label="Space Name"
          type="text"
        />
        <div className="inline-flex items-center space-x-2">
          <span className="text-lg font-semibold">Select Date:</span>
          <DatePicker
            required
            multiple
            format="YYYY-MM-DD"
            value={selectedDate}
            defaultValue={""}
            onChange={setSelectedDate}
            minDate={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <TextField
          required
          type="number"
          value={price}
          onChange={(event) => setPrice(parseInt(event.target.value))}
          placeholder="100000"
          label="Space Price"
        ></TextField>
        <TextField
          required
          type="number"
          value={capacity}
          onChange={(event) => setCapacity(parseInt(event.target.value))}
          placeholder="2500"
          label="Space Capacity"
        ></TextField>
        <TextField
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="A Nice Villa with 2 bedrooms and 1 bathroom"
          label="Space Description"
          type="text"
        />
        <div className="flex flex-row mx-4 items-center">
          <span className="text-md font-semibold">Select Category :</span>
          <Select
            variant="standard"
            fullWidth
            value={category ? category : ""}
            onChange={(event) => setCategory(event.target.value)}
          >
            {spaceCategories &&
              spaceCategories.map((category) => (
                <MenuItem value={category.toString()}>{category}</MenuItem>
              ))}
          </Select>
        </div>
        <TextField
          required
          type="text"
          label="Facilities"
          placeholder="2 Bedrooms, 1 Bathroom, 1 Kitchen"
          value={currentText}
          onChange={(event) => setCurrentText(event.target.value)}
          onBlur={() => {
            setFacilities(currentText.split(","));
          }}
        ></TextField>
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
