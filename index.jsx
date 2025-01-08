const lat = 41.16961335920826;
const lon = 71.46583165711743;

export const command = `
  curl -s "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=355227495210c83dcc4f7cb00e980869"
`;

export const refreshFrequency = 60 * 1000;

export const render = ({ output }) => {
  let temp = "0"; // Default temperature
  let weatherInfo = "weather"; // Default weather information
  let weatherDescription = "weather"; // Default weather description

  try {
    if (output) {
      const weather = JSON.parse(output);
      temp = (weather.main.temp - 273.15).toFixed(1);
      weatherInfo = weather.weather[0].main;
      weatherDescription = weather.weather[0].description;
    }
  } catch (error) {}

  const getBackgroundAndIcon = (weatherType, weatherDescription) => {
    switch (weatherType) {
      case "Clouds":
        if (weatherDescription === "broken clouds") {
          return {
            background:
              "linear-gradient(to bottom right,rgba(42, 42, 42, 0.56),rgba(129, 134, 143, 0.56))",
            icon: "Weather.widget/icons/broken_cloud.svg",
          };
        }
        return {
          background:
            "linear-gradient(to bottom right,rgba(86, 86, 86, 0.56),rgba(129, 134, 143, 0.56))",
          icon: "Weather.widget/icons/cloudly_sun.svg",
        };
      case "Clear":
        if (new Date().getHours() > 18) {
          return {
            background:
              "linear-gradient(to bottom right,rgba(0, 0, 0, 0.56),rgba(0, 0, 0, 0.56))",
            icon: "Weather.widget/icons/moon.svg",
          };
        }
        return {
          background:
            "linear-gradient(to bottom right,rgba(255, 223, 0, 0.56),rgba(255, 165, 0, 0.56))",
          icon: "Weather.widget/icons/sun.svg",
        };
      case "Rain":
        return {
          background:
            "linear-gradient(to bottom right,rgba(0, 0, 255, 0.56),rgba(0, 191, 255, 0.56))",
          icon: "Weather.widget/icons/rainy.svg",
        };
      case "Snow":
        return {
          background:
            "linear-gradient(to bottom right,rgba(198, 198, 198, 0.56),rgba(192, 192, 192, 0.56))",
          icon: "Weather.widget/icons/snow.svg",
        };
      case "Mist":
      case "Fog":
        return {
          background:
            "linear-gradient(to bottom right,rgba(169, 169, 169, 0.56),rgba(192, 192, 192, 0.56))",
          icon: "Weather.widget/icons/mist.svg",
        };
      case "Thunderstorm":
        return {
          background:
            "linear-gradient(to bottom right,rgba(105, 105, 105, 0.56),rgba(169, 169, 169, 0.56))",
          icon: "Weather.widget/icons/thunder_cloud.svg",
        };
      case "Drizzle":
        return {
          background:
            "linear-gradient(to bottom right,rgba(173, 216, 230, 0.56),rgba(0, 191, 255, 0.56))",
          icon: "Weather.widget/icons/rainy.svg",
        };
      default:
        return {
          background: "linear-gradient(to bottom right, #1e3c7290, #2a529890)",
          icon: "Weather.widget/icons/sun.svg",
        };
    }
  };

  const { background, icon } = getBackgroundAndIcon(
    weatherInfo,
    weatherDescription
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "820px",
        left: "285px",
        background: background,
        borderRadius: "20px",
        width: "150px",
        height: 74,
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        textAlign: "center",
        display: "flex",
      }}
      id="weatherContainer"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <img
          src={icon}
          style={{
            height: 65,
            width: 65,
          }}
          id="weatherInfoImage"
        />
        <img
          src={icon}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 73,
            width: 73,
            WebkitFilter: "blur(15px)",
          }}
          id="weatherInfoImage"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          {temp}°
        </p>
        <p
          style={{
            fontSize: "15px",
            textTransform: "capitalize",
            opacity: "0.5",
            margin: "0",
          }}
        >
          {weatherInfo}
        </p>
      </div>
    </div>
  );
};
