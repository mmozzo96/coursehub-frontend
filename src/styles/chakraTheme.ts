import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
    styles: {
        global: {
            body: {
                h: "100vh",
            },
        },
    },
});

export default chakraTheme;
