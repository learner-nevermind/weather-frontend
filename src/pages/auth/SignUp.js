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
    if (latitude < -180 || latitude > 180) return alert("Invalid latitude");
    if (longitude < -180 || longitude > 180) return alert("Invalid longitude");

    api.user
      .signUp({
        username,
        password,
        latitude,
        longitude,
      })
      .then((resp) => {
        if (resp.data.success) alert("User registered successfully");
        else alert(resp.data.message);
      })
      .catch((err) => {
        if (err.message) alert(err.message);
        else alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] border border-neutral-400 rounded-xl flex flex-col gap-8 p-8">
        <div className="w-full text-center text-2xl mb-8">Sign Up</div>
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
        <div className="w-full items-center justify-between flex flex-row gap-4">
          <Input
            placeholder="Type latitude of your location"
            type="number"
            min="-180"
            max="180"
            value={latitude}
            onChange={(e) => setLatitute(e.currentTarget.value)}
          />
          <Input
            placeholder="Type longtitude of your location"
            type="number"
            min="-180"
            max="180"
            value={longitude}
            onChange={(e) => setLongitude(e.currentTarget.value)}
          />
        </div>
        <Button text="Sign up" variant="info" onClick={onSignUp} />
        <div className="w-full text-center text-sky-600 cursor-pointer hover:text-sky-300" onClick={onBackToSignIn}>
          Already have an account?
        </div>
      </div>
    </div>
  );
}

export default SignUp;
