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
interface IUser {
  user: {
    id:string;
    fullName: string;
    email: string;
    password: string;
  }
}

const PageProfile:React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();

  const [userId, setIdUser] = useState<IUser>();

  useEffect(() => {
    api.get(`/users/list-user-id/${params.id}`).then((response) => {
      setIdUser(response.data);
      // console.log(response.data);
    });
  }, [setIdUser, params]);
  console.log(userId, 'userId');

  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <Title>
        {userId?.user.fullName}
      </Title>
      <Container>
        <Form onSubmit={() => { console.log('ola mundo'); }}>
          <H3>
            Email de Login:
            {' '}
            {userId?.user.email}
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

export default PageProfile;
