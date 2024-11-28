import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";

const Register = () => {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const _700 = useMediaQuery("(min-width:700px)");

  const [signinUser, signUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const toggleLogin = () => {
    setLogin((pre) => !pre);
  };

  const handleRegister = async () => {
    const data = {
      userName,
      email,
      password,
    };
    // console.log(data);
    await signinUser(data);
  };
  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    // console.log(data);
    await loginUser(data);
  };

  useEffect(() => {
    if (signUserData.isSuccess) {
      console.log(signUserData.data);
    }
    if (loginUserData.isSuccess) {
      console.log(loginUserData.data);
      window.location.reload();
    }
  }, [signUserData.isSuccess, loginUserData.isSuccess]);
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={
          _700
            ? {
                backgroundImage: 'url("/register-bg.webp")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 600px",
                // background: "cover",
              }
            : null
        }
      >
        <Stack flexDirection={"column"} gap={3} width={_700 ? "40%" : "90%"}>
          <Typography variant="h6" alignSelf={"center"}>
            {login ? "Login with your Email" : " Register with your Email"}
          </Typography>
          {login ? null : (
            <TextField
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your user name..."
            />
          )}

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <Button
            width={"full"}
            sx={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Sign in" : " Sign up"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={"9,0rem"}
            alignSelf={"center"}
          >
            {login ? "Create your account " : " Already have an account ?"}
            <span onClick={toggleLogin} className="login-link">
              {login ? "Register" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
