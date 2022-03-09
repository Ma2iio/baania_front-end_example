import { TableRow, TableCell, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { updateHouseList } from "../../../states/homeList";
import { client } from "../../../utils/client";
import { ModalHouseForm } from "./ModalHouseForm";

export interface IListItem {
  id: number | null;
  name: string;
  post_code: string;
  price: string;
  desc: string;
}

export interface IHouseListItem {
  item: IListItem;
}

export const HouseListItem: React.FC<IHouseListItem> = (props): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const setUpdateHouseList = useSetRecoilState(updateHouseList);

  const handleUpdate = async (data: IListItem) => {
    try {
      await client.patch(`/home/${data.id}`, data);
      setIsOpenModal(false);
      setUpdateHouseList(Date.now());
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await client.delete(`/home/${props.item.id}`);
      setUpdateHouseList(Date.now());
    } catch (error) {}
  };

  return (
    <>
      <TableRow hover role="checkbox">
        <TableCell align="center">{props.item.id}</TableCell>
        <TableCell align="center">{props.item.name}</TableCell>
        <TableCell align="center">{props.item.post_code}</TableCell>
        <TableCell align="center">{props.item.price}</TableCell>
        <TableCell align="center" className="space-x-2">
          <button
            className="px-5 py-2 text-orange-400 bg-orange-200 rounded-full"
            onClick={() => setIsOpenModal(true)}
          >
            VIEW DETAIL
          </button>
          <button
            className="px-5 py-2 text-red-400 bg-red-200 rounded-full"
            onClick={() => handleDelete()}
          >
            DELETE
          </button>
        </TableCell>
      </TableRow>
      <ModalHouseForm
        isOpenModal={isOpenModal}
        item={props.item}
        onSubmit={handleUpdate}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};
