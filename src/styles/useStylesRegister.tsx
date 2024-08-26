import { ClassKey } from "keycloakify/login";
import { tss } from "tss-react/mui";

export const useStylesRegister = tss.create(({ theme }) => ({
    kcHtmlClass: {
        ":root": {
            colorScheme: "dark",
        },
    },
    
    kcBodyClass: {
        backgroundColor: theme.palette.background.default,
    },

    kcFormCardClass: {
        borderTop: `4px solid ${theme.palette.secondary.main}`,
        boxShadow: theme.shadows[5],
        padding: "0 20px",
        maxWidth: "500px",
        margin: "0 auto",
        background: "#303030",
        borderRadius: "8px",
    },

    kcLocaleListItemClass: {
        padding: "10px",
        "&.active": {
            backgroundColor: theme.palette.action.selected,
        },
        background: "#303030",
        "&:hover": {
            background: "#303030",
        },
    },
    
    kcLocaleDropDownClass: {
        color: theme.palette.text.primary,
        paddingTop: "10px",
    },
    
    kcButtonClass: {
        width: "100%", // Full width button
        backgroundColor: theme.palette.secondary.main, // Primary theme color
        color: theme.palette.primary.contrastText, // Contrast text color
        padding: theme.spacing(1.5), // Vertical padding for larger button size
        fontSize: "16px", // Larger font size for emphasis
        borderRadius: "4px", // Rounded corners
        border: "none", // Remove default border
        cursor: "pointer",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark, // Darker shade on hover
            boxShadow: `0 0 1px ${theme.palette.secondary.light}`, // Add glowing effect
            animation: `shimmer 1.5s infinite`, // Apply shimmer animation
        },
    },

    kcInfoAreaWrapperClass: {
        boxShadow: theme.shadows[5],
        padding: "0 20px",
        maxWidth: "500px",
        margin: "0 auto",
        marginBottom: "20px",
        backgroundColor: "#303030!important",
        borderRadius: "8px",
    },
 
    kcLabelClass: {
        color: "#ccc",
        fontSize: "0.9em",
        fontWeight: "bold",
    },

}) satisfies { [key in ClassKey]?: unknown; });
