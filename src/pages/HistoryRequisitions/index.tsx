/* eslint-disable react/no-unescaped-entities */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { Title } from '../HomePage/styles';
import { DivBack } from '../RegisterBook/styles';
import {
  Books, Container, Div1, Div3, Div5, DivBusca, DivBusca2, DivButton, H3,
} from './styles';
import {
  Div, DivHeader, TitleProfile,
} from '../SearchPage/styles';

interface IParamsDTO {
  id: string;
}

interface IAdmin {
  idOwner: {
    id:string;
    fullNameAdmin: string;
    emailAdmin: string;
    passwordAdmin: string;
  }
}

interface IRequisition {
  id: string;
  id_request_accept: string;
  id_request: string;
  id_book: string;
  id_user: string;
  id_admin: string;
  created_at: string;
  message: string;
  delivered: string;
  devolution_at: string;
  IdBook: {
    id: string;
    name: string;
  }
  IdUser: {
    id:string;
    fullName: string;
    email: string;
  }
  IdAdmin:{
    id:string;
    fullNameAdmin: string;
  }
}
const HistoryRequisitions:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch<IParamsDTO>();
  // const id_admin = params.id;

  const [adminId, setIdAdmin] = useState<IAdmin>();

  // const [requistitions, setRequisitions] = useState<IRequisition[]>([]);

  const [booksName, setBooksName] = useState<IRequisition[]>([]);

  const [titleBook, setTitleBook] = useState('');

  const [nameUser, setNameUser] = useState('');

  // useEffect(() => {
  //   const requisitions = api.get(`/history/history-accepts/${id_admin}`);
  //   requisitions.then((requisition) => {
  //     setRequisitions(requisition.data);
  //   });
  // }, [id_admin]);
  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
    });
  }, [params.id]);

  const handleSearchTitle = useCallback(async () => {
    try {
      const name = titleBook;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o Título que busca.'),
      });
      await schema.validate({ name });

      const response = await api.get(`/history/history-books/${params.id}/${name}`);
      setBooksName(response.data);
    } catch (err) {
      alert('Ops, parece que não achamos o livro que busca.');
    }
  }, [params.id, titleBook]);
  const handleSearchName = useCallback(async () => {
    try {
      const name = nameUser;

      const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome que busca.'),
      });
      await schema.validate({ name });

      const response = await api.get(`/history/history-user/${params.id}/${name}`);
      setBooksName(response.data);
    } catch (err) {
      alert('Ops, parece que não achamos o nome do usuário que busca.');
    }
  }, [nameUser, params.id]);

  return (
    <>
      <DivHeader>
        <Logo />
        <Div>
          <div>
            <a href={`/profile-admin/${adminId?.idOwner.id}`}>
              <TitleProfile>
                Seja bem vindo
                {' '}
                <br />
                {' '}
                {adminId?.idOwner.fullNameAdmin != null ? adminId?.idOwner.fullNameAdmin : 'Carregando...'}
              </TitleProfile>
            </a>
            <a onClick={async () => { await api.delete(`/admin-token/delete-token321/${params.id}`); }} href="/">Sair</a>
          </div>
        </Div>
      </DivHeader>
      <DivBack>
        <BackButton />
      </DivBack>
      <DivButton>
        <Title>Histórico de livros já devolvidos</Title>
      </DivButton>
      <H3>
        Basta digitar o título do livro que procura, ou o nome do usuário que deseja encontrar:
      </H3>
      <Container>
        <DivBusca>
          <Form ref={formRef} onSubmit={handleSearchTitle}>
            <br />
            <span>Titulo: </span>
            <DivBusca2>
              <input
                value={titleBook}
                onChange={(e) => setTitleBook(e.target.value)}
                name="titleBook"
                type="text"
                placeholder="Digite o nome do titulo..."
              />
              <button type="submit">Pesquisar</button>
            </DivBusca2>
          </Form>
          <Form onSubmit={handleSearchName}>
            <span>Nome: </span>
            <DivBusca2>
              <input
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                name="authorBook"
                type="text"
                placeholder="Digite o nome..."
              />
              <button type="submit">Pesquisar</button>
            </DivBusca2>
          </Form>
        </DivBusca>
      </Container>
      { booksName.map((bookName) => (
        <Container key={bookName.id}>
          <Books>
            <Div5>
              <Div3>
                <Div1>
                  <strong>
                    Requisição feita por:
                    {' '}
                    {bookName.IdUser.fullName}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Email:
                    {' '}
                    {bookName.IdUser.email}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Livro requisitado:
                    {' '}
                    {bookName.IdBook.name}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Aceita no dia:
                    {' '}
                    {bookName.created_at.substr(0, 10)}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Entrega dia:
                    {' '}
                    {bookName.delivered}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Como foi:
                    {' '}
                    "
                    {bookName.message}
                    "
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Devolvido dia:
                    {' '}
                    {bookName.devolution_at.substr(0, 10)}
                  </strong>
                </Div1>
              </Div3>
            </Div5>
          </Books>
        </Container>
      ))}
    </>
  );
};
export default HistoryRequisitions;
