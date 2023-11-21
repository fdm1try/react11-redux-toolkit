import { FC, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface ISearchBar {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const SearchBar: FC<ISearchBar> = (props) => {
  const [search, setSearch] = useState<string>(props.value || '');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) : void {
    const { value } = e.target;
    if (props.onChange) props.onChange(value);
    setSearch(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(search);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='search__form-input'>
        <Form.Label>Поиск фильмов</Form.Label>
        <Form.Control onChange={handleChange} type='search' placeholder='например: Godfather' />
      </Form.Group>
      { props.onSubmit && <Button variant='primary' type='submit'>🔎︎</Button> }
    </Form>
  )
}
