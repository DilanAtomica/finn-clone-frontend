import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import Register from "../index";

const MockRegisterPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show form", async() => {
    render(<MockRegisterPage />)

    const usernameField = await screen.getByRole("textbox", {name: "Skriv inn brukernavn"});
    expect(usernameField).toBeInTheDocument();

    const emailField = await screen.getByRole("textbox", {name: "Skriv inn e-postadresse"});
    expect(emailField).toBeInTheDocument();

    const passwordField = await screen.getByLabelText("Skriv inn passord");
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute("type", "password");

    const checkbox = await screen.getByRole("checkbox", {name: "Hold meg innlogget", checked: true});
    expect(checkbox).toBeInTheDocument();

    const submitBtn = await screen.getByRole("button", {name: "Opprett bruker"});
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
});

test("Should show error message for short username", async() => {
    render(<MockRegisterPage />)
    const user = userEvent.setup();

    const usernameField = await screen.getByRole("textbox", {name: "Skriv inn brukernavn"});
    await user.type(usernameField, "d");

    const submitBtn = await screen.getByRole("button", {name: "Opprett bruker"});
    await user.click(submitBtn);

    const usernameErrorMsg = await screen.getByText("Brukernavn må ha minimum 2 tegn");
    expect(usernameErrorMsg).toBeInTheDocument();
});

test("Should show error message for taken email", async() => {
    render(<MockRegisterPage />)
    const user = userEvent.setup();

    const usernameField = await screen.getByRole("textbox", {name: "Skriv inn brukernavn"});
    await user.type(usernameField, "dilan");

    const emailField = await screen.getByRole("textbox", {name: "Skriv inn e-postadresse"});
    //En bruker med email dilan@hotmail.com må eksistere for at denne skal kjøre
    await user.type(emailField, "dilan@hotmail.com");

    const passwordField = await screen.getByLabelText("Skriv inn passord");
    await user.type(passwordField, "123asD");

    const submitBtn = await screen.getByRole("button", {name: "Opprett bruker"});
    await user.click(submitBtn);

    const emailErrorMsg = await screen.findByText("E-postadresse eksistrer allerede");
    expect(emailErrorMsg).toBeInTheDocument();
});
