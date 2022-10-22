import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

export default function Home({ setToken }) {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [crslMovie, setCrslMovie] = useState(null)
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchData = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=ca6104606a50d22fef2f8977abfb20a8&language=en-US&page=1')
      .then((response) => {
        setMovies(response.data.results)
      })
      .catch((error) => console.log(error))
  }

  const getPosterURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
  }

  function searchMovies(e) {
    e.preventDefault();
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=ca6104606a50d22fef2f8977abfb20a8&language=en-US&query=${search}&page=1&include_adult=false`)
      .then((response) => {setMovies(response.data.results);
      });
  }

  useEffect(()=>{
    fetchData()
  }, [])

  const crsl1 = async () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=ca6104606a50d22fef2f8977abfb20a8')
      .then((response) => {
        setCrslMovie(response.data.results.slice(0,3))
      })
      .catch((error) => console.log(error))
  }

  useEffect(()=>{
    crsl1()
  }, [])

  return (
    <div>
      <div className='navbar'>
        <div className='navbar1'>
          <h1><b className='logo'>Movielist</b></h1>
        </div>
        <div className='navbar2'>
          <form>
            <input
              className='inputsearch'
              type={"text"}
              value={search}
              onChange={(e)=> {e.preventDefault(); setSearch(e.target.value)}}
              placeholder={"What do you want to watch?"}
            >
            </input>
            <SearchOutlined onClick={(e)=> searchMovies(e)} className="navsearch"/>
          </form>        
        </div>
        {!localStorage.getItem("token")? (
          <>
            <div className='navbar3'>
              <Button type="primary" shape="round" danger ghost className='buttonlr' onClick={(e) => {e.preventDefault(); navigate('/login')}}>
                Login
              </Button>
              <Button type="primary" shape="round" danger className='buttonlr' onClick={(e) => {e.preventDefault(); navigate('/register')}}>
                Register
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className='navbar3'>
              <Button type="primary" shape="round" danger className='buttonlr' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
      </div>

      <Carousel autoplay>
        {
          crslMovie?.map((cr) => (
            <div>
              <div style={{
                height: '550px',
                color: '#fff',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${cr.backdrop_path})`,
                backgroundSize : "cover",
                backgroundPosition: "center",
                boxShadow: "0px 0px 0px 0px #00000040,inset 0 0 0 1000px rgba(0,0,0,.7)"
              }}>
                <h1 className='crslTitle'>{cr.original_title}</h1>
                <p className='crslOverview'>{cr.overview}</p>
                <Button type="primary" shape="round" danger className='buttonWatch' onClick={() => setOpen(true)}>
                  <PlayCircleOutlined />
                  WATCH TRAILER
                </Button>
                <Modal
                  title="Watch Trailer"
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={1000}
                >
                </Modal>
              </div>
            </div>
          ))
        }
      </Carousel>

      <h1 className='titlePopular'><b>Movies</b></h1>

      <div className='container'>
        {
          movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={getPosterURL(movie.poster_path)}
                alt={movie.original_title}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/detail/${movie.id}`)
                }}
                className="poster">
              </img>
            </div>
          ))
        }
      </div>
    </div>
  );
}