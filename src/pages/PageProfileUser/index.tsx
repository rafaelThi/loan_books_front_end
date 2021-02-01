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

  const [emailUser, setEmailUser] = useState('');
  const [password, setNewPassword] = useState('');

  useEffect(() => {
    api.get(`/users/list-user-id/${params.id}`).then((response) => {
      setIdUser(response.data);
      // console.log(response.data);
    });
  }, [setIdUser, params]);
  console.log(userId, 'userId');

  const handleNewPassword = async () => {
    const user = await api.get(`/users/list-user-id/${params.id}`);
    if (user.data.user.email === emailUser) {
      await api.put(`/users/reset-password-user/${params.id}`, {
        password,
      });
      alert('Nova senha salva');
      document.location.reload(true);
    } else {
      alert('Puts... algo deu errado :/');
    }
  };

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
        <Form onSubmit={handleNewPassword}>
          <H3>
            Email de Login:
            {' '}
            {userId?.user.email}
          </H3>
          <p>
            Caso queira mudar sua senha atua:
          </p>
          <span>
            Seu email:
          </span>
          <input
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
            name="emailUser"
            type="email"
            placeholder="Digite seu email..."
          />
          <span>
            Nova senha:
          </span>
          <input
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
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
