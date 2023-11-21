import React from 'react'
import Pagination from 'react-bootstrap/Pagination';


export interface IPaginationBar {
  current: number;
  count: number;
  onClick?: (page: number) => void;
}

export const PaginationBar: React.FC<IPaginationBar> = (props) => {
  const { current, count } = props;
  const items = [];

  function handlePageClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!props.onClick) return;
    if (!(e.target instanceof HTMLAnchorElement)) return;
    const page = Number(e.target.dataset.page);
    if (!Number.isNaN(page)) props.onClick(page);
  }

  if (current - 5 > 1) items.push(
    <Pagination.Item key={1} onClick={handlePageClick} data-page={1}>
      {1}
    </Pagination.Item>
  )
  if (current - 6 > 1) items.push(<Pagination.Ellipsis key={2} disabled />);
  for (let i = current - 5; i < current; i++) {
    if (i < 1) continue;
    items.push(
      <Pagination.Item key={i} onClick={handlePageClick} data-page={i}>
        {i}
      </Pagination.Item>
    );
  }  
  items.push(<Pagination.Item key={current} active>{current}</Pagination.Item>);
  if (current < count) {
    for (let i = current + 1; i <= count && i <= current + 5; i++) {
      items.push(
        <Pagination.Item key={i} onClick={handlePageClick} data-page={i}>
          {i}
        </Pagination.Item>
      )
    }
    if (current + 5 < count) {
      items.push(<Pagination.Ellipsis disabled key={count-1} />);
      items.push(
        <Pagination.Item key={count} onClick={handlePageClick} data-page={count}>
          {count}
        </Pagination.Item>
      );
    }
  }

  return (
    <Pagination>{items}</Pagination>
  );
}
