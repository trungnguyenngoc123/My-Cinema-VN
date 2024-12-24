import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieDetails } from './MovieStore';
import { fetchMovieDetails } from '../service/MovieService';
import { Helmet } from 'react-helmet';
import '../assest/Cinema.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faMicrophone, faPaperPlane, faPlay } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from './LoadingComponent';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

function Cinema() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movieDetails);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      const moviesDetailData = await fetchMovieDetails(slug);
      dispatch(setMovieDetails(moviesDetailData));
      setLoading(false);
    };
    loadMovieDetails();
  }, [dispatch, slug]);

  const searchParams = new URLSearchParams(location.search);
  const tapFromURL = searchParams.get('tap');

  const searchParamsType = new URLSearchParams(location.search);
  let typeFromURL = searchParamsType.get('type');
  // const firstEmbed = 
  let movieInfo = '';
  if (!tapFromURL) {
    const typeMovie = movieDetails.episodes?.find(typeMovie => typeMovie.server_name.includes(typeFromURL));
    if (typeMovie) {
      movieInfo = typeMovie.items?.[0];
    }
  } else {
    const typeMovie = movieDetails.episodes?.find(typeMovie1 => typeMovie1.server_name.includes(typeFromURL));
    if (typeMovie) {
      movieInfo = typeMovie.items?.find(item => item.name === tapFromURL);
    }
  }
  if(!tapFromURL && !typeFromURL){
    movieInfo = movieDetails.episodes?.[0].items?.[0];
    typeFromURL = movieDetails.episodes?.[0].server_name;
  }
  const convertTime = (time) => {
    const minutes = parseInt(time);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return <LoadingComponent />;
  }
  const handleCommentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setComment(value);
      setCharCount(value.length);
    }
  };
  const handleEpisodeSelect = ()=>{
    window.scrollTo(0,0);
  }
  return (
    <div className='bg-dark'>
      <div className='container' style={{ paddingTop: '80px' }}>
        <Helmet>
          <title>{movieDetails.name}</title>
          <meta name="description" content={movieDetails.name} />
        </Helmet>
        <div className='back-btn d-flex align-items-center mb-3'>
          <Link to={`/watch/${movieDetails.slug}`}>
            <button>
              <FontAwesomeIcon icon={faChevronCircleLeft} style={{ fontSize: '30px' }} />
              &nbsp;
            </button>
          </Link>
          <div className='text-light h5'>Xem phim {movieDetails.name}</div>
        </div>
        {/* chiếu phim */}
        <div>
          <div>
            <iframe src={movieInfo.embed} className='video' title="First Episode tm" allowFullScreen></iframe>
          </div>
        </div>
        <div className='mt-5 border-bottom' style={{ paddingBottom: '10px' }}>
          <div className='row'>
            <div className='col-md-2'>
              <img src={movieDetails.thumb_url} className='w-100 rounded intro-img' alt={movieDetails.name}></img>
            </div>
            <div className='col-md-10'>
              <div className='row'>
                <div className='col-md-5 border-end'>
                  <h5 className='text-light'>{movieDetails.name}</h5>
                  <small className='text-warning'>{movieDetails.original_name}</small>

                  <div className='d-flex flex-wrap mt-3 text-light'>
                    {movieDetails.category?.[1]?.list?.[0]?.name && (
                      <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                        {movieDetails.category[1].list[0].name}
                      </div>
                    )}
                    {movieDetails.category?.[3]?.list?.[0]?.name && (
                      <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                        {movieDetails.category[3].list[0].name}
                      </div>
                    )}
                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                      Tập { movieDetails.category?.[1]?.list?.[0]?.name.includes('Phim bộ')
                          ? (tapFromURL ? tapFromURL : '1')
                          : (tapFromURL ? tapFromURL : 'Full')}
                    </div>
                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                      {convertTime(movieDetails.time) ==='' ? convertTime(movieDetails.time) : 'Đang cập nhật'}
                    </div>
                  </div>
                  <div className='d-flex flex-wrap mt-2 text-light'>
                    {movieDetails.category?.[2]?.list?.map((item) => (
                      <div className='mx-1 p-1 px-2 mb-2 rounded' style={{ backgroundColor: '#343232' }} key={item.id}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col-md-7 text-light'>
                  <p className='fw-bold'>Giới thiệu: </p>
                  <p>{movieDetails.description}</p>
                  <Link to={`/watch/${movieDetails.slug}`} className='text-decoration-none text-warning mt-2'>Thông tin phim {'>'}</Link>

                  {/* share */}
                  <div className='d-flex'>
                    <div className='sharing mt-3 d-flex' style={{ marginLeft: 'auto' }}>
                      <h6 className='sharing--text'>Chia sẻ phim: </h6> &emsp;
                      <div className='facebook-share-container'>
                        <button
                          className='btn'
                          onClick={() => {
                            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://mycinemavn.vercel.app/watch/${slug}`;
                            const popupWidth = 600;
                            const popupHeight = 400;

                            // Lấy vị trí giữa màn hình
                            const left = window.screen.width / 2 - popupWidth / 2;
                            const top = window.screen.height / 2 - popupHeight / 2;

                            // Mở popup
                            window.open(
                              shareUrl,
                              'FacebookSharePopup',
                              `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=0,status=0,resizable=1`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faFacebook} color='blue' style={{ fontSize: '25px' }}></FontAwesomeIcon>
                        </button>
                      </div>
                      <div className='facebook-share-container mx-3'>
                        <button
                          className='btn'
                          onClick={() => {
                            const shareUrl = `https://twitter.com/intent/tweet?url=https://mycinemavn.vercel.app/watch/${slug}`;
                            const popupWidth = 600;
                            const popupHeight = 400;

                            // Lấy vị trí giữa màn hình
                            const left = window.screen.width / 2 - popupWidth / 2;
                            const top = window.screen.height / 2 - popupHeight / 2;

                            // Mở popup
                            window.open(
                              shareUrl,
                              'FacebookSharePopup',
                              `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=0,status=0,resizable=1`
                            );
                          }}
                        >
                          <img src='/images/twitter.png' width={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* test ngon*/}
        <div className='mt-5 text-light'>
          <h4>Các bản chiếu</h4>
          <div className='row'>
            {movieDetails.episodes.map((episode) => (
              <div className='col-md-6 col-sm-4' key={episode.id}>
                <div className='card mt-3 language-hover w-100'>
                  <div className='row g-0'>
                    <div className='col-8 p-3 bg-secondary rounded-start text-light'>
                      {episode.server_name.includes('Vietsub') ? (
                        <FontAwesomeIcon icon={faClosedCaptioning} fontSize={25} style={{ color: '#036bfc' }} />
                      ) : (
                        <FontAwesomeIcon icon={faMicrophone} fontSize={25} style={{ color: '#fc7f03' }} />
                      )} &nbsp;
                      {episode.server_name}
                      <p className='mt-1 fw-medium'>{movieDetails.name}</p>
                      {/* test ngon */}
                      {episode.server_name.includes(typeFromURL) ? (
                        <button type='button' className='btn btn-warning p-1 px-2' disabled style={{ fontSize: '14px', fontWeight: '500', boxShadow: '0 0 15px blue' }}>Đang xem</button>
                      ) : (
                        <Link to={`/watch/cinema/${slug}?type=${episode.server_name}`} className='text-decoration-none ' onClick={handleEpisodeSelect}>
                          <button type='button' className='btn btn-light p-1 px-2' style={{ fontSize: '14px', fontWeight: '500' }}>Xem bản này</button>
                        </Link>
                      )}
                    </div>
                    <div className='col-4'>
                      <img src={movieDetails.thumb_url} className='w-100 rounded-end language-img'></img>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {movieDetails.category[1].list[0].name ? (
          <div className='mt-5 text-light'>
            <h4 className='mb-3'>Các tập phim: </h4>
            {movieDetails.episodes
              .filter(episode => episode.server_name.includes(typeFromURL))
              .map((episode) => (
                <div key={episode.id}>
                  <h6>{episode.server_name}</h6>
                  <div className='row g-2 mt-2 mb-2'>
                    {episode.items.map((item) => (
                      <div key={item.id} className='col-4 col-md-2 mb-1'>
                        <Link to={`/watch/cinema/${slug}?tap=${item.name}&type=${episode.server_name}`} className='text-decoration-none text-light' onClick={handleEpisodeSelect}>
                          <div className='category--movie p-2 px-2 rounded text-center'>
                            Tập {item.name} &nbsp; <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div></div>
        )}
        <div className='mt-5 pb-3 text-light'>
          <div className='d-flex align-items-center'>
            <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: '40px' }} color='white' />
            <h4>&nbsp; Bình luận</h4>
          </div>
          <div className='p-2 mt-3 bg-secondary rounded-2 position-relative' >
            {/* <textarea placeholder='Viết bình luận' className='form-control text-light comment-box' rows="6"></textarea> */}
            <textarea
              placeholder='Viết bình luận'
              className='form-control text-light comment-box'
              rows="5"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <div className='text-light position-absolute' style={{ right: '13px', top: '13px' }}>
              {charCount}/1000
            </div>
            <div className='mt-4 mb-4'></div>
            <div className='position-absolute' style={{ bottom: '5px', right: '5px' }}>
              <button className='send-btn text-warning'>Gửi &nbsp;<FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cinema;
