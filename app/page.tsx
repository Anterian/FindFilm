'use client';
import './page.css';
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [filmData, setFilmData] = useState<any[]>([]); 
  const [inputFilm, setInputFilm] = useState(''); 
  const [startFetch, setStartFetch] = useState(false); 
  const [visibleCount, setVisibleCount] = useState(10); 

  // Функция для загрузки фильмов
  const fetchData = () => {
    setStartFetch(true); 

    axios("https://api.kinopoisk.dev/v1.3/movie", {
      headers: {
        "X-API-KEY": "S64TNJR-RSC49DW-QFNM8E4-YAM8C1X",
      },
      params: {
        name: inputFilm,
        limit: 50, 
      },
    })
      .then(res => {
        setFilmData(res.data.docs); 
        setStartFetch(false); 
      })
      .catch(err => {
        console.error(err);
        setStartFetch(false); 
      });
  };

  
  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, filmData.length)); 
  };

  useEffect(() => {
    console.log(filmData)
  }, [filmData])
  
  return (
    <div className="container">
      <h1 className="title">Поиск фильмов или сериалов</h1>

      <div className="search-bar">
        <input
          onChange={e => setInputFilm(e.target.value)}
          value={inputFilm}
          className="input-field"
          type="text"
          placeholder="Введите название фильма..."
        />
        <button className="search-button" onClick={fetchData}>
          Найти фильм/сериал
        </button>
      </div>

      <div className="film-list">
        {startFetch ? (
          <div>
            {visibleCount > 0 && (
              <div className="film-item">
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
                <div className="skeleton-item"></div>
              </div>
            )}
          </div>
        ) : (
          <ol className="film-items">
            {filmData.slice(0, visibleCount).map(film => (
              <li key={film.id} className="film-item">
                <h3 className="film-name">{film.name}</h3>
                <p className="film-description">{film.description}</p>
                <p className="film-rating">Рейтинг кинопоиск: {film.rating.kp}</p>
                <div className="film-rating">Жанр: {film.genres[0].name} </div>
                
           
                
              </li>
            ))}
          </ol>
        )}

      
        {visibleCount < filmData.length && !startFetch && (
          <button className="search-button" onClick={handleShowMore}>
            Показать ещё...
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;