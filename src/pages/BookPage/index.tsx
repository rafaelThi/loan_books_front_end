import { Form } from '@unform/web';
import React, { useCallback, useEffect, useState } from 'react';
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
  img: string;
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
  const [bookOwner, setBookOwner] = useState<IOwner>();

  useEffect(() => {
    api.get(`/requisition-book/list-book-id/${params.book}`).then((response) => {
      setBooksName(response.data.books);
      // console.log(response.data.books);
    });
    api.get(`/users-book-owners/list-owner/${booksName?.owner_id}`).then((responseOwner) => {
      setBookOwner(responseOwner.data.idOwner);
    });
  }, [setBooksName, params.book, booksName?.owner_id]);

  const handleRequestBook = useCallback(async () => {
    try {
      const id_book = booksName?.id;
      const id_admin = booksName?.owner_id;
      // const id_user = user.id;

      await api.post(`/requests/request-book/${id_book}`, {
        id_admin,
      });
    } catch (error) {
      alert(`erro: ${error}`);
    }
  }, [booksName?.id, booksName?.owner_id]);

  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <DivH>
        <img src={booksName?.img} alt="img" />
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
        <Form onSubmit={handleRequestBook}>
          <button type="submit">
            Solicitar
            {' '}
            <br />
            {' '}
            Empréstimo
          </button>
        </Form>
      </DivV>
    </>
  );
};
export default BookPage;
