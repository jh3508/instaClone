import { Alert, AlertIcon, Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

  const handleLogin = () => {
    login(inputs);
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        size={"sm"}
        type="email"
        value={inputs.email}
        onChange={(event) => {
          setInputs({ ...inputs, email: event.target.value });
        }}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(event) => {
          setInputs({ ...inputs, password: event.target.value });
        }}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        isLoading={loading}
        onClick={handleLogin}
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
