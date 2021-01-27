import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivBack } from '../RegisterBook/styles';
import {
  Books, Container, Div1, Div2, Div3, Div4, Div5,
} from './styles';

interface IParamsDTO {
  id: string;
}
interface IRequisition {
  id: string;
  id_book: string;
  id_user: string;
  id_admin: string;
  IdUser: {
    fullName: string;
  }
  IdBook: {
    name: string;
  }
}

const DevolutionPage:React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();
  const id_admin = params.id;

  const [requistitions, setRequisitions] = useState<IRequisition[]>([]);
  useEffect(() => {
    const requisitions = api.get(`/requests/requests-books/${id_admin}`);
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
        <Container>
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
                {' '}
                <Div1>
                  <strong>
                    Livro requisitado:
                    {' '}
                    {requisi.IdBook.name}
                  </strong>
                </Div1>
                <Div2>
                  <strong>
                    Como vai ser?*
                  </strong>
                  <textarea />
                  <br />
                  <span>
                    Caso a resposta seja SIM, diga como será a entrega e o tempo de emprestimo.
                    <br />
                    Caso a resposta seja NÃO, deixe o porque.
                    <br />
                    Esse campo é obrigatorio.
                  </span>
                </Div2>
              </Div3>
              <Div4>
                <button onClick={() => { console.log('Aceite'); }} type="button">Aceitar</button>
                <div>
                  <button onClick={() => { console.log('Recusa'); }} type="button">Recusar</button>
                </div>
              </Div4>
            </Div5>
          </Books>
        </Container>
      ))}
    </>
  );
};
export default DevolutionPage;
