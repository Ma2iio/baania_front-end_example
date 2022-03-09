import { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { Input } from "../components/Input";
import { HouseLists } from "../components/pages/Home/HouseLists";
import { PostCodeAnalytic } from "../components/pages/Home/PostCodeAnalytic";
import { client } from "../utils/client";
import { IResponseAPI } from "../utils/interfaces";
import { IResponseHouseAPI } from "../components/pages/Home/interfaces";
import { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import {
  houseListsSkip,
  houseListsTake,
  updateHouseList,
} from "../states/homeList";
import { ModalHouseForm } from "../components/pages/Home/ModalHouseForm";
import { IListItem } from "../components/pages/Home/HouseListItem";
import { ModalCreateSuccess } from "../components/pages/Home/ModalCreateSuccess";
import { ModalCreateFail } from "../components/pages/Home/ModalCreateFail";

const Home: NextPage = () => {
  const [baseURL, setBaseURL] = useState("https://test-backend.baania.dev");
  const [port, setPort] = useState(443);
  const [houseLists, setHouseLists] = useState<IResponseHouseAPI[] | []>([]);
  const [count, setCount] = useState<number>(0);
  const skipPage = useRecoilValue(houseListsSkip);
  const takePage = useRecoilValue(houseListsTake);
  const updateHouse = useRecoilValue(updateHouseList);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalFail, setIsOpenModalFail] = useState<boolean>(false);

  const handleGetHouseLists = async (): Promise<void> => {
    try {
      const { data } = await client.get<IResponseAPI<IResponseHouseAPI>>(
        `home?skip=${skipPage}&take=${takePage}`
      );
      setHouseLists(data.payload);
      setCount(data.count);
    } catch (error) {
      setHouseLists([])
    }
  };

  const handleConnect = (): void => {
    client.defaults.baseURL = `${baseURL}:${port}`;
    handleGetHouseLists();
  };

  const handleUpdate = async (data: IListItem) => {
    try {
      await client.post("/home", data);
      setIsOpenModal(false);
      setIsOpenModalSuccess(true);
      await handleGetHouseLists();
    } catch (error) {
      setIsOpenModalFail(true)
    }
  };

  useEffect(() => {
    // Listener skip and take
    handleGetHouseLists();
  }, [skipPage, takePage, updateHouse]);

  useEffect(() => {
    // When open page should be auto connect api
    handleConnect();
  }, []);

  return (
    <div>
      <div className="px-20 py-10 bg-slate-100">
        <div className="grid items-end grid-cols-10 gap-16">
          <div className="col-span-4">
            <h1>URL</h1>
            <Input value={baseURL} onChange={e => setBaseURL(e.target.value)} />
          </div>
          <div className="col-span-3">
            <h1>PORT</h1>
            <Input value={port} onChange={e => setPort(e.target.value)} />
          </div>
          <div className="flex justify-end col-span-3">
            <button
              className="py-3 text-white rounded-md bg-sky-700 px-14 w-52"
              onClick={handleConnect}
            >
              CONNECT
            </button>
          </div>
        </div>
      </div>
      <div className="px-20 py-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl">HOUSE LIST</h1>
          <button className="py-3 text-white bg-green-500 rounded-md px-14 w-52" onClick={() => setIsOpenModal(true)}>
            CREATE
          </button>
        </div>
      </div>
      <div className="px-20">
        <HouseLists lists={houseLists} count={count} />
      </div>
      <div className="px-20 py-10 bg-slate-100">
        <PostCodeAnalytic />
      </div>
      <ModalHouseForm
        action="create"
        isOpenModal={isOpenModal}
        onSubmit={handleUpdate}
        onClose={() => setIsOpenModal(false)}
      />
      <ModalCreateSuccess isOpenModal={isOpenModalSuccess} onClose={() => setIsOpenModalSuccess(false)} />
      <ModalCreateFail isOpenModal={isOpenModalFail} onClose={() => setIsOpenModalFail(false)} />
    </div>
  );
};

export default Home;
