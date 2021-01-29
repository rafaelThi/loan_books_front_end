import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import { Title } from '../HomePage/styles';
import { DivBack } from '../RegisterBook/styles';
import {
  Books, Container, Div1, Div2, Div3, Div4, Div5, Button, DivButton,
} from './styles';
import { Div, DivHeader, TitleProfile } from '../SearchPage/styles';

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

interface IRequisition {
  id: string;
  id_book: string;
  id_user: string;
  id_admin: string;
  IdUser: {
    id:string;
    fullName: string;
    email: string;
  }
  IdBook: {
    id: string;
    name: string;
  }
  IdAdmin:{
    id:string;
    fullNameAdmin: string;
    emailAdmin: string;
  }
}
const RequisitionsPage:React.FC = () => {
  const { params } = useRouteMatch<IParamsDTO>();
  const id_admin = params.id;

  const [adminId, setIdAdmin] = useState<IAdmin>();

  const history = useHistory();

  const [requistitions, setRequisitions] = useState<IRequisition[]>([]);

  useEffect(() => {
    const requisitions = api.get(`/requests/requests-books/${id_admin}`);
    requisitions.then((requisition) => {
      setRequisitions(requisition.data);
    });
  }, [id_admin]);
  useEffect(() => {
    api.get(`/users-book-owners/list-owner/${params.id}`).then((response) => {
      setIdAdmin(response.data);
      // console.log(response.data);
    });
  });

  const [textArea, setTextArea] = useState('');
  return (
    <>
      <DivHeader>
        <Logo />
        <Div>
          <a href={`/profile-admin/${adminId?.idOwner.id}`}>
            <TitleProfile>
              Seja bem vindo
              {' '}
              <br />
              {' '}
              {adminId?.idOwner.fullNameAdmin != null ? adminId?.idOwner.fullNameAdmin : 'Carregando...'}
            </TitleProfile>
          </a>
        </Div>
      </DivHeader>
      <DivBack>
        <BackButton />
      </DivBack>
      <DivButton>
        <Title>Essas são todas as suas requisições:</Title>
        <Button
          onClick={() => { history.push(`/request-accept/${id_admin}`); }}
          type="button"
        >
          Ir para as aceitas
        </Button>
      </DivButton>
      {requistitions.map((requisi) => (
        <Container key={requisi.id}>
          <Books>
            <Div5>
              <Div3>
                <Div1>
                  <strong>
                    Requisição feita por:
                    {' '}
                    {requisi.IdUser.fullName}
                  </strong>
                </Div1>
                {' '}
                <Div1>
                  <strong>
                    Livro requisitado:
                    {' '}
                    {requisi.IdBook.name}
                  </strong>
                </Div1>
                <Div2>
                  <strong>
                    Como vai ser?*
                  </strong>
                  <textarea
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}
                    required
                  />
                  <br />
                  <span>
                    Caso a resposta seja SIM, diga como será a entrega e o tempo de emprestimo.
                    <br />
                    Caso a resposta seja NÃO, deixe o porque.
                    <br />
                    Esse campo é obrigatorio.
                  </span>
                </Div2>
              </Div3>
              <Div4>
                <button
                  onClick={async () => {
                    try {
                      const textAccept = textArea;
                      const schema = Yup.object().shape({
                        textAccept: Yup.string().required('Uma mesagem deve ser escrita :/').min(6, 'Digite algo maior que 6 caracteres :)'),
                      });
                      await schema.validate({ textAccept });

                      alert('o Aceite esta sendo proessado, por favor aguarde alguns segundos ate a sua confirmação!');

                      const sendMail = await api.post('/mail-provider/send-mail-request-return-accept', {
                        nameBook: requisi.IdBook.name,
                        nameUser: requisi.IdUser.fullName,
                        nameAdmin: requisi.IdAdmin.fullNameAdmin,
                        emailUser: requisi.IdUser.email,
                        emailAdmin: requisi.IdAdmin.emailAdmin,
                        textAccept,
                      });
                      if (!sendMail) {
                        alert('Parece que algo deu errado, tente novamente');
                      }
                      alert('parece que tudo correu bem, um email foi encaminhado para você e o usuario');
                      await api.post('/requests/aceept',
                        {
                          id_request: requisi.id,
                          id_book: requisi.IdBook.id,
                          id_user: requisi.IdUser.id,
                          id_admin: requisi.IdAdmin.id,
                          message: textAccept,
                        });
                      await api.delete(`/requests/delete-request/${requisi.id}`);
                      document.location.reload(true);
                    } catch (err) {
                      alert(err);
                    }
                  }}
                  type="button"
                >
                  Aceitar
                </button>

                <div>
                  <button
                    onClick={async () => {
                      try {
                        const textRefuse = textArea;
                        const schema = Yup.object().shape({
                          textRefuse: Yup.string().required('Escreva algo para dizer o motivo da recusa.').min(3, 'Digite algo com pelo menos 3 caracteres :)'),
                        });
                        await schema.validate({ textRefuse });

                        alert('A Recusa esta sendo proessado, por favor aguarde alguns segundos ate a sua confirmação!');

                        const sendMail = await api.post('/mail-provider/send-mail-request-return-refuse', {
                          nameBook: requisi.IdBook.name,
                          nameUser: requisi.IdUser.fullName,
                          emailUser: requisi.IdUser.email,
                          emailAdmin: requisi.IdAdmin.emailAdmin,
                          textRefuse,
                        });
                        if (!sendMail) {
                          alert('Parece que algo deu errado, tente novamente');
                        }
                        alert('Parece que tudo correu bem, um email foi encaminhado para você e o usuario');
                        await api.delete(`/requests/delete-request/${requisi.id}`);
                        document.location.reload(true);
                      } catch (err) {
                        alert(err);
                      }
                    }}
                    type="button"
                  >
                    Recusar

                  </button>
                </div>
              </Div4>
            </Div5>
          </Books>
        </Container>
      ))}
    </>
  );
};
export default RequisitionsPage;
