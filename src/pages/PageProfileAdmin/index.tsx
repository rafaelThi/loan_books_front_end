import { Form } from '@unform/web';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivHeader } from '../HomePage/styles';
import { Container, H3, Title } from './styles';

interface IParamsDTO{
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

const PageProfileAdmin:React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();

  const [adminId, setIdAdmin] = useState<IAdmin>();

  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  }, [setIdAdmin, params]);
  console.log(adminId, 'userId');

  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <Title>
        {adminId?.idOwner.fullNameAdmin}
      </Title>
      <Container>
        <Form onSubmit={() => { console.log('ola mundo'); }}>
          <H3>
            Email de Login:
            {' '}
            {adminId?.idOwner.emailAdmin}
          </H3>
          <p>
            Caso queira mudar sua senha atua:
          </p>
          <span>
            Senha antiga:
          </span>
          <input
          // value={stateEmail}
          // onChange={(e) => setStateEmail(e.target.value)}
            name="oldPassword"
            type="password"
            placeholder="Digite sua senha antiga..."
          />
          <span>
            Nova senha:
          </span>
          <input
          // value={statePassword}
          // onChange={(e) => setStatePassword(e.target.value)}
            name="newPassword"
            type="password"
            placeholder="Digite sua nova senha..."
          />
          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </>
  );
};

export default PageProfileAdmin;
