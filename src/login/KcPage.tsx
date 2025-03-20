import { Suspense, lazy, useEffect, useState } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { useStyles } from "../styles/useStyles";
import Register from "./pages/Register";
import "./main.css"; 

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));

const doMakeUserConfirmPassword = true;
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
  A400: '#f50057',
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
  A400: '#2979ff',
  A700: '#2962ff',
} as const;



export default function KcPage(props: { kcContext: KcContext }) {

    const lightTheme = createTheme({
        palette: {
            mode: "light",
            primary: clientUiPrimary,
            secondary: clientUiAccent,
            background: { default: "#ffffff", paper: "#f0f0f0" },
            text: { primary: "#000000" },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: clientUiPrimary,
            secondary: clientUiAccent,
            background: { default: "#303030", paper: "#424242" },
            text: { primary: "#ffffff" },
        },
    });

    const [selectedTheme, setSelectedTheme] = useState<Theme>(lightTheme);
    const [isGlobalInput, setIsGlobalInput] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
      
        // THEME
        const themeParam = urlParams.get("theme");
        const savedTheme = localStorage.getItem("theme");
        if (themeParam) {
          localStorage.setItem("theme", themeParam);
          setSelectedTheme(themeParam === "dark" ? darkTheme : lightTheme);
        } else if (savedTheme === "dark") {
          setSelectedTheme(darkTheme);
        } else {
          setSelectedTheme(lightTheme);
        }
      
        // LANG
        const langParam = urlParams.get("lang");
        const savedLang = localStorage.getItem("lang");
        if (langParam) {
          localStorage.setItem("lang", langParam);
        } else if (savedLang) {
          // optionally update the URL to use the savedLang without reloading
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("lang", savedLang);
          window.history.replaceState({}, "", newUrl.toString());
        }

        try {
            const storedValue = localStorage.getItem("isGlobalInput");
            setIsGlobalInput(storedValue === "true");
          } catch (err) {
            console.error("Error reading isGlobalInput from localStorage:", err);
          }
      }, []);
    
    return (
        <ThemeProvider theme={selectedTheme}>
           <KcPageContextualized isGlobalInput={isGlobalInput} {...props}></KcPageContextualized>
        </ThemeProvider>
    );


};

 function KcPageContextualized(props: { kcContext: KcContext ; isGlobalInput: boolean}) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });
 
    const { classes } = useStyles();

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
