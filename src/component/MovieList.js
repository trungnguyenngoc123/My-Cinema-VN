import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewMovies } from "../service/MovieService";
import { setNewMovies } from "./MovieStore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import '../assest/MovieList.css';
import { Helmet } from "react-helmet";
import LoadingComponent from "./LoadingComponent";
import { fetchMovieDetails } from '../service/MovieService';
import { setMovieDetails } from './MovieStore';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ChinaMovie from "./MovieCountry/ChinaMovie";
import KoreanMovie from "./MovieCountry/KoreanMovie";
import EuropeMovie from "./MovieCountry/EuropeMovie";
import AdventureMovie from "./MovieCategory/AdventureMovie";
import HorrifiedMovie from "./MovieCategory/HorrifiedMovie";
import ActionMovie from "./MovieCategory/ActionMovie";
import ComedyMovie from "./MovieCategory/ComedyMovie";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import VietNamMovie from "./MovieCountry/VietNamMovie";

function MovieList() {
  const newMovies = useSelector((state) => state.newMovies);
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const movieDetails = useSelector((state) => state.movieDetails);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const moviesData = await fetchNewMovies();
      dispatch(setNewMovies(moviesData));
      setLoading(false);
    };
    loadMovies();
  }, [dispatch]);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (slug) {
        const moviesDetailData = await fetchMovieDetails(slug);
        dispatch(setMovieDetails(moviesDetailData));
      }
    };
    loadMovieDetails();
  }, [dispatch, slug]);

  useEffect(() => {
    if (newMovies.items && newMovies.items.length > 0) {
      setSlug(newMovies.items[0].slug); // Set initial slug to the first movie's slug
    }
  }, [newMovies]);

  const handleSlideChange = (swiper) => {
    const currentSlideIndex = swiper.activeIndex;
    const currentMovie = newMovies.items[currentSlideIndex];
    if (currentMovie) {
      setSlug(currentMovie.slug);
    }
  };

  const convertTime = (time) => {
    const minutes = parseInt(time);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (!newMovies.items) {
    return <LoadingComponent />
  }

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <div className="container-fluid bg-dark text-light pb-3">
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ" />
      </Helmet>

      {/* swiper thử nghiệm */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        onSlideChange={handleSlideChange}
        grabCursor={true}
      >
        {newMovies.items.map((newMovie) => (
          <SwiperSlide key={newMovie.slug}>
            <div className='img-container position-relative swiper--img mobile--header'>
              <img src={newMovie.poster_url} className="w-100 object-fit-cover" alt={newMovie.name} />
              <div className="position-absolute mobile--view" style={{ top: '40%', left: '20px' }}>
                <div className="text-warp">
                  <p className="text-primary bg-dark opacity-75 h1 rounded p-2" style={{ width: 'fit-content' }}>{movieDetails.name}</p>
                </div>
                <div className='d-flex mt-3'>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.category?.[3].list[0].name}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.category?.[1].list[0].name}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.current_episode}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}
                  </div>
                </div>
                <div className='d-flex mt-2'>
                  {movieDetails.category?.[2].list.map((item) => (
                    <div className='category--movie mx-1 p-1 px-2 rounded' key={item.id}>
                      {item.name}
                    </div>
                  ))}
                </div>
                <div className="mt-2 des-movie">
                  <p className='text-light bg-dark opacity-75 rounded p-1'>{movieDetails.description}</p>
                </div>
              </div>
              <div className="play-button">
                <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card p-3 list--movie mt-3">
        {/* done */}
        <div className="d-flex align-items-center mb-3">
          <h4 className="cate--movie--text">Phim mới cập nhật:</h4>
          <Link to="/danh-sach/phim-moi-cap-nhat" className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>

        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={6}
            navigation
            grabCursor={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 5,
                slidesPerGroup: 1
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
                slidesPerGroup: 3
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 2
              }
            }}
          >
            {newMovies.items.map((newMovie) => (
              <SwiperSlide key={newMovie.id}>
                <div className="card border-0 movie--width">
                  <div className='img-container overflow-hidden position-relative w-100'>
                    <img src={newMovie.thumb_url} className="card-img w-100 hover-thumb" alt={newMovie.name} />
                    <div className="play-button">
                      <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                    </div>
                  </div>
                  <div className='movie--name position-absolute'>
                    <h6 className='text-center text-light'>{newMovie.name}</h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* phim trung quốc */}
        {/* done */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Trung Quốc:</h4>
          <Link to={'/danh-sach/quoc-gia/trung-quoc'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <ChinaMovie country="trung-quoc" />
        {/* phim hàn quốc */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Hàn Quốc:</h4>
          <Link to={'/danh-sach/quoc-gia/han-quoc'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <KoreanMovie country="han-quoc" />
        {/* Phim âu mỹ */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Âu Mỹ:</h4>
          <Link to={'/danh-sach/quoc-gia/au-my'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <EuropeMovie country="au-my" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">Phim Việt Nam:</h4>
          <Link to={'/danh-sach/quoc-gia/viet-nam'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <VietNamMovie country="viet-nam" />
        {/* Phim phiêu lưu */}
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x2694;Đắm mình vào thế giới phiêu lưu kì ảo:&#x1FA84;</h4>
          <Link to={'/danh-sach/phieu-luu'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <AdventureMovie cate="phieu-luu" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F383;Rùng mình với màn đêm cất giấu những bí ẩn kinh hoàng!&#x1F47B;&#x1F578;</h4>
          <Link to={'/danh-sach/kinh-di'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <HorrifiedMovie cate="kinh-di" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F4A5;Hành động đỉnh cao, bùng nổ mọi cảm xúc!&#x2694;&#x1F525;:</h4>
          <Link to={'/danh-sach/hanh-dong'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <ActionMovie cate="hanh-dong" />
        <div className="d-flex align-items-center mb-3 mt-3">
          <h4 className="cate--movie--text">&#x1F602;Cuối tuần, cười sảng khoái, quên hết muộn phiền!&#x1F923;:</h4>
          <Link to={'/danh-sach/phim-hai'} className="text-decoration-none">
            <div className="icon-container mx-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                fontSize={20}
                color="white"
                className="icon"
              />
              <span className="tooltip-text">Xem thêm</span>
            </div>
          </Link>
        </div>
        <ComedyMovie cate="phim-hai" />
      </div>
    </div>
  );
}

export default MovieList;
