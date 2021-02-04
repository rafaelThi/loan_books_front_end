import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivBack } from '../RegisterBook/styles';
import { Div, DivHeader, TitleProfile } from '../SearchPage/styles';
import {
  Books, Container, Div1, Div2, Div3, Div4, Div5, ImgOk, ImgX,
} from './styles';
import X from '../../assets/X.jpg';
import OK from '../../assets/OK.jpg';
import { Button, DivButton } from '../RequisitionsPage/styles';
import { Title } from '../HomePage/styles';

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
  id_book: string;
  id_user: string;
  id_admin: string;
  created_at: string;
  message: string;
  delivered: string;
  IdUser: {
    id:string;
    fullName: string;
    email: string;
  }
  IdBook: {
    id: string;
    name: string;
  }
  IdAdmin:{
    id:string;
    fullNameAdmin: string;
    emailAdmin: string;
  }
}
const RequestAccept:React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();
  const id_admin = params.id;

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const [requistitions, setRequisitions] = useState<IRequisition[]>([]);

  const [delivered, setDelivered] = useState('');

  useEffect(() => {
    const requisitions = api.get(`/requests/requests-accept/${id_admin}`);
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
        <Title>Essas são todas as suas requisições aceitas:</Title>
        <Button
          onClick={() => { history.push(`/history-request/${id_admin}`); }}
          type="button"
        >
          Ir para o histórico de aceitas
        </Button>
      </DivButton>
      {requistitions.map((requisi) => (
        <Container key={requisi.id}>
          <Books>
            <Div5>
              <Div3>
                <Div1>
                  {requisi.delivered != null ? <ImgOk src={OK} alt="Ok" /> : <ImgX src={X} alt="x" /> }
                  <br />
                  <strong>
                    Requisição feita por:
                    {' '}
                    {requisi.IdUser.fullName}
                  </strong>
                </Div1>
                {' '}
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
                    Entregue no dia:
                    {' '}
                    {requisi.delivered || 'Não entregue'}
                  </strong>
                </Div1>
                <Div1>
                  <div>
                    <strong>
                      O como vai ser?
                    </strong>
                    <strong>{requisi.message}</strong>
                  </div>
                </Div1>
                <Div2 />
              </Div3>
              <Div4>
                <strong>
                  Quando será a entrega?
                </strong>
                <Form
                  ref={formRef}
                  onSubmit={async () => {
                    await api.put(`/requests/request-delivered/${requisi.id}`, {
                      delivered,
                    });
                    document.location.reload(true);
                  }}
                >
                  <input
                    value={delivered}
                    onChange={(e) => setDelivered(e.target.value)}
                    name="date-delivered"
                    type="date"
                  />
                  <button type="submit">Salvar</button>
                </Form>
              </Div4>
            </Div5>
          </Books>
        </Container>
      ))}
    </>
  );
};
export default RequestAccept;
