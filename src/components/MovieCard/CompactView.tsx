import Card from 'react-bootstrap/Card';
import { IProps } from './View';
import defaultPosterImage from '../../assets/poster_not_found.png';

export const CompactView: React.FC<IProps> = (props) => {
  const { movie } = props;

  return (
    <Card className='movie movie-compact'>
      <Card.Img variant='top' className='movie__poster' src={movie.poster === 'N/A' ? defaultPosterImage : movie.poster} />
      <Card.Body>
        <Card.Title className='movie__title'>
          {movie.title}
          &nbsp;
          {Number.isNaN(movie.year) ? <></> : <span className='movie__year'>{movie.year}</span>}              
        </Card.Title>
      </Card.Body>
      <Card.Footer className='movie__footer'>
        
        { props.children }
      </Card.Footer>
    </Card>
  )
}