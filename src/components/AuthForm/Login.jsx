import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
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
      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
        Login
      </Button>
    </>
  );
};

export default Login;
