import React, {useState} from "react";
import Router from "./routes/router";
import {useAuth} from "./services/contexts/AuthContext"
import {Routes} from "./routes/routes";
import {red} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";

const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
});

function App() {
    const {user} = useAuth();

    // Sidebar toggle
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    console.log({user})
    console.log(user.name === "")
    if (user.name === "") {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Router>
                        <Routes/>
                    </Router>
                </Box>
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Router>
                        <Routes/>
                    </Router>
                </Box>
            </ThemeProvider>
        )
    }
}

export default App;
