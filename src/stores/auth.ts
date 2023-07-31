import {create} from "zustand";

type useAuth = {
    isAuth: boolean,
    authToken: string | null,
}

export const useAuth = create<useAuth>((set) => ({
    changeIsAuth: (newAuth: boolean) => set(() => ({isAuth : newAuth})),
    changeToken: (token: string | null) => set(() => ({authToken : token})),
    isAuth: false,
    authToken: null,
}));

export default useAuth;