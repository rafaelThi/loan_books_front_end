import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivBack } from '../RegisterBook/styles';
import {
  Books, Container, Div1, Div2, Div3, Div4, Div5, ImgOk, ImgX,
} from './styles';
import X from '../../assets/X.jpg';
import OK from '../../assets/OK.jpg';

interface IParamsDTO {
  id: string;
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

  const formRef = useRef<FormHandles>(null);

  const [requistitions, setRequisitions] = useState<IRequisition[]>([]);

  const [delivered, setDelivered] = useState('');

  useEffect(() => {
    const requisitions = api.get(`/requests/requests-accept/${id_admin}`);
    requisitions.then((requisition) => {
      setRequisitions(requisition.data);
    });
  }, [id_admin]);

  return (
    <>
      <Logo />
      <DivBack>
        <BackButton />
      </DivBack>
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
                    // placeholder="Digite uma data DD/MM/AAAA"
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
