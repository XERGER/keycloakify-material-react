import { Suspense, lazy, useEffect, useState } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { useStyles } from "../styles/useStyles";
import Register from "./pages/Register";
import { pink, indigo } from "@mui/material/colors";


const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));

const doMakeUserConfirmPassword = true;


export default function KcPage(props: { kcContext: KcContext }) {


    const lightTheme = createTheme({
        palette: {
            mode: "light",
            primary: pink,
            secondary: indigo,
            background: { default: "#ffffff", paper: "#f0f0f0" },
            text: { primary: "#000000" },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: pink,
            secondary: indigo,
            background: { default: "#303030", paper: "#424242" },
            text: { primary: "#ffffff" },
        },
    });

    const [selectedTheme, setSelectedTheme] = useState<Theme>(lightTheme);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const themeParam = urlParams.get("theme");

        if (themeParam === "dark") {
            setSelectedTheme(darkTheme);
        } else {
            setSelectedTheme(lightTheme);
        }
    }, []);

    // Confirming that the theme is set correctly
    useEffect(() => {
        console.log("Current theme:", selectedTheme.palette.mode);
    }, [selectedTheme]);



    return (
        <ThemeProvider theme={selectedTheme}>
           <KcPageContextualized {...props}></KcPageContextualized>
        </ThemeProvider>
    );


};

 function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });
 
    const {classes} =useStyles();

    return (
        <Suspense>
            {(() => {
        

                switch (kcContext.pageId) {

                    case "login.ftl": return (

                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                    
                      );

                    case "register.ftl": return (

                        <Register
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                            UserProfileFormFields={UserProfileFormFields}
                            doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                        />
                
                  );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
