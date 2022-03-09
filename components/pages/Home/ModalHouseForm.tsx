import { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";
import { IListItem } from "./HouseListItem";
import classnames from "classnames";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export interface IModalHouseForm {
  action: "create" | "edit";
  item?: IListItem;
  isOpenModal: boolean;
  onClose: () => void;
  onSubmit: (data: IListItem) => Promise<void>;
}

export const ModalHouseForm: React.FC<IModalHouseForm> = (
  props
): JSX.Element => {
  const [item, setItem] = useState(props.item);

  const handleSubmit = () => {
    props.onSubmit(item);
    // clear form
    setItem({
      id: null,
      name: "",
      post_code: "",
      price: "",
      desc: "",
    });
  };

  const handleSetItem = (key: string, value: string) => {
    setItem((state) => ({
      ...state,
      [key]: value,
    }));
  };

  return (
    <Modal open={props.isOpenModal} onClose={props.onClose}>
      <Box sx={{ ...style, width: 600 }}>
        <div className="p-10 bg-white rounded-md">
          <h2>Item Detail - {item.id}</h2>
          <div className="py-4">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-6">
                <TextField
                  fullWidth
                  label="Name"
                  value={item.name}
                  onChange={(e) => handleSetItem("name", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <TextField
                  label="Post Code"
                  value={item.post_code}
                  onChange={(e) => handleSetItem("post_code", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <TextField
                  label="Price"
                  value={item.price}
                  onChange={(e) => handleSetItem("price", e.target.value)}
                />
              </div>
            </div>
            <textarea
              className="w-full p-2 mt-4 border border-gray-300 rounded-md"
              placeholder="Description"
              rows={5}
              value={item.desc}
              onChange={(e) => handleSetItem("desc", e.target.value)}
            />
            <div className="flex justify-center space-x-2">
              <button
                className="py-3 text-gray-300 border border-gray-300 rounded-md px-14 w-52"
                onClick={props.onClose}
              >
                CANCEL
              </button>
              <button
                className={classnames(
                  "py-3 text-white  rounded-md px-14 w-52",
                  {
                    "bg-orange-400": props.action === "edit",
                    "bg-green-400": props.action === "create",
                  }
                )}
                onClick={handleSubmit}
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

ModalHouseForm.defaultProps = {
  item: {
    id: null,
    name: "",
    post_code: "",
    price: "",
    desc: "",
  },
};
