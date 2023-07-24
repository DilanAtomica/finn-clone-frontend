import {create} from "zustand";

type useScreenWidth = {
    screenWidth: number,
}

export const useScreenWidth = create<useScreenWidth>((set) => ({
    screenWidth: 0,
    changeWidth: (newWidth: number) => set(() => ({screenWidth : newWidth})),
}));

export default useScreenWidth;