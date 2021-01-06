import React from 'react';
import { Div, Img, Title } from './styles';
import logoImg from '../../assets/logoImg.svg';

const Logo: React.FC = () => {
return(
  <Div>
    <a href="/">
    <Img src={logoImg} alt="Logo"/>
    <Title>Books Loan</Title>
    </a>
  </Div>
)
}

export default Logo;