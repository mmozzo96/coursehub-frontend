import { extendTheme } from "@chakra-ui/react";

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
    breakpoints: {
        base: "0em", // 0px
        sm: "300px", // ~480px. em is a relative unit and is dependant on the font-size.
        md: "48em", // ~768px
        lg: "62em", // ~992px
        xl: "80em", // ~1280px
        "2xl": "96em", // ~1536px
    },
});

export default chakraTheme;
