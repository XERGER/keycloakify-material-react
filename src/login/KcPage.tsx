import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { createTheme, ThemeProvider, useColorScheme } from "@mui/material";
import theme from "../styles/theme";
import { useStyles } from "../styles/useStyles";
import Register from "./pages/Register";
import { useStylesRegister } from "../styles/useStylesRegister";



const shimmerKeyframes = {
    "0%": {
        boxShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
    },
    "50%": {
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
    },
    "100%": {
        boxShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
    },
};

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));

const doMakeUserConfirmPassword = true;


export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={theme}>
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
