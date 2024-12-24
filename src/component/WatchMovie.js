import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../service/MovieService';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieDetails } from './MovieStore';
import '../assest/WatchMovie.css';
import LoadingComponent from './LoadingComponent';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
function WatchMovie() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const movieDetails = useSelector((state) => state.movieDetails);
    useEffect(() => {
        const loadMovieDetails = async () => {
            setLoading(true);
            const moviesDetailData = await fetchMovieDetails(slug);
            dispatch(setMovieDetails(moviesDetailData));
            setLoading(false);
        };
        loadMovieDetails();
    }, [dispatch, slug]);
    if (loading) {
        return <div><LoadingComponent></LoadingComponent></div>
    }
    const formattedDate = new Date(movieDetails.created).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const convertTime = (time) => {
        const minutes = parseInt(time);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    console.log(movieDetails);
    return (
        <div className='bg-dark' >
            {/* background image */}
            <div
                className='background-container w-100'
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%), url(${movieDetails.poster_url})` }}
            >
            </div>
            <div className='container-fluid'>
                {/* meta tag không đụng */}
                <Helmet>
                    <title>Xem phim {movieDetails.name}</title>
                    <meta name="description" content={movieDetails.name} />
                </Helmet>
                <div style={{ marginTop: '-30vh' }}>
                    <div className='row g-2'>
                        <div className='col-md-4'>
                            <div className='card p-4 bg-dark text-light'>
                                <img src={movieDetails.thumb_url} className='w-50 card-img mx-auto' alt='Movie Thumbnail' />
                                <h5 className='mt-3'>{movieDetails.name}</h5>
                                <small className='text-warning'>{movieDetails.original_name}</small>
                                <div className='d-flex flex-wrap mt-3'>
                                    {movieDetails.category?.[3]?.list?.[0]?.name ? (
                                        <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                            {movieDetails.category[3].list[0].name}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {movieDetails.category?.[1]?.list?.[0]?.name ? (
                                        <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                            {movieDetails.category[1].list[0].name}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                        {movieDetails.current_episode ? movieDetails.current_episode : 'Đang cập nhật'}
                                    </div>
                                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                        {convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap mt-2'>
                                    {movieDetails.category[2].list.map((item) => (
                                        <div className='category--movie mx-1 mb-2 p-1 px-2 rounded' key={item.id}>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-3'>
                                    <strong>Giới thiệu: </strong> <br />
                                    <small style={{ color: '#ddd' }}>{movieDetails.description}</small> <br />
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Quốc gia: </strong>{movieDetails.category[4].list[0].name}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Đạo diễn: </strong>{movieDetails.director ? movieDetails.director : 'Đang cập nhật'}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Diễn viên: </strong>{movieDetails.casts ? movieDetails.casts : 'Đang cập nhật'}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Thời lượng: </strong>{convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='card p-4 bg-dark'>
                                <div className='d-flex'>
                                    <Link to={`/watch/cinema/${slug}`} className='link-glow'>
                                        <button className='glow-on-hover position-relative' disabled={movieDetails.episodes.length === 0}>
                                            Xem phim
                                            <FontAwesomeIcon icon={faPlay} className='position-absolute' style={{ right: '18%', top: '18px' }} />
                                        </button>
                                    </Link>
                                    <div className='sharing d-flex align-items-center justify-content-center'>
                                        <h6 className='sharing--text'>Chia sẻ: </h6> &emsp;
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
                                        <div className='facebook-share-container mx-2'>
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
                                <div className="text-light mt-3">
                                    <ul className="nav nav-tabs nav--tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link active" id="description-tab" data-bs-toggle="tab"
                                                data-bs-target="#description" type="button" role="tab">Tập phim</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details"
                                                type="button" role="tab">Mô tả phim</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews"
                                                type="button" role="tab">Bình luận</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content mt-3" id="myTabContent">
                                        <div className="tab-pane fade show active" id="description" role="tabpanel">
                                            <div className='mt-5'>
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
                                                                        <Link to={`/watch/cinema/${slug}?type=${episode.server_name}`} className='text-decoration-none '>
                                                                            <button type='button' className='btn btn-light p-1 px-2' style={{ fontSize: '14px', fontWeight: '500' }}>Xem bản này</button>
                                                                        </Link>
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
                                                <div className='mt-5'>
                                                    <h4 className='mb-3'>Các tập phim: </h4>
                                                    <div className=''>
                                                        {movieDetails.episodes.map((episode, index) => (
                                                            <div key={episode.id}>
                                                                {index > 0 && <hr />} {/* Add <hr> before each episode group starting from the second one */}
                                                                <h6>{episode.server_name}</h6>
                                                                <div className='row g-2 mt-2 mb-2'>
                                                                    {episode.items.map((item) => (
                                                                        <div key={item.id} className='col-4 col-md-2 mb-1'>
                                                                            <Link to={`/watch/cinema/${slug}?tap=${item.name}&type=${episode.server_name}`} className='text-decoration-none text-light'>
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
                                                </div>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <div className="tab-pane fade" id="details" role="tabpanel">
                                            <p>{movieDetails.description}</p>
                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel">
                                            <p>Hiện tại chưa có bình luận nào</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: '275px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default WatchMovie
