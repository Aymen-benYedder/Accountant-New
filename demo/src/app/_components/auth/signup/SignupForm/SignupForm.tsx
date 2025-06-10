import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import React from "react";
import { validationSchema } from "../validation";

const SignupForm = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={async (data: { name: string; email: string; password: string }) => {
        try {
          // Call your actual API endpoint for registration
          // Replace this with your actual request utility if needed
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${apiBaseUrl}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password
            })
          });
          if (!response.ok) {
            throw new Error("Failed to register account");
          }
          // Optionally, log in the user automatically here with:
          // await login({ email: data.email, password: data.password });

          // Redirect to login page on success
          window.location.href = "/auth/login-1";
        } catch (err: any) {
          // TODO: Display error to user, you may set an error state here!
          alert(err.message || "Registration failed");
        }
      }}
      onChange={() => {}}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput fieldName={"name"} label={"Name"} defaultValue="Admin" />
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={"Email"}
          defaultValue="admin@example.com"
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={"Password"}
          type={values.showPassword ? "text" : "password"}
          margin="none"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          defaultValue="zab#723"
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          // loading={isSubmitting || mutation.isLoading}
        >
          Signup
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
