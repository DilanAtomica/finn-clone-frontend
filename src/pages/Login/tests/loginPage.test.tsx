import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {client} from "../../../lib/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import Login from "../index";

const MockLoginPage = () => {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </QueryClientProvider>
    )
};

test("Should show form", async() => {
    render(<MockLoginPage />)

    const emailField = await screen.getByRole("textbox", {name: "Skriv inn din e-postadresse"});
    expect(emailField).toBeInTheDocument();

    const passwordField = await screen.getByLabelText("Skriv inn ditt passord");
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute("type", "password");

    const checkbox = await screen.getByRole("checkbox", {name: "Hold meg innlogget", checked: true});
    expect(checkbox).toBeInTheDocument();

    const submitBtn = await screen.getByRole("button", {name: "Logg på"});
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
});

test("Clear input field and hide/show password should work", async() => {
    render(<MockLoginPage />)
    const user = userEvent.setup();

    //Can hide and show password
    const passwordField = await screen.getByLabelText("Skriv inn ditt passord");
    const showPasswordBtn = await screen.getByRole("button", {name: /toggle password visibility/i});
    expect(showPasswordBtn).toBeInTheDocument();
    await user.click(showPasswordBtn);
    expect(passwordField).toHaveAttribute("type", "text");
    await user.click(showPasswordBtn);
    expect(passwordField).toHaveAttribute("type", "password");

    //Can clear email
    const emailField = await screen.getByRole("textbox", {name: "Skriv inn din e-postadresse"});
    const clearEmailBtn = await screen.getByRole("button", {name: /clear text/i});
    expect(clearEmailBtn).toBeInTheDocument();
    await user.type(emailField, "hello");
    expect(emailField).toHaveValue("hello");
    await user.click(clearEmailBtn);
    expect(emailField).toHaveValue("");

});
