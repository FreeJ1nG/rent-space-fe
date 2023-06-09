import axiosApi from "@/common/services/axios";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface CategoryType {
  type: "OPEN_SPACE" | "CLOSED_SPACE";
}
export default function CreateCategory() {
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryType, setCategoryType] = useState<CategoryType>();

  const handleSubmit = async () => {
    try {
      const response = await axiosApi.post("/space-category", {
        name: newCategory,
        type: categoryType,
      });
      window.alert("Category " + newCategory + " Created Successfully");
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
  return (
    <div className="block rounded-lg border border-gray-300 bg-white p-3 shadow-xl m-4">
      <div className="flex flex-col space-y-3">
        <span className="text-3xl font-bold self-center">
          Create New Category
        </span>
        <TextField
          required
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="House"
          label="New Category Name"
          type="text"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Select Category :</span>
          <Select
            fullWidth
            value={categoryType ? categoryType : ""}
            onChange={(event) =>
              setCategoryType(event.target.value as CategoryType)
            }
          >
            <MenuItem value="OPEN_SPACE">Open Space</MenuItem>
            <MenuItem value="CLOSED_SPACE">Closed Space</MenuItem>
          </Select>
        </div>
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
