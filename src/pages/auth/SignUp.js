import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { appRoutes } from "../../constants";
import api from "../../api";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [latitude, setLatitute] = useState("");
  const [longitude, setLongitude] = useState("");

  const onBackToSignIn = () => {
    navigate(appRoutes.signIn);
  };

  const onSignUp = () => {
    if (!username) return alert("Type username.");
    if (!password) return alert("Type password.");
    if (password !== confirmPassword) return alert("Password mismatch.");
    if (!latitude) return alert("Type latitude");
    if (!longitude) return alert("Type longitude");

    api.user
      .signUp({
        username,
        password,
        latitude,
        longitude,
      })
      .then(() => {
        alert("User registered successfully");
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] border border-neutral-400 rounded-xl flex flex-col gap-4 px-8 py-16">
        <div className="w-full text-center text-2xl mb-8">Sing Up</div>
        <Input
          placeholder="Type your username here"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          placeholder="Type your password here"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Input
          placeholder="Confirm your password here"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Input
          placeholder="Type latitude of your location"
          type="number"
          value={latitude}
          onChange={(e) => setLatitute(e.currentTarget.value)}
        />
        <Input
          placeholder="Type longtitude of your location"
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.currentTarget.value)}
        />
        <Button text="Sign up" variant="info" onClick={onSignUp} />
        <Button text="Back to Sign In" variant="success" onClick={onBackToSignIn} />
      </div>
    </div>
  );
}

export default SignUp;
