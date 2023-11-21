import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
  return (
    <div className='loader'>
      <Spinner className='' animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
