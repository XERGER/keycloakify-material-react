import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "Single-Page",
            keycloakVersionTargets: {
                "22-to-25": "keycloak-theme.jar",
                "all-other-versions": false,
            },
            environmentVariables: [
                { name: "CONTINUE_URL", default: "" },
            ]
        })
    ]
});
