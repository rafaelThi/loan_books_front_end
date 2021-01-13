import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo';
import { Container, Title, H3 } from './styles';
import BackButton from '../../components/BackButton';

const AdminPageLogin:React.FC = () => {
  const history = useHistory();

  const [stateEmailAdmin, setStateEmailAdmin] = useState('');
  const [statePasswordAdmin, setStatePasswordAdmin] = useState('');

  const handleLoginAdmin = useCallback(async () => {
    try {
      const email = stateEmailAdmin;
      const password = statePasswordAdmin;

      // console.log({ email, password });

      const schema = Yup.object().shape({
        email: Yup.string()
          . required('Digite um e-mail válido.')
          .email(
            `Digite um e-mail válido
          "ex@ex.com".`,
          ),
        password: Yup.string().required().min(6, 'Senha invalida'),
      });
      await schema.validate({ email, password });
      history.push('/');// registro de livros
    } catch (err) {
      console.log(Error('Erro no logion'));
    }
  }, [stateEmailAdmin, statePasswordAdmin, history]);

  return (
    <>
      <Logo />
      <Title>Antes de começar, vamos logar!</Title>
      <Container>
        <Form onSubmit={handleLoginAdmin}>
          <H3>
            Lembrando que essa é a área do admin,
            {' '}
            <br />
            se você não é admin
            {' '}
            <a href="/login">clique aqui.</a>
          </H3>

          <input
            value={stateEmailAdmin}
            onChange={(e) => setStateEmailAdmin(e.target.value)}
            name="email"
            type="email"
            placeholder="E-mail"
          />
          <input
            value={statePasswordAdmin}
            onChange={(e) => setStatePasswordAdmin(e.target.value)}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <button type="submit">Entrar</button>
        </Form>

      </Container>

      <BackButton />

    </>
  );
};
export default AdminPageLogin;
