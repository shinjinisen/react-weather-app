// import React, { useState } from "react";
// import "./Weather.css";

// const api = {
//   key: "d3b47e4d1a0e550d289c10aa460e156b",
//   base: "https://api.openweathermap.org/data/2.5/"
// };

// function App() {
//   const [query, setQuery] = useState("");
//   const [weather, setWeather] = useState({});

//   const search = (evt) => {
//     if (evt.key === "Enter") {
//       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//         .then((res) => res.json())
//         .then((result) => {
//           setWeather(result);
//           setQuery("");
//           console.log(result);
//         });
//     }
//   };

//   const dateBuilder = (d) => {
//     let months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ];
//     let days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday"
//     ];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`;
//   };

//   return (
//     <div
//       className={
//         typeof weather.main != "undefined"
//           ? weather.main.temp > 16
//             ? "app warm"
//             : "app"
//           : "app"
//       }
//     >
//       <main>
//         <div className="search-box">
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//             onKeyPress={search}
//           />
//         </div>
//         {typeof weather.main != "undefined" ? (
//           <div>
//             <div className="location-box">
//               <div className="location">
//                 {weather.name}, {weather.sys.country}
//               </div>
//               <div className="date">{dateBuilder(new Date())}</div>
//             </div>
//             <div className="weather-box">
//               <div className="temp">{Math.round(weather.main.temp)}°c</div>
//               <div className="weather">{weather.weather[0].main}</div>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./Weather.css";

const api = {
  key: "d3b47e4d1a0e550d289c10aa460e156b",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        );
        const result = await response.json();
        setWeather(result);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      setQuery(evt.target.value);
    }
  };

  const handleInputChange = (evt) => {
    const inputValue = evt.target.value;
    setQuery(inputValue);

    // Fetch suggested locations based on user input
    fetch(`${api.base}find?q=${inputValue}&type=like&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setSuggestedLocations(result.list);
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleInputChange}
            value={query}
            onKeyPress={search}
            list="suggestedLocations" // Bind to the datalist
          />
          <datalist id="suggestedLocations">
            {suggestedLocations && suggestedLocations.length > 0 ? (
              suggestedLocations.map((location) => (
                <option key={location.id} value={location.name} />
              ))
            ) : (
              <option value="No suggestions found" />
            )}
          </datalist>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

