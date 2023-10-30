import { useEffect, useState } from "react";
// import Input from "../../components/Input";
// import Button from "../../components/Button";
// import api from "../../api";
import { appRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/layout/Appbar";
import api from "../../api";
import Spinner from "../../components/Spinner";

function Dashboard() {
  const [token] = useState(JSON.parse(localStorage.getItem("token")));
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (!token || !userInfo) return navigate(appRoutes.signIn);
    api.location.getByPosition(userInfo.location).then((resp) => {
      setLocation(resp.data);
      api.weather.currentCond({ key: resp.data["Key"] }).then((res) => {
        setWeather(res.data[0]);
      });
    });
  }, [token, userInfo, navigate]);

  return (
    <>
      <Appbar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="border border-neutral-600 rounded-xl p-6 mt-32 w-[480px] flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <div>
              Hello, <span className="font-bold">{userInfo?.username}!</span>
            </div>
            <div>Today&apos;s weather</div>
          </div>
          {weather ? (
            <>
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">{weather.Temperature.Metric.Value}°C</div>
                  <div className="text-md">{weather.WeatherText}</div>
                </div>
                <div>
                  <img className="w-full h-16" src={`img/weathers/${weather.WeatherIcon}.png`} alt="weather icon" />
                </div>
              </div>
              <div className="w-full text-center text-4xl font-semibold">{location.EnglishName}</div>
              <div>Weather Info</div>
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Wind Gusts</div>
                    <div>{weather.WindGust.Speed.Metric.Value} km/h</div>
                  </div>
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Pressure</div>
                    <div>{weather.Pressure.Metric.Value} mb</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Humidity</div>
                    <div>{weather.RelativeHumidity || 0} %</div>
                  </div>
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Cloud Cover</div>
                    <div>{weather.CloudCover || 0} %</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Indoor Humidity</div>
                    <div>{weather.IndoorRelativeHumidity || 0} %</div>
                  </div>
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Visibility</div>
                    <div>{weather.Visibility.Metric.Value} km</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Dew Point</div>
                    <div>{weather.DewPoint.Metric.Value} °C</div>
                  </div>
                  <div className="w-1/2 py-2 border-b border-neutral-400 flex items-center justify-between">
                    <div>Cloud Ceiling</div>
                    <div>{weather.Ceiling.Metric.Value} m</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
