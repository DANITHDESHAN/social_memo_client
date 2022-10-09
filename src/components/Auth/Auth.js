import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Avatar,
  Paper,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { gapi } from "gapi-script";

import {signin,signup} from '../../actions/auth';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isSignup, setIsSignup] = useState(false);
  const [showPasssword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:profile", start);
  }, []);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
   if(isSignup){
      dispatch(signup(formData,history))
   }else{
    dispatch(signin(formData,history))

   }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };
  const GoogleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const GoogleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was Unsuccessful,Sign In later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPasssword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="953619510815-9prbruhu9d3h49rld0r9r382trojj1jg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={GoogleSuccess}
            onFailure={GoogleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
