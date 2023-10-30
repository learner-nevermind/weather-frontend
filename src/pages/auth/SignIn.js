import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { appRoutes } from "../../constants";
import api from "../../api";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    api.user
      .signIn({
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          navigate(appRoutes.dashboard);
        }
      });
  };

  const onSignUp = () => {
    navigate(appRoutes.signUp);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] border border-neutral-400 rounded-xl flex flex-col gap-4 px-8 py-16">
        <div className="w-full text-center text-2xl mb-8">Sing In</div>
        <Input
          placeholder="Type your username here"
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
        <Input
          placeholder="Type your password here"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <Button text="Sign in" variant="info" onClick={onSignIn} />
        <Button text="Go to Sign up" variant="success" onClick={onSignUp} />
      </div>
    </div>
  );
}

export default SignIn;
