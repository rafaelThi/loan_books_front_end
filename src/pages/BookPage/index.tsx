import { Form } from '@unform/web';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
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

  const [stateEmail, setStateEmail] = useState('');

  useEffect(() => {
    api.get(`/requisition-book/list-book-id/${params.book}`).then((response) => {
      setBooksName(response.data.books);
      // console.log(response.data.books.name);
    });
    api.get(`/users-book-owners/list-owner/${booksName?.owner_id}`).then((responseOwner) => {
      setBookOwner(responseOwner.data.idOwner);
    });
  }, [setBooksName, params.book, booksName?.owner_id]);

  const handleRequestBook = useCallback(async () => {
    try {
      const email = stateEmail;
      alert('Estamos enviado a solicitação, isso pode levar alguns segundos, por favor aguarde o próximo aviso!');
      const schema = Yup.object().shape({
        email: Yup.string()
          . required('Digite um e-mail válido.')
          .email(
            `Digite um e-mail válido
          "ex@ex.com".`,
          ),
      });
      await schema.validate({ email });

      const user = await api.get(`/users/list-user-email/${email}`);
      if (!user) {
        alert('Email Incorreto');
      }
      console.log(user.data.user.id, 'user');
      const id_user = user.data.user.id;
      const id_book = booksName?.id;
      const id_admin = booksName?.owner_id;

      const request = await api.post(`/requests/request-book/${id_book}`, {
        id_admin,
        id_user,
      });
      console.log(request, 'request');

      if (request) {
        const sendMail = await api.post('/mail-provider/send-mail-request-book', {
          email: bookOwner?.emailAdmin,
          name_user: user.data.user.fullName,
          name_book: booksName?.name,
          id: request.data.requestBook.id,
        });
        console.log(sendMail, 'sendMail');

        if (sendMail) {
          alert(`Requisição feita com sucesso!!
Um email foi mandado ao dono do livro`);
        }
      }
    } catch (error) {
      alert(`Email incorreto :(
      erro:${error}`);
    }
  }, [booksName?.id, booksName?.name, booksName?.owner_id, stateEmail]);

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
          <p>Para solicitar o livro, digite seu email de login:</p>
          <div>
            <input
              value={stateEmail}
              onChange={(e) => setStateEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Digite o email de login..."
            />
            <button type="submit">
              Solicitar
              {' '}
              <br />
              {' '}
              Empréstimo
            </button>
          </div>
        </Form>
      </DivV>
    </>
  );
};
export default BookPage;
