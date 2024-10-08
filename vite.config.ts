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
                "21-and-below": false,
                "22-and-above": "keycloak-theme.jar"
            },
            environmentVariables: [
                { name: "CONTINUE_URL", default: "" },
            ]
        })
    ]
});
