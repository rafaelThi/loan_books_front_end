import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { Div, DivHeader, TitleProfile } from '../SearchPage/styles';
import { Container } from './styles';

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

const PageChoiceAdmin: React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const history = useHistory();

  const handleRegister = () => {
    console.log('registro de livros');
    history.push(`/register-book-321/${params.id}`);
  };

  const handleRequisitions = () => {
    console.log('registro de livros');
    history.push(`/requisitions-book/${params.id}`);
  };

  const handleDevolution = () => {
    console.log('registro de livros');
    history.push(`/devolution-book/${params.id}`);
  };

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
      <Container>
        <button type="button" onClick={handleRegister}>Registrar um novo livro</button>
        <button type="submit" onClick={handleRequisitions}>Aceita ou recusa requisições</button>
      </Container>
      <Container>
        <button type="submit" onClick={handleDevolution}>Devolver um livro</button>
      </Container>

    </>
  );
};

export default PageChoiceAdmin;
