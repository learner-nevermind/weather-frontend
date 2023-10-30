import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Appbar from "../../components/layout/Appbar";
import api from "../../api";
import { appRoutes } from "../../constants";

function Profile() {
  const navigate = useNavigate();
  const [token] = useState(JSON.parse(localStorage.getItem("token")));
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [username, setUsername] = useState(userInfo.username);
  const [latitude, setLatitute] = useState(userInfo.location.lat);
  const [longitude, setLongitude] = useState(userInfo.location.long);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!token || !userInfo) return navigate(appRoutes.signIn);
  }, [token, userInfo, navigate]);

  const onProfileUpdate = () => {
    if (!username) return alert("Type username.");
    if (!latitude) return alert("Type latitude");
    if (!longitude) return alert("Type longitude");
    if (latitude < -180 || latitude > 180) return alert("Invalid latitude");
    if (longitude < -180 || longitude > 180) return alert("Invalid longitude");
    api.user
      .profile({ username, latitude, longitude }, token)
      .then((resp) => {
        if (resp.data.success) {
          localStorage.setItem("userInfo", JSON.stringify(resp.data.userInfo));
          alert("Updated successfully");
        } else alert(resp.data.message);
      })
      .catch((err) => {
        if (err.message) alert(err.message);
        else alert("Something went wrong");
        console.log(err);
      });
  };

  const onPasswordUpdate = () => {
    if (!currentPassword) return alert("Type current password");
    if (!newPassword) return alert("Type new password");
    if (!confirmPassword) return alert("Confirm password");
    if (newPassword !== confirmPassword) return alert("New password mismatch");
    api.user
      .password({ currentPassword, newPassword, confirmPassword }, token)
      .then((resp) => {
        if (resp.data.success) {
          alert("Updated successfully");
          setModalOpen(false);
        } else alert(resp.data.message);
      })
      .catch((err) => {
        if (err.message) alert(err.message);
        else alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <>
      <Appbar />
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[480px] mt-32 border border-neutral-400 rounded-xl flex flex-col gap-8 p-8">
          <div className="w-full text-center text-2xl mb-8">Your Profile</div>
          <div className="flex flex-col gap-2">
            <div>Username</div>
            <Input
              placeholder="Type your username here"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="w-full items-center justify-between flex flex-row gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <div>Latitude</div>
              <Input
                placeholder="Type latitude of your location"
                type="number"
                min="-180"
                max="180"
                value={latitude}
                onChange={(e) => setLatitute(e.currentTarget.value)}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <div>Longitude</div>
              <Input
                placeholder="Type longtitude of your location"
                type="number"
                min="-180"
                max="180"
                value={longitude}
                onChange={(e) => setLongitude(e.currentTarget.value)}
              />
            </div>
          </div>
          <Button text="Save" variant="info" onClick={onProfileUpdate} />
          <Button text="Update your password" variant="success" onClick={() => setModalOpen(true)} />
        </div>
      </div>
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex flex-col gap-6 p-6 pb-4">
                    <div className="w-full text-center text-xl">Update your password</div>
                    <Input
                      placeholder="Type current password here"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                    />
                    <Input
                      placeholder="Type new password here"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                    />
                    <Input
                      placeholder="Confirm new password here"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-blue-400 sm:mt-0 sm:w-auto"
                      onClick={onPasswordUpdate}
                    >
                      Update
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Profile;
