// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";
import { pink, indigo } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: pink,
        secondary: indigo,
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
                    backgroundColor: pink[500],
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: pink[700],
                    },
                },
                containedSecondary: {
                    backgroundColor: indigo[500],
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: indigo[700],
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
