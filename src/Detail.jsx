import './App.css';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { StarOutlined } from '@ant-design/icons';

export default function Detail({ setToken }) {
  const [selectedMovie, setSelectedMovie] = useState([])
  const params = useParams()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    window.location.reload();
    localStorage.removeItem("token");
    setToken(null);
  };

  const detailPage = useCallback(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=ca6104606a50d22fef2f8977abfb20a8`)
      .then((response) => {
        setSelectedMovie(response.data)
      })
      .catch((error) => console.log(error))
  }, [params.id])

  useEffect(()=>{
    detailPage()
  }, [detailPage])

  const getPoster = (posterpath) => {
    return `https://www.themoviedb.org/t/p/original${posterpath}`
  }

  return (
    <div>
      <div className='navbar'>
        <div className='navbar1'>
          <h1><b className='logo'>Movielist</b></h1>
        </div>
      </div>

      <div className='navbar3'>
        <Button type="primary" shape="round" danger className='buttonlr' onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <img
        src={getPoster(selectedMovie.poster_path)}
        alt={selectedMovie.original_title}
        className='bg'>
      </img>
      
      <div className='content'>
        <h1 className='detailTitle'>{selectedMovie.original_title}</h1>
        <div className='detailGenre1'>
          {
            selectedMovie.genres?.map((gn) => (
              <p key={gn.id} className='detailGenre'>
                {gn.name},
              </p>
            ))
          }
        </div>
        <p className='detailOverview'>{selectedMovie.overview}</p>
        <p><StarOutlined className='star'/>{selectedMovie.vote_average} / 10</p>
        <Button type="primary" shape="round" danger onClick={() => setOpen(true)} className='buttonWatchDetail'>
          <PlayCircleOutlined/>
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
  );
}
