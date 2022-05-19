
import * as React from "react";
import {useState} from "react";
import {useAuth} from "../../services/contexts/AuthContext";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import {Alert, Collapse} from "@mui/material";


export default function LoginForm() {
    const [message, setMessage] = useState({text: "", error: false, show: false})
    const {userService, setUser, saveUser} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        userService.login({
            username: data.get("username"),
            password: data.get("password")
        }).then(response => {
            const signedUser = response.data.user;

            if (signedUser !== null && signedUser !== undefined) {
                const newUser = {
                    name: signedUser.firstName + " " + signedUser.lastName,
                    token: response.headers.authorization,
                    email: signedUser.username
                }
                saveUser(newUser)
                setUser(newUser)
                setMessage({
                    text: response.data.message,
                    error: false,
                    show: true
                })
            }
        }).catch(error => {
            const raisedError = error.response.data.apierror

            console.log({raisedError})
            if (raisedError !== null) {
                setMessage({
                    text: raisedError.message,
                    error: true,
                    show: true
                })
            }
        });
    };

    return <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
        <Collapse in={message.show}>
            <Alert severity={message.error ? "error" : "success"}>{message.text}</Alert>
        </Collapse>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            error={message.error}
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={message.error}
            autoComplete="current-password"
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item xs>
                {/*<Link href="#" variant="body2">*/}
                {/*    {"Forgot password?"}*/}
                {/*</Link>*/}
            </Grid>
            <Grid item>
                <Link href={"/auth/registration"} variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
    </Box>
}