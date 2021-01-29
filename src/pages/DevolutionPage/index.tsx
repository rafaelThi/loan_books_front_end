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

  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  });

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
        <Form ref={formRef} onSubmit={() => { console.log('devolução'); }}>
          <Title>
            Devolução do livro:
          </Title>
          <H3>
            Para efetuar a devolução deve ser prenchido o ID da requisição:
          </H3>
          <input
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
