import { useState } from 'react';
import { Box, Button, Typography, Slide, useTheme } from '@mui/material';

function CustomCookieConsent() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();

    const handleAccept = () => {
        // Close the banner
        setOpen(false);
    };

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1300,
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                    We use essential cookies for the site's operation. By using this site, you accept them. <a href="/privacy-policy" style={{ color: theme.palette.primary.main }}>Learn more</a>.
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAccept}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    I Understand
                </Button>
            </Box>
        </Slide>
    );
}

export default CustomCookieConsent;
