/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { Title } from '../HomePage/styles';
import { DivBack } from '../RegisterBook/styles';
import {
  Books, Container, Div1, Div3, Div5, DivButton, H3,
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
  const { params } = useRouteMatch<IParamsDTO>();
  const id_admin = params.id;

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const [requistitions, setRequisitions] = useState<IRequisition[]>([]);

  useEffect(() => {
    const requisitions = api.get(`/history/history-accepts/${id_admin}`);
    requisitions.then((requisition) => {
      setRequisitions(requisition.data);
    });
  }, [id_admin]);
  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  }, [params.id]);

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
      {requistitions.map((requisi) => (
        <Container key={requisi.id}>
          <Books>
            <Div5>
              <Div3>
                <Div1>
                  <strong>
                    Requisição feita por:
                    {' '}
                    {requisi.IdUser.fullName}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Email:
                    {' '}
                    {requisi.IdUser.email}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Livro requisitado:
                    {' '}
                    {requisi.IdBook.name}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Aceita no dia:
                    {' '}
                    {requisi.created_at.substr(0, 10)}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Entrega dia:
                    {' '}
                    {requisi.delivered}
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Como foi:
                    {' '}
                    "
                    {requisi.message}
                    "
                  </strong>
                </Div1>
                <Div1>
                  <strong>
                    Devolvido dia:
                    {' '}
                    {requisi.devolution_at.substr(0, 10)}
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
