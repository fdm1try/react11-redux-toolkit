import { useState, useEffect, useRef } from 'react'
import { SearchBar } from '../components/SearchBar';
import { PaginationBar } from '../components/PaginationBar';
import { useSearchQuery as useOMDBSearch, TOMDBSearchParams } from '../store/imdbApi';
import { Loader } from '../components/Loader';
import { TMovie, MovieCard } from '../components/MovieCard';

const MOVIES_PER_PAGE: number = 10;

export const Search = () => {
  const [movies, setMovies] = useState<Array<TMovie>>([]);
  const [page, setPage ] = useState<number>(1);
  const [pageCount, setPageCount ] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<TOMDBSearchParams>({title: '', page});
  const [error, setError] = useState<string>();
  const { data, isLoading, isFetching } = useOMDBSearch(searchParams, { skip: ((searchParams?.title?.length || 0) < 3)});
  const inputTimeout = useRef<any>();

  function handleSearchChange(value: string) {
    if (inputTimeout.current) clearTimeout(inputTimeout.current);
    inputTimeout.current = undefined;
    setSearchParams((params) => ({ ...params, title: value}));
    if (value.length < 3) {      
      setMovies([]);
      return;
    }
    inputTimeout.current = setTimeout(() => setSearchParams({ title: value, page }), 400);
  }

  useEffect(() => {
    if (data?.Error) {
      setError(`Не удалось найти фильмы с указанным названием (${data.Error})...`);
      return;
    } else {
      setError(undefined);
    }

    if (data?.Search) {
      setMovies(data.Search.map((item) => ({
        id: item.imdbID,
        title: item.Title,
        year: Number(item.Year),
        poster: item.Poster
      })));
    }
    setPageCount(Math.ceil((Number(data?.totalResults) | 1) / MOVIES_PER_PAGE));
  }, [data]);

  useEffect(() => {
    setSearchParams((params) => ({ ...params, page}));
  }, [page])

  const getContent = () => {
    if (error) return <div className='error'>{error}</div>
    if (isLoading || isFetching) return <Loader />;
    return (
      <div className='movies'>
        {movies.map( movie => (
          <MovieCard view='compact' movie={movie}/>
        ))}
      </div>
    )
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  }

  return (
    <div className='search'>
      <SearchBar onChange={handleSearchChange}/>
      <div className='search__results'>
        <div className='pagination__container'>
          { pageCount > 1 && <PaginationBar onClick={handlePageChange} current={page} count={pageCount} /> }
        </div>
        {getContent()}
      </div>
    </div>
  )
}
