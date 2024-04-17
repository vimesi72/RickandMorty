import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import LocationData from "./components/LocationData";
import ResidentCard from "./components/ResidentCard";

function App() {
  const [inputValue, setInputValue] = useState(
    Math.floor(Math.random() * 126) + 1
  );
  const [location, getLocation, isLoading, hasError] = useFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  //console.log(location);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = "";
  };

  return (
    <>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <div className="app">
          <h1>Rick and Morty</h1>
          <form className="app__form" onSubmit={handleSubmit}>
            <input className="app__input" type="text" ref={textInput} />
            <button className="app__btn">Search</button>
          </form>
          {hasError || inputValue === "0" ? (
            <h2>Hey! you must provide and id fro 1 to 126</h2>
          ) : (
            <div className="app__container">
              <LocationData location={location} />
              <div>
                {location?.residents.map((resident) => (
                  <ResidentCard key={resident} url={resident} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
