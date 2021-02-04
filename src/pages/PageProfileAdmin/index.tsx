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

  const [emailAdmin, setEmailAdmin] = useState('');
  const [password, setNewPasswordAdmin] = useState('');

  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  }, [setIdAdmin, params]);
  console.log(adminId, 'userId');

  const handleNewPassword = async () => {
    const admin = await api.get(`/users-book-owners/list-owner/${params.id}`);
    if (admin.data.idOwner.emailAdmin === emailAdmin) {
      await api.put(`/users-book-owners/reset-password-admin/${params.id}`, {
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
        {adminId?.idOwner.fullNameAdmin}
      </Title>
      <Container>
        <Form onSubmit={handleNewPassword}>
          <H3>
            Email de Login:
            {' '}
            {adminId?.idOwner.emailAdmin}
          </H3>
          <p>
            Caso queira mudar sua senha atua:
          </p>
          <span>
            Seu email:
          </span>
          <input
            value={emailAdmin}
            onChange={(e) => setEmailAdmin(e.target.value)}
            name="email"
            type="email"
            placeholder="Digite seu email..."
          />
          <span>
            Nova senha:
          </span>
          <input
            value={password}
            onChange={(e) => setNewPasswordAdmin(e.target.value)}
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
