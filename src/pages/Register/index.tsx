import "./index.css";
import {validationSchema, ValidationSchema} from "./validationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler} from "react-hook-form";
import InputField from "../../components/Form/InputField";
import {Button, Checkbox, FormControlLabel, IconButton} from "@mui/material";
import {AiFillInfoCircle} from "react-icons/ai";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {useRegister} from "./hooks";
import useScreenWidth from "../../stores/screenWidth.ts";

function RegisterPage() {

    const navigate = useNavigate();
    const {screenWidth} = useScreenWidth();

    const {mutateAsync: registerUser} = useRegister();

    const {
        setValue,
        setError,
        register,
        handleSubmit,
        formState: { errors},
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });
    const validateInputs: SubmitHandler<ValidationSchema> = (inputData: ValidationSchema) => handleOnRegister(inputData);

    const handleOnRegister = async(inputData: ValidationSchema) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, inputData.emailInput, inputData.passwordInput);
            await registerUser({
                userID: userCredentials.user.uid,
                emailInput: inputData.emailInput,
                passwordInput: inputData.passwordInput,
                usernameInput: inputData.usernameInput,
            });
            await signInWithEmailAndPassword(auth, inputData.emailInput, inputData.passwordInput);
            navigate("/home");
            navigate(0);
        } catch(error: any) {
            console.log(error.code);
            if(error.code === "auth/email-already-in-use") setError("emailInput", {message: "E-postadresse eksistrer allerede"});

        }
    };

    return (
        <main className="registerPage">
            {screenWidth > 830 &&
                <div className="signInAdvice-container">
                    <img src={"https://static.finncdn.no/_c/static/finn_iphone_98x200.png"}  alt={"Finn på mobil"}/>
                    <p>Logg inn for å sende meldinger, lagre favoritter og søk. Du får også varsler når det skjer noe nytt!</p>
                    <p>Problemer med innloggingen? <a href={"#"}>Her kan du finne hjelp</a></p>
                    <p><a href={"#"}>Tilbake til Finn</a></p>
                </div>
            }
            <form onSubmit={handleSubmit(validateInputs)} className="loginForm-container">
                <div className="loginForm-header">
                    <a href={"#"}><img id={"finnLogo"} src={"https://d3iwtia3ndepsv.cloudfront.net/clients/images/logos/5087dc1b421c7a0b79000000_56e7c4e3c1c45.png"} alt={"Finn logo"} /></a>
                    <a href={"#"}><img id={"schibstedLogo"} src={"https://d3iwtia3ndepsv.cloudfront.net/web/v4.5.11/assets/4c671371b02d586f499a4d89bf58fa50.png"} alt={"Schibsted logo"} /></a>
                </div>
                <div className="loginForm-body">
                    <h1>Opprett bruker</h1>

                    <InputField setValue={setValue} register={register} errorMsg={errors.usernameInput?.message} placeholder={"Skriv inn brukernavn"} id={"usernameInput"} type={"text"} />
                    <InputField setValue={setValue} register={register} errorMsg={errors.emailInput?.message} placeholder={"Skriv inn e-postadresse"} id={"emailInput"} type={"text"} />
                    <InputField setValue={setValue}  register={register} errorMsg={errors.passwordInput?.message} placeholder={"Skriv inn passord"} id={"passwordInput"} type={"password"} />

                    <div className="checkbox-container">
                        <FormControlLabel control={<Checkbox defaultChecked size={"medium"} />} label="Hold meg innlogget" />
                        <IconButton aria-label="info">
                            <AiFillInfoCircle />
                        </IconButton>
                    </div>

                    <Button disabled={errors.emailInput?.message !== undefined || errors.passwordInput?.message !== undefined} sx={{textTransform: "none", fontSize: "1rem", padding: "0.5rem 0", margin: "1rem 0"}} type={"submit"} variant="contained">Opprett bruker</Button>
                    <Button onClick={() => navigate("/login")} sx={{textTransform: "none", fontSize: "1rem", padding: "0.5rem 0"}} variant="text">Logg på</Button>
                </div>
            </form>
        </main>
    );
}

export default RegisterPage;