import React from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { Title } from './styles';

const SearchPage:React.FC = () => {
  return (
    <>
      <Logo />
      <BackButton />
      <Title>Pagina de Busca</Title>
    </>
  );
};

export default SearchPage;
