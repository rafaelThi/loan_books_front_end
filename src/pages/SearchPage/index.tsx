/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { FiChevronRight } from 'react-icons/fi';
import Logo from '../../components/Logo';
import {
  Title, H3, Container, DivHeader, Span, Books, DivMargin, Div, TitleProfile,
} from './styles';
import api from '../../server/api';

interface IBook {
  id: string;
  img: string;
  author: string;
  language: string;
  name: string;
  owner_id: string;
}

interface IUserDTO {
  token: string;
}

interface IUser{
  user:{
    fullName: string;
  }
}
const SearchPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch<IUserDTO>();

  const [booksName, setBooksName] = useState<IBook[]>([]);

  const [idUser, setIdUser] = useState('');

  const [titleBook, setTitleBook] = useState('');
  const [authorBook, setAuthorBook] = useState('');
  const [languageBook, setLanguageBook] = useState('');

  const [user, setUser] = useState<IUser>();

  const handleSearchTitle = useCallback(async () => {
    try {
      const name = titleBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o Título que busca.'),
      });
      await schema.validate({ name });

      const response = await api.get(`/requisition-book/list-one-book-name/${name}`);
      setBooksName(response.data.findBookName);
      console.log(response.data.findBookName);

      const user_id = await api.get(`/users-token/token/${params.token}`);
      console.log(user_id.data.matchToken.IdUser.id);
      // setBooksName(user_id.data.matchToken.IdUser.id);
      // console.log(booksName);
    } catch (err) {
      alert('Ops, parece que não achamos o livro que busca, você pode confirmar a escrita ou buscar pelo autor ou linguagem.');
    }
  }, [params.token, titleBook]);
  const handleSearchAuthor = useCallback(async () => {
    try {
      const name = authorBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o Autor que busca.'),
      });
      await schema.validate({ name });

      const response = await api.get(`/requisition-book/list-one-book-author/${name}`);
      setBooksName(response.data.findBookAuthor);
      console.log(response.data.findBookAuthor);

      const user_id = await api.get(`/users-token/token/${params.token}`);
      console.log(user_id.data.matchToken.id_user);
    } catch (err) {
      alert('Ops, parece que não achamos o autor que busca, você pode confirmar a escrita ou buscar pelo nome do livro ou linguagem.');
    }
  }, [authorBook, params.token]);

  const handleSearchLanguage = useCallback(async () => {
    try {
      const name = languageBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite a linguagem que busca.'),
      });
      await schema.validate({ name });

      const response = await api.get(`/requisition-book/list-one-book-language/${name}`);
      setBooksName(response.data.findBookLanguage);
      console.log(response.data.findBookLanguage);

      const user_id = await api.get(`/users-token/token/${params.token}`);
      console.log(user_id.data.matchToken.id_user);
    } catch (err) {
      alert('Ops, parece que não achamos livros da linguagem que busca, você pode confirmar a escrita ou buscar pelo nome do livro ou autor.');
    }
  }, [languageBook, params.token]);

  useEffect(() => {
    api.get(`/users-token/token/${params.token}`).then((response) => {
      setIdUser(response.data.matchToken.id_user);
      console.log(response.data.matchToken.id_user);
      api.get(`/users/list-user-id/${response.data.matchToken.id_user}`).then((response) => {
        setUser(response.data);
      });
    });
  }, []);

  return (
    <>
      <DivHeader>
        <Logo />
        <Div>
          <div>
            <a href={`/profile-user/${idUser}`}>
              <TitleProfile>
                Seja bem vindo
                {' '}
                <br />
                {' '}
                {user?.user.fullName}
              </TitleProfile>
            </a>
            <a
              onClick={async () => {
                const user = await api.get(`/users-token/token/${params.token}`);
                await api.delete(`/users-token/delete-token/${user.data.matchToken.id_user}`);
              }}
              href="/"
            >
              Sair

            </a>
          </div>
        </Div>
      </DivHeader>
      <Container>
        <Title>
          Ache aqui o livro que procura
        </Title>
        <H3>
          Basta digitar o título, nome do autor ou a linguagem do livro que deseja encontrar;
        </H3>
        <Span>Pesquisar por; </Span>
        <Form ref={formRef} onSubmit={handleSearchTitle}>
          <br />
          <span>Titulo: </span>
          <div>
            <input
              value={titleBook}
              onChange={(e) => setTitleBook(e.target.value)}
              name="titleBook"
              type="text"
              placeholder="Digite o nome do titulo..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>
        <Form onSubmit={handleSearchAuthor}>
          <span>Autor: </span>
          <div>
            <input
              value={authorBook}
              onChange={(e) => setAuthorBook(e.target.value)}
              name="authorBook"
              type="text"
              placeholder="Digite o nome do autor..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>
        <Form onSubmit={handleSearchLanguage}>
          <span>Linguagem: </span>
          <div>
            <input
              value={languageBook}
              onChange={(e) => setLanguageBook(e.target.value)}
              name="languageBook"
              type="text"
              placeholder="Digite a liguagem..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>

      </Container>
      <DivMargin>

        {booksName.map((bookName) => (
          <Books key={bookName.id}>
            <Link to={`/book/${bookName.id}`}>
              <img src={bookName.img} alt="img" />
              <div>
                <strong>{bookName.name}</strong>
                <p>
                  Autor:
                  {' '}
                  {bookName.author}
                </p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </Books>
        ))}

      </DivMargin>

    </>
  );
};

export default SearchPage;
