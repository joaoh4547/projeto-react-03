import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${p => p.theme["green-500"]}
    }

    body{
        background-color:  ${p => p.theme["gray-900"]};
        color:  ${p => p.theme["gray-100"]};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
        font: 400 1rem  Roboto, sans-serif;
    }

`;