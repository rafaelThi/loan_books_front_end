import React from 'react';
import Logo from '../../components/Logo/logo';
import {
  Button, Title, DivButt, Img, ImgFundo, DivCapa, DivHeader,
} from './styles';
import ImgButton from '../../assets/imgButton.svg';
import theme from '../../assets/livros.jpg';

const HomePage: React.FC = () => (
  <div>
    <DivHeader>
      <Logo />
      <a href="/admin-login">Admin</a>
    </DivHeader>
    <DivCapa>
      <Title>
        Sua plaforma para empréstimo
        <br />
        de livros online.
      </Title>

      <ImgFundo src={theme} />
    </DivCapa>

    <DivButt>
      <a href="/login">
        <Button>
          <Img src={ImgButton} />
          Procurar um livro
        </Button>
      </a>
    </DivButt>

  </div>
);
export default HomePage;
