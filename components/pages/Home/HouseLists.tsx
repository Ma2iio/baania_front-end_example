import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { houseListsSkip, houseListsTake } from "../../../states/homeList";
import { HouseListItem } from "./HouseListItem";
import { IResponseHouseAPI } from "./interfaces";

export interface IHouseListsElement {
  lists: IResponseHouseAPI[];
  count: number;
}

export const HouseLists: React.FC<IHouseListsElement> = (props): JSX.Element => {
  const columns = [
    { label: "ID" },
    { label: "Name" },
    { label: "Post Code" },
    { label: "Price" },
    { label: "Action" },
  ];

  const [skipPage, setSkipPage] = useRecoilState(houseListsSkip);
  const [takePage, setTakePage] = useRecoilState(houseListsTake);

  const handleChangePage = (event, newPage) => {
    setSkipPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setTakePage(+event.target.value);
    setSkipPage(0);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.lists.map((row) => {
              return <HouseListItem item={row} key={row.code} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.count}
        rowsPerPage={takePage}
        page={skipPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
