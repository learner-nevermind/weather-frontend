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
    if (!username) return alert("Type your username");
    if (!password) return alert("Type your password");
    api.auth
      .signIn({
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          navigate(appRoutes.dashboard);
        } else alert(res.data.message);
      })
      .catch((err) => {
        if (err.message) alert(err.message);
        else alert("Something went wrong");
        console.log(err);
      });
  };

  const onSignUp = () => {
    navigate(appRoutes.signUp);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] border border-neutral-400 rounded-xl flex flex-col gap-8 p-8">
        <div className="w-full text-center text-2xl my-4">Sign in to your account</div>
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
        <div className="w-full text-center text-sky-600 cursor-pointer hover:text-sky-300" onClick={onSignUp}>
          You don&apos;t have an account?
        </div>
      </div>
    </div>
  );
}

export default SignIn;
