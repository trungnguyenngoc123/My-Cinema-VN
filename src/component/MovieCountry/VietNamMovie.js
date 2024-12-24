import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCountry } from '../../service/MovieService';
import { setvietNamMovies, setVietNamMovies } from '../MovieStore';
import LoadingComponent from '../LoadingComponent';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
function VietNamMovie({ country }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const vietNamMovies = useSelector((state) => state.vietNamMovies);
    useEffect(() => {
        const loadVietNamMovies = async () => {
            setLoading(true);
            const movieData = await fetchMovieCountry(country);
            dispatch(setVietNamMovies(movieData));
            setLoading(false);
        }
        loadVietNamMovies();
    }, [dispatch, country]);
    // console.log(vietNamMovies);
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={6}
                navigation
                grabCursor={true}
                autoplay={{ delay: 4000 }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                        slidesPerGroup: 1
                    },
                    // when window width is >= 640px
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                        slidesPerGroup: 3
                    },
                    // when window width is >= 540px
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                        slidesPerGroup: 2
                    },
                    2560:{
                      slidesPerView: 8,
                      spaceBetween: 10,
                      slidesPerGroup: 3
                    }
                }}
            >
                {vietNamMovies.items.map((vietNamMovie) => (
                    <SwiperSlide>
                        <div className="card border-0 movie--width">
                            <div className='img-container overflow-hidden position-relative'>
                                <img src={vietNamMovie.thumb_url} className="card-img hover-thumb" alt={vietNamMovie.name} />
                                <div className="play-button">
                                    <Link to={`/watch/${vietNamMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                                </div>
                            </div>
                            <div className='movie--name position-absolute'>
                                <h6 className='text-center text-light'>{vietNamMovie.name}</h6>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default VietNamMovie