import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { DivHeader } from '../HomePage/styles';
import { Div, TitleProfile } from '../SearchPage/styles';
import { Container, Title, DivBack } from './styles';

interface IAdminDTO {
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

const RegisterBook:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const { params } = useRouteMatch<IAdminDTO>();

  const [stateAuthor, setStateAuthor] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateLanguage, setStateLanguage] = useState('');
  const [stateImg, setStateImg] = useState('');
  // console.log(params);

  const handleRegisterUser = useCallback(async () => {
    try {
      const book = await api.post(`/requisition-book/register-book/${params.id}`, {
        author: stateAuthor,
        name: stateName,
        language: stateLanguage,
        img: stateImg,
      });

      history.push(`/book/${book.data.book.id}`);
    } catch (err) {
      alert(`Digite todos os dados.
${err}`);
    }
  }, [history, params.id, stateAuthor, stateImg, stateLanguage, stateName]);

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
