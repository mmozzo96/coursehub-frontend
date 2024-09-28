import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const chakraTheme = extendTheme({
    styles: {
        global: {
            body: {
                h: "100vh",
                "::-webkit-scrollbar": {
                    width: "8px",
                },
                "::-webkit-scrollbar-track": {
                    display: "none",
                },
                "::-webkit-scrollbar-thumb": {
                    borderRadius: "4px",
                    background: "rgba(115, 112, 112, 0.5)",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(115, 112, 112, 0.7)",
                    opacity: 1,
                },
            },
        },
    },
});

export default chakraTheme;
