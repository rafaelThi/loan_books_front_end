import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/logo';
import { Button, Title, DivButt, Img, ImgFundo, DivCapa, DivHeader } from './styles';
import ImgButton from '../../assets/imgButton.svg'
import capa from '../../assets/livros.jpg'

const HomePage: React.FC = () => {
  return(
    <div>
      <DivHeader>
                  <Logo/>
             <a href="/">Admin</a>
      </DivHeader>
      <DivCapa>
      <Title>Sua plaforma para empréstimo <br/>
de livros online.</Title>

<ImgFundo src={capa} />
      </DivCapa>


<DivButt>
  <Button>
    <Img src={ImgButton}/>
    <a href="/">Procurar um livro</a>
    </Button>
  <span>Total de livros já <br/>emprestados: 165 </span>
</DivButt>

    </div>
  )
}
export default HomePage;