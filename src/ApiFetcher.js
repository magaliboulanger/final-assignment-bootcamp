export const getCharacters = async (input) => {
  return await fetch(
    "https://gateway.marvel.com:443/v1/public/characters?apikey=" +
      import.meta.env.VITE_REACT_APP_MARVEL_API_KEY +
      "&hash=" +
      import.meta.env.VITE_REACT_APP_API_HASH +
      "&ts=" +
      import.meta.env.VITE_API_TS +
      "&nameStartsWith=" +
      input,
    {
      method: "GET",
      withCredentials: true,
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    }
  )
};


export const getComics = async (id) => {
    return await fetch(
      "https://gateway.marvel.com:443/v1/public/characters/" +
        id +
        "/comics?orderBy=onsaleDate&apikey=" +
        import.meta.env.VITE_REACT_APP_MARVEL_API_KEY +
        "&hash=" +
        import.meta.env.VITE_REACT_APP_API_HASH +
        "&ts=" +
        import.meta.env.VITE_API_TS,
      {
        method: "GET",
        withCredentials: true,
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      }
    )
  };
