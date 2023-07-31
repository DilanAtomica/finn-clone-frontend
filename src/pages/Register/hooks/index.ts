import {useMutation} from "@tanstack/react-query";
import axios from "axios"

type registerData = {
    userID: string,
    emailInput: string,
    passwordInput: string,
    usernameInput: string,
}

const register = async(registerData: registerData) => {
    return await axios.post("http://localhost:3001/users/register", {registerData}, {withCredentials: true,});
}

export const useRegister = () => {
    return useMutation(["registerMutation"], (registerData: registerData) => register(registerData))
}