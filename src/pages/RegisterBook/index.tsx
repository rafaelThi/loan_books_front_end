import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivHeader } from '../HomePage/styles';
import { Container, Title } from './styles';

interface IAdminDTO {
  id: string;
}

const RegisterBook:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { params } = useRouteMatch<IAdminDTO>();

  const [stateAuthor, setStateAuthor] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateLanguage, setStateLanguage] = useState('');
  const [stateImg, setStateImg] = useState('');
  console.log(params);

  const handleRegisterUser = useCallback(async () => {
    try {
      await api.post(`/requisition-book/register-book/${params.id}`, {
        author: stateAuthor,
        name: stateName,
        language: stateLanguage,
        img: stateImg,
      });

      history.push('/');
    } catch (err) {
      alert(`Digite todos os dados.
${err}`);
    }
  }, [history, params.id, stateAuthor, stateImg, stateLanguage, stateName]);
  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <Title>
        Para criar uma conta é muito facil, basta
        {' '}
        <br />
        {' '}
        preencher seus dados abaixo!
      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleRegisterUser}>
          <div>
            <span> Nome do livro:</span>
            <input
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              name="name"
              type="text"
              placeholder="Nome do livro..."
            />
          </div>
          <div>
            <span> Autor:</span>
            <input
              value={stateAuthor}
              onChange={(e) => setStateAuthor(e.target.value)}
              name="autort"
              type="text"
              placeholder="Autor do livro..."
            />
          </div>
          <div>
            <span>Linguagem:</span>
            <input
              value={stateLanguage}
              onChange={(e) => setStateLanguage(e.target.value)}
              name="language"
              type="text"
              placeholder="Linguagem do livro..."
            />
          </div>
          <div>
            <span>Imagem:</span>
            <input
              value={stateImg}
              onChange={(e) => setStateImg(e.target.value)}
              name="img"
              type="url"
              placeholder="Url da imagem..."
            />
          </div>
          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterBook;
