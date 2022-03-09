import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { client } from "../../../utils/client";
import { IResponseAPI } from "../../../utils/interfaces";

export interface IResponsePostCode {
  post_code: string;
}
export interface IResponsePostCodeAnalytic {
  average: string;
  median: string;
}

export const PostCodeAnalytic: React.FC = () => {
  const [postCodeLists, setPostCodeLists] = useState<IResponsePostCode[] | []>(
    []
  );

  const [postCodeAnalytic, setPostCodeAnalytic] = useState({
    average: "0",
    median: "0",
  });

  const handleLoadPostCodeAnalytic = async (post_code: string) => {
    try {
      const { data } = await client.get<
        IResponseAPI<IResponsePostCodeAnalytic>
      >(`/postCode/${post_code}`);
      setPostCodeAnalytic(data.payload);
    } catch (error) {}
  };

  const loadPostCode = async () => {
    try {
      const { data } = await client.get<IResponseAPI<IResponsePostCode>>(
        "/postCode"
      );
      setPostCodeLists(data.payload);
    } catch (error) {}
  };

  useEffect(() => {
    loadPostCode();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="postcode-select-helper-label">
            SELECT POST CODE
          </InputLabel>
          <Select onChange={(e) => handleLoadPostCodeAnalytic(e.target.value)}>
            {postCodeLists.map((data: IResponsePostCode, index: number) => (
              <MenuItem key={index} value={data.post_code}>
                {data.post_code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="flex flex-col mt-4">
          <h1 className="font-bold text-blue-600">Average : {postCodeAnalytic.average}</h1>
          <h1 className="font-bold text-blue-600">Median : {postCodeAnalytic.median}</h1>
        </div>
      </div>
    </div>
  );
};
