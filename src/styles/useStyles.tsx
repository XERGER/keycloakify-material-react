import { ClassKey } from "keycloakify/login";
import { tss } from "tss-react/mui";

export const useStyles = tss.create(({ theme }) => ({
    kcHtmlClass: {
        ":root": {
            colorScheme: theme.palette.mode, // Dynamically use the theme's mode (dark or light)
        },
    },
    
    kcBodyClass: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },

    kcFormCardClass: {
        borderTop: `4px solid ${theme.palette.secondary.main}`,
        boxShadow: theme.shadows[5],
        padding: "0 20px",
        maxWidth: "500px",
        margin: "0 auto",
        background: theme.palette.background.default, // Use paper background from theme
        borderRadius: "8px",
        paddingBottom: "20px",
        transition: "background-color 0.3s ease",
    },

    kcLocaleListItemClass: {
        padding: "10px",
        "&.active": {
            backgroundColor: theme.palette.action.selected,
        },
        background: theme.palette.background.default,
        "&:hover": {
            background: theme.palette.background.default,
        },
    },
    
    kcLocaleDropDownClass: {
        color: theme.palette.text.primary,
        paddingTop: "10px",
    },
    
    kcButtonClass: {
        width: "100%", 
        backgroundColor: theme.palette.secondary.main, 
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1.5),
        fontSize: "16px", 
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: `0 0 1px ${theme.palette.secondary.light}`,
        },
    },

    kcInfoAreaWrapperClass: {
        boxShadow: theme.shadows[5],

        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: `${theme.palette.background.default} !important`, // Make backgroundColor important

        borderRadius: "8px",
        transition: "background-color 0.3s ease",
    },
 
    kcLabelClass: {
        color: theme.palette.text.primary,
        fontSize: "0.9em",
        fontWeight: "bold",
    },
}) satisfies { [key in ClassKey]?: unknown; });