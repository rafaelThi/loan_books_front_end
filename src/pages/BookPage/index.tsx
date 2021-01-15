import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivH, DivHeader, DivV } from './styles';

interface IBookDTO {
book : string;
}
interface IBook {
  id: string;
  amount: number;
  author: string;
  language: string;
  name: string;
  owner_id: string;
  }

  interface IOwner{
    id: string;
    fullNameAdmin: string;
    emailAdmin: string
  }

const BookPage: React.FC = () => {
  const { params } = useRouteMatch<IBookDTO>();
  const [booksName, setBooksName] = useState<IBook | null>(null);
  const [bookOwner, setBookOwner] = useState<IOwner | null>(null);

  useEffect(() => {
    api.get(`/requisition-book/list-book-id/${params.book}`).then((response) => {
      setBooksName(response.data.books);
      // console.log(response.data.books);
    });
    api.get(`/users-book-owners/list-owner/${booksName?.owner_id}`).then((responseOwner) => {
      setBookOwner(responseOwner.data.idOwner);
    });
  }, [setBooksName, params.book, booksName?.owner_id]);

  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <DivH>
        <img src="https://images-submarino.b2w.io/produtos/01/00/item/7288/8/7288845SZ.jpg" alt="img" />
        <div>

          <strong>{booksName?.name}</strong>
          <p>
            Autor:
            {' '}
            {booksName?.author}
          </p>
        </div>
      </DivH>
      <DivV>
        <strong>
          Caso tenha interesse em pegar emprestado esse livro, solicite ao seu dono:
        </strong>
        <p>
          Dono do livro:
          {' '}
          {bookOwner?.fullNameAdmin}
        </p>
        {/* Rever esse trecho */}
        <button type="button">
          Solicitar
          {' '}
          <br />
          {' '}
          Empréstimo
        </button>
      </DivV>
    </>
  );
};
export default BookPage;
