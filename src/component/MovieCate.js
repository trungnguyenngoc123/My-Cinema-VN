
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchMovieCate } from '../service/MovieService';
import { setCategoryMovies } from './MovieStore';
import '../assest/MovieCate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import LoadingComponent from './LoadingComponent';
import Pagination from './Pagination'; // Import the Pagination component
import { Helmet } from 'react-helmet';

function MovieCate() {

    const { cate } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = query.get('page') || 1;
        setCurrentPage(Number(page));
    }, [location.search]);

    useEffect(() => {
        const loadMovieCate = async () => {
            setLoading(true);
            const moviesCateData = await fetchMovieCate(cate, currentPage);
            dispatch(setCategoryMovies(moviesCateData));
            setLoading(false);
        };
        loadMovieCate();
    }, [dispatch, cate, currentPage]);

    const categoryMovies = useSelector((state) => state.categoryMovies);

    if (loading) {
        return <LoadingComponent />; // Render LoadingComponent when loading
    }
    if (!categoryMovies.cat) {
        return <LoadingComponent />;
    }
    return (
        <div className='container-fluid bg-dark text-light' style={{paddingTop:'80px'}}>
            <Helmet>
                <title>{categoryMovies.cat.name.includes('Phim')?categoryMovies.cat.name:'Phim '+categoryMovies.cat.name}</title>
                <meta name="description" content={categoryMovies.cat.name.includes('Phim')?categoryMovies.cat.name:'Phim '+categoryMovies.cat.name} />
            </Helmet>
            <h4>Danh sách {categoryMovies.cat.name.includes('Phim')?categoryMovies.cat.name:'Phim '+categoryMovies.cat.name}</h4>
            <div className='row'>
                {categoryMovies.items.map((movie) => (
                    <div className='col-6 col-md-2 col-sm-4 mb-3'>
                        <div className='card position-relative tooltip-wrapper border-0 w-100'>
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
            <Pagination
                totalPages={categoryMovies.paginate.total_page}
                currentPage={currentPage}
                baseUrl={`/danh-sach/${categoryMovies.cat.slug}`}
            />
        </div>
    );
}

export default MovieCate;
