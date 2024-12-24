
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchSearchMovie } from '../service/MovieService';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchMovies } from './MovieStore';
import '../assest/MovieCate.css';
import LoadingComponent from './LoadingComponent';
import PaginationSearch from './PaginationSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Helmet } from 'react-helmet';

function SearchMovie() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keywordFromURL = searchParams.get('keyword');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    // Pagination
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = query.get('page') || 1;
        setCurrentPage(Number(page));
    }, [location.search]);
    const sensitiveWords = ['sex', 'porn', 'adult', 'xxx', '18+', 'nude', 'jav', 'lồn', 'cặc', 'gay', 'erotic', 'tình dục', 'khiêu dâm'];
    useEffect(() => {
        const loadMovieSearch = async () => {
            setLoading(true);

            // Validate keyword for special characters
            const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]|--|__|\+\+|==/g;
            const containsSensitiveWord = sensitiveWords.some(word => keywordFromURL.toLowerCase().includes(word));
            if (specialCharPattern.test(keywordFromURL) || containsSensitiveWord) {
                dispatch(setSearchMovies({ items: [], paginate: { total_page: 1 } }));
                setLoading(false);
                return;
            }

            const searchMovieData = await fetchSearchMovie(keywordFromURL, currentPage);
            dispatch(setSearchMovies(searchMovieData));
            setLoading(false);
        };
        loadMovieSearch();
    }, [dispatch, keywordFromURL, currentPage]);

    const searchMovies = useSelector((state) => state.searchMovies);
    console.log(searchMovies.items);

    if (loading) {
        return <div><LoadingComponent /></div>;
    }
    if (!searchMovies.items) {
        return <div><LoadingComponent /></div>;
    }

    return (
        <div className='bg-dark text-light'>
            <div className='container-fluid' style={{ paddingTop: '80px' }}>
                <Helmet>
                    <title>Tìm kiếm phim | Từ khóa: {keywordFromURL}</title>
                    <meta name="description" content="Tìm kiếm phim" />
                </Helmet>
                <h4 className='mb-3'>Kết quả tìm kiếm cho: {keywordFromURL}</h4>
                <hr></hr>
                {searchMovies.items.length === 0 ? (
                    <div className='pb-3'>
                        <div className='d-flex m-0'>
                            <img src='/images/searchNoBG.png' className='w-75' style={{ margin: '0 auto' }}></img>
                        </div>
                        <h4 className='text-center fw-bold mt-3 mb-5'>Không tìm thấy kết quả nào</h4>
                    </div>
                ) : (
                    <div>
                        <div className='row'>
                            {searchMovies.items.map((movie) => (
                                <div className='col-6 col-md-2 col-sm-4 mb-3'>
                                    <div className='card position-relative tooltip-wrapper border-0 w-100' >
                                        <div className='img-container position-relative overflow-hidden'>
                                            <img
                                                src={movie.thumb_url}
                                                alt={movie.name}
                                                className='hover-thumb w-100'
                                                height={350}
                                            />
                                            <div className="play-button">
                                                <Link to={`/watch/${movie.slug}`}>
                                                    <FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='movie--name position-absolute'>
                                            <Link to={`/watch/${movie.slug}`} className='text-decoration-none'>
                                                <h6 className='text-center text-light'>{movie.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="tooltip-content">{movie.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <PaginationSearch
                            totalPages={searchMovies.paginate.total_page}
                            currentPage={currentPage}
                            baseUrl={`/tim-kiem?keyword=${keywordFromURL}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchMovie;
