import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { Container, Title } from './styles';

interface IResp {
data:{
  admin:{
    fullNameAdmin: string;
    emailAdmin: string;
  }}
}

const RegisterNewAdmin:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [stateName, setStateName] = useState('');

  const handleNewAdmin = useCallback(async () => {
    try {
      const name = stateName;
      const email = stateEmail;
      const password = statePassword;

      const schema = Yup.object().shape({
        name: Yup.string().min(5, 'Digite o nome completo').required(),
        email: Yup.string()
          . required('Digite um e-mail válido.')
          .email(
            `Digite um e-mail válido
          "ex@ex.com".`,
          ),

        password: Yup.string().min(6, 'Senha invalida'),

      });

      await schema.validate({ name, email, password });

      const resp: IResp = await api.post('/users-book-owners/create-owners', {
        fullNameAdmin: stateName,
        emailAdmin: stateEmail,
        passwordAdmin: statePassword,
      });
      alert(`Seja bem vindo ${resp.data.admin.fullNameAdmin}, Seu logion foi criado com o email: ${resp.data.admin.emailAdmin}`);
      history.push('/admin-login');
    } catch (err) {
      alert(`Digite todos os dados.
${err}`);
    }
  }, [history, stateEmail, stateName, statePassword]);
  return (
    <>
      <Logo />
      <Title>
        Para criar uma conta de Admin, basta
        {' '}
        <br />
        {' '}
        preencher seus dados abaixo!
      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleNewAdmin}>
          <span> Nome completo:</span>
          <input
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            name="name"
            type="text"
            placeholder="Nome completo..."
          />
          <span> Email:</span>
          <div>
            <input
              value={stateEmail}
              onChange={(e) => setStateEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="E-mail..."
            />
            <p>Só pode haver um cadastro por email*</p>
          </div>
          <div>
            <span> Senha:</span>
            <input
              value={statePassword}
              onChange={(e) => setStatePassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Senha..."
            />
            <p>A senha deve conter no minimo 6 caracteres*</p>
          </div>
          <button type="submit">Salvar</button>
        </Form>
      </Container>
      <BackButton />
    </>
  );
};

export default RegisterNewAdmin;
