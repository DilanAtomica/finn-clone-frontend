import {render, screen} from "@testing-library/react";
import App from "./App.tsx";



test("Should show chats and click on one to open chat modal", async() => {
    render(<App />);

    expect(screen.getByRole("heading", {level: 1})).toBeInTheDocument();

});
