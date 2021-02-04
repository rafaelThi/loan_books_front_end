import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import {
  Container, Title, H3,
} from './styles';

const RecoverPassword:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [stateEmail, setStateEmail] = useState('');
  const handleSubmit = useCallback(async () => {
    try {
      const email = stateEmail;

      // console.log({ email, password });
      alert('Estamos processando sua solicitação, isso pode levar alguns segundos');
      const schema = Yup.object().shape({
        email: Yup.string()
          . required('Digite um e-mail válido.')
          .email(
            `Digite um e-mail válido
          "ex@ex.com".`,
          ),
      });

      await schema.validate({ email });

      const findUser = await api.get(`/users/list-user-email/${email}`);

      if (findUser.data.user) {
        // const body = `Recuperação de senha para o email: ${email}.
        // para recuperar sua senha basta clicar no link: http://localhost:3000/reset-password/${findUser.data.user.id}`;
        await api.post('/mail-provider/send-mail-recover-password', {
          email,
          body: `Recuperação de senha para o email: ${email}.
          Para recuperar sua senha basta clicar no link: http://localhost:3000/reset-password/${findUser.data.user.id}`,
        });
        alert('Email enviado para o endereço solicitado');
        history.push('/login');
      } else {
        alert('Email não encontrado... Talvez você não tenha um conta conosco.');
      }
    } catch (err) {
      alert('Digite um e-mail');
    }
  }, [stateEmail, history]);
  return (
    <>
      <Logo />
      <Title>
        Para recuperar sua senha
        {' '}
        <br />
        {' '}
        basta digitar seu email:

      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <H3>
            Um email sera encaminhado para sua caixa de
            {' '}
            <br />
            entrada, lembre-se de olhar na caixa de spam!
          </H3>

          <input
            value={stateEmail}
            onChange={(e) => setStateEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Digite seu e-mail..."
          />
          <button type="submit">Enviar</button>
        </Form>
      </Container>
      <BackButton />
    </>
  );
};

export default RecoverPassword;
