import {
  Avatar,
  Box,
  Container,
  Stack,
  Icon,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { PetsOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";

const useStyles = (theme) => ({
  inpuText: {
    "& label.Mui-focused": {
      color: `${theme.palette.neutral.light}`,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: `${theme.palette.neutral.light}`,
    },
  },

  errorText: {
    "& label.Mui-focused": {
      color: "red",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "red",
    },
  },

  signupButton: {
    borderRadius: 28,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    transition: ".2s",
    backgroundColor: `${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.main}`,
      paddingLeft: 6,
      paddingRight: 6,
    },
  },
});

export const LoginForm = ({ onLoginSubmitHandler }) => {
  const theme = useTheme();

  const styles = useStyles(theme);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();

  const isInputError = () => {
    let isError = false;

    const email = emailRef.current.value;
    const name = nameRef.current.value;

    if (email === "") {
      isError = true;
      setEmailError(true);
    } else if (
      (email.match(/@/g) || []).length !== 1 ||
      (email.match(/\./g) || []).length < 1
    ) {
      isError = true;
      setEmailError(true);
    } else if (
      email.indexOf(".") === 0 ||
      email.indexOf("@") === 0 ||
      email.indexOf("-") === 0 ||
      email.indexOf("_") === 0
    ) {
      isError = true;
      setEmailError(true);
    } else if (/[^a-zA-Z0-9.@_-]/.test(email)) {
      isError = true;
      setEmailError(true);
    }

    if (name === "") {
      isError = true;
      setNameError(true);
    }

    return isError;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isError = isInputError();

    if (!isError) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;

      setEmailError(false);
      setNameError(false);

      onLoginSubmitHandler({ name, email });
    } else {
      console.log("error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Icon
        sx={{
          // color: `${colors.blueAccent[500]}`,
          marginRight: "0.5rem",
          marginBottom: "0.2rem",
          alignSelf: "center",
          width: 80,
          height: 80,
        }}
      >
        <PetsOutlined
          sx={{
            width: 80,
            height: 80,
            // color: `${theme.palette.secondary.main}`,
          }}
        />
      </Icon>
      <h1>Welcome, please login</h1>
      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          mt={2}
          px={6}
        >
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <TextField
              sx={nameError ? styles.errorText : styles.inpuText}
              required
              id="name"
              label="Name"
              fullWidth
              variant="filled"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              error={nameError}
              helperText={nameError && "Please enter your name"}
              inputRef={nameRef}
            />
            <TextField
              sx={emailError ? styles.errorText : styles.inpuText}
              required
              id="email"
              label="Email"
              fullWidth
              variant="filled"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              error={emailError}
              helperText={emailError && "Please enter correct email"}
              inputRef={emailRef}
            />
          </Stack>
          <Box
            mt={5}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button type="submit" variant="contained" sx={styles.signupButton}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
