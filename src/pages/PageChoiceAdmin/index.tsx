import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { DivBack } from '../RegisterBook/styles';
import { Container } from './styles';

interface IParamsDTO {
  id: string;
}

const PageChoiceAdmin: React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();

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

  return (
    <>
      <Logo />
      <DivBack>
        <BackButton />
      </DivBack>
      <Container>
        <button type="button" onClick={handleRegister}>Ir para a página para registrar um novo livro</button>
        <button type="submit" onClick={handleRequisitions}>Ir para a página de aceite ou recusa de requisições</button>
      </Container>
      <Container>
        <button type="submit" onClick={handleDevolution}>Devolver um livro</button>
      </Container>

    </>
  );
};

export default PageChoiceAdmin;
