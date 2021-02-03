import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { DivBack } from '../RegisterBook/styles';
import { Container, H3, Title } from './styles';
import { Div, DivHeader, TitleProfile } from '../SearchPage/styles';
import api from '../../server/api';

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

const DevolutionPage:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch<IParamsDTO>();

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const [idDelete, setIdDelete] = useState('');

  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  }, [params.id]);
  const handleDelete = async () => {
    try {
      const getRequestAccept = await api.get(`/requests/get-request-accept/${idDelete}`);
      if (getRequestAccept.data.getRequest) {
        const history = await api.post('/history/history-accepts', {
          id_request_accept: getRequestAccept.data.getRequest.id,
          id_request: getRequestAccept.data.getRequest.id_request,
          id_book: getRequestAccept.data.getRequest.id_book,
          id_user: getRequestAccept.data.getRequest.id_user,
          id_admin: getRequestAccept.data.getRequest.id_admin,
          created_at: getRequestAccept.data.getRequest.created_at,
          message: getRequestAccept.data.getRequest.message,
          delivered: getRequestAccept.data.getRequest.delivered,
        });
        if (history) {
          await api.delete(`/requests/delete-request-accept/${idDelete}`);
          alert('Livro devolvido!!');
          document.location.reload(true);
        } else {
          throw new Error('Algo deu errado :/');
        }
      } else {
        throw new Error('Requisição não encontrada... Talvez você já tenha feito isso');
      }
    } catch (error) {
      alert(`Ops, algo deu errado :/  ${error}`);
    }
  };
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
      <Container>
        <Form ref={formRef} onSubmit={handleDelete}>
          <Title>
            Devolução do livro:
          </Title>
          <H3>
            Para efetuar a devolução deve ser prenchido o ID da requisição:
          </H3>
          <input
            value={idDelete}
            onChange={(e) => setIdDelete(e.target.value)}
            name="id"
            type="text"
            placeholder="Digite o ID..."
          />
          <button type="submit">Confirmar</button>
        </Form>

      </Container>
    </>
  );
};
export default DevolutionPage;
