import { atom } from "recoil";

export const houseListsSkip = atom({
    key: "HOUSE_LISTS_SKIP",
    default: 0
})

export const houseListsTake = atom({
    key: "HOUSE_LISTS_TAKE",
    default: 10
})

export const updateHouseList = atom({
    key: "UPDATE_HOUSE_LIST",
    default: Date.now()
})