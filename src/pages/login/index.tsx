import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "@/common/contexts/authContext";
import { useRouter } from "next/router";
import { PATH_AUTH } from "@/common/routes/path";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login = () => {} } = useAuthContext() || {};

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
      <Button variant="outlined" onClick={() => login({ email, password })}>
        Login
      </Button>
      <Button variant="text" onClick={() => router.push(PATH_AUTH.register)}>
        <Typography variant="caption">
          or register if you haven't made an account
        </Typography>
      </Button>
    </div>
  );
}

export default LoginPage;
