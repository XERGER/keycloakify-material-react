// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

export const clientUiPrimary = {
    50: '#f7e6fd',
    100: '#edc8fb',
    200: '#e1a6f8',
    300: '#d684f5',
    400: '#cb67f3',
    500: '#c327ea',
    600: '#af23d3',
    700: '#9b1ebc',
    800: '#851aa3',
    900: '#66137b',
    A100: '#ff80ab',
    A200: '#ff4081',
    A400: '#c327ea',
    A700: '#c51162',
  } as const;
  
  export const clientUiAccent = {
    50: '#e0ebff',
    100: '#b4ccff',
    200: '#84a8ff',
    300: '#5483ff',
    400: '#2663ff',
    500: '#014cff',
    600: '#0144e4',
    700: '#013ac4',
    800: '#002fa3',
    900: '#001f75',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#014cff',
    A700: '#2962ff',
  } as const;
  
const theme = createTheme({
    palette: {
       
        secondary: clientUiAccent,
        primary: clientUiPrimary,
        //secondary: indigo,
        mode: "dark",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                    textTransform: "none",
                },
                containedPrimary: {
                    backgroundColor: clientUiPrimary[500],
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: clientUiPrimary[700],
                    },
                },
                containedSecondary: {
                    backgroundColor: clientUiAccent[500],
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: clientUiAccent[700],
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2E2E2E",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    padding: "16px",
                },
            },
        },
    },
});

export default theme;
