import {rest} from "msw";

export const handlers = [
    rest.post("http://localhost:3001/users/register", (req, res, ctx) => {
        return res(

        )
    }),

    
]