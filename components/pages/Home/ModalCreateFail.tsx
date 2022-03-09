import { useState } from "react";
import { Modal, Box, TextField } from "@mui/material";
import { IListItem } from "./HouseListItem";
import Cancel from '@mui/icons-material/Cancel';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export interface IModalHouseForm {
  isOpenModal: boolean;
  onClose: () => void;
}

export const ModalCreateFail: React.FC<IModalHouseForm> = (
  props
): JSX.Element => {
  return (
    <Modal open={props.isOpenModal} onClose={props.onClose}>
      <Box sx={{ ...style, width: 300 }}>
        <div className="flex flex-col items-center p-10 bg-white rounded-md">
          <div className="flex flex-col items-center space-y-4">
            <Cancel color="danger" sx={{ fontSize: 100 }} />
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-gray-500">Fail</h1>
              <h1 className="text-gray-500">Let's try one more again</h1>
            </div>
            <div>
              <button
                className="py-3 text-gray-300 border border-gray-300 rounded-md px-14 w-52"
                onClick={props.onClose}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
