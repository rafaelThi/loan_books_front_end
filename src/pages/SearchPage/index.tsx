import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FiChevronRight } from 'react-icons/fi';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import {
  Title, H3, Container, DivHeader, Span, Books, DivMargin,
} from './styles';
import api from '../../server/api';

const SearchPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [titleBook, setTitleBook] = useState('');
  const [authorBook, setAuthorBook] = useState('');
  const [languageBook, setLanguageBook] = useState('');

  const handleSearchTitle = useCallback(async () => {
    try {
      const name = titleBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o Título que busca.'),
      });
      await schema.validate({ name });

      await api.get(`/requisition-book/list-one-book-name/${name}`).then((response) => {
        console.log(response.data);
      });
    } catch (err) {
      alert(`Ops, parece que esqueceu de digitar algo!.
${err}`);
    }
  }, [titleBook]);

  const handleSearchAuthor = useCallback(async () => {
    try {
      const name = authorBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o Autor que busca.'),
      });
      await schema.validate({ name });
    } catch (err) {
      alert(`Ops, parece que esqueceu de digitar algo!.
${err}`);
    }
  }, [authorBook]);

  const handleSearchLanguage = useCallback(async () => {
    try {
      const name = languageBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite a linguagem que busca.'),
      });
      await schema.validate({ name });
    } catch (err) {
      alert(`Ops, parece que esqueceu de digitar algo!.
${err}`);
    }
  }, [languageBook]);

  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
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

        <Books>
          <Link to="/book">
            <img src="https://images-submarino.b2w.io/produtos/01/00/item/7288/8/7288845SZ.jpg" alt="img" />
            <div>
              <strong>!CSS Cookbook - Soluções Rápidas para Problemas Comuns com CSS!</strong>
              <p>
                Autor: !Christopher Schmitt!
              </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Books>
        <Books>
          <Link to="/book">
            <img src="https://images-submarino.b2w.io/produtos/01/00/item/7288/8/7288845SZ.jpg" alt="img" />
            <div>
              <strong>!CSS Cookbook - Soluções Rápidas para Problemas Comuns com CSS!</strong>
              <p>
                Author: !Christopher Schmitt!
              </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Books>
        <Books>
          <Link to="/book">
            <img src="https://images-submarino.b2w.io/produtos/01/00/item/7288/8/7288845SZ.jpg" alt="img" />
            <div>
              <strong>!CSS Cookbook - Soluções Rápidas para Problemas Comuns com CSS!</strong>
              <p>
                Author: !Christopher Schmitt!
              </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Books>
      </DivMargin>

    </>
  );
};

export default SearchPage;
