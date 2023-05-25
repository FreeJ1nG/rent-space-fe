import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "@/common/contexts/authContext";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const { register = () => {} } = useAuthContext() || {};

  return (
    <div className="flex flex-col w-full gap-y-4 p-8">
      <TextField
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        label="Email"
        type="text"
      />
      <TextField
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        label="Password"
        type="password"
      />
      <TextField
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
        placeholder="John"
        label="First name"
        type="text"
      />
      <TextField
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
        placeholder="Doe"
        label="Last name"
        type="text"
      />
      <Button
        variant="outlined"
        onClick={() => register({ email, password, firstname, lastname })}
      >
        Register
      </Button>
    </div>
  );
}

export default RegisterPage;
