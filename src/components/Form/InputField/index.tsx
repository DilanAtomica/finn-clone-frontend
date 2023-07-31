import {FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel} from "@mui/material";
import {BiSolidHide, BiSolidShow} from "react-icons/bi";
import React, {useState} from "react";
import {TiDelete} from "react-icons/ti";

type inputFieldProps = {
    register: any,
    errorMsg: string | undefined,
    placeholder: string,
    id: "emailInput" | "passwordInput" | "usernameInput"
    type: "text" | "password",
    setValue: (name: any, value: any) => void,
}

function InputField({register, errorMsg, placeholder, id, type, setValue}: inputFieldProps) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const clearInput = ()=> {
        setValue(id, "");
    };


    return (
        <FormControl sx={{ m: "1rem 0 0.5rem 0", width: '100%' }} variant="filled">
            <InputLabel error={errorMsg !== undefined} htmlFor={id}>{placeholder}</InputLabel>
            <FilledInput
                id={id}
                type={(!showPassword && type) !== "password" ? "text" : type}
                {...register(id)}
                error={errorMsg !== undefined}
                endAdornment={
                    id === "passwordInput" ?
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                        </IconButton>
                    </InputAdornment>
                        :
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear text"
                                edge="end"
                                onClick={clearInput}
                            >
                                <TiDelete />
                            </IconButton>
                        </InputAdornment>
                }
            />
            <FormHelperText error={errorMsg !== undefined} id="filled-weight-helper-text">{errorMsg === undefined ? "*Nødvendig felt" : errorMsg}</FormHelperText>
        </FormControl>
    );
}

export default InputField;