import { Form } from '@unform/web';
import React from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import {
  Title, H3, Container, DivHeader, Span,
} from './styles';

const SearchPage:React.FC = () => {
  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <Container>
        <Title>
          Ache aqui o livro que procura
        </Title>
        <H3>
          Basta digitar o título, nome do autor ou a linguagem do livro que deseja encontrar;
        </H3>
        <Span>Pesquisar por; </Span>
        <Form onSubmit={() => { console.log('Title'); }}>
          <br />
          <span>Titulo: </span>
          <div>
            <input
              name="titleBook"
              type="text"
              placeholder="Digite o nome do titulo..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>
        <Form onSubmit={() => { console.log('autho'); }}>
          <span>Autor: </span>
          <div>
            <input
              name="authorBook"
              type="text"
              placeholder="Digite o nome do autor..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>
        <Form onSubmit={() => { console.log('language'); }}>
          <span>Linguagem: </span>
          <div>
            <input
              name="languageBook"
              type="text"
              placeholder="Digite a liguagem..."
            />
            <button type="submit">Pesquisar</button>
          </div>
        </Form>

      </Container>
    </>
  );
};

export default SearchPage;
