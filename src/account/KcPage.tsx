import { lazy } from "react";
import { KcAccountUiLoader } from "@keycloakify/keycloak-account-ui";
import type { KcContext } from "./KcContext";
import "./main.css";

const KcAccountUi = lazy(() => import("./KcAccountUi"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return <KcAccountUiLoader kcContext={kcContext} KcAccountUi={KcAccountUi} />;
}
