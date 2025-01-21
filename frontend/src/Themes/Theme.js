import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let primaryColor = ['#e1f0ef', '#71c6c9', "#2aa1af", '#0e5563', '#06323d' ]
let secondaryColor = ['#f0f2f4', '#DBE0E5', '#5B6B79', '#3E4853', '#131920']
let successColor = ['#e1f3d8', '#98d576', '#6bc33c', '#4b892a', '#2b4e18']
let errorColor = ['#f5d6d6', '#dd6e6e', '#c62e2e', '#912222', '#531313']
let warningColor = ['#fff9e6', '#fde281', '#fccd2a', '#e2b203', '#977702']

let theme = createTheme({
    palette: {
        primary: {
            lighter: primaryColor[0],
            light: primaryColor[1],
            main: primaryColor[2],
            dark: primaryColor[3],
            darker: primaryColor[4]
        },
        secondary: {
            lighter: secondaryColor[0],
            light: secondaryColor[1],
            main: secondaryColor[2],
            dark: secondaryColor[3],
            darker: secondaryColor[4]
        },
        success: {
            lighter: successColor[0],
            light: successColor[1],
            main: successColor[2],
            dark: successColor[3],
            darker: successColor[4]
        },
        error: {
            lighter: errorColor[0],
            light: errorColor[1],
            main: errorColor[2],
            dark: errorColor[3],
            darker: errorColor[4]
        },
        warning: {
            lighter: warningColor[0],
            light: warningColor[1],
            main: warningColor[2],
            dark: warningColor[3],
            darker: warningColor[4]
        },
    },

    typography: {
        fontFamily: "'Poppins', sans-serif",
    }
})
theme = responsiveFontSizes(theme);

export default theme