import { shade } from 'polished';
import styled from 'styled-components';

export const DivHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-right:23px;

a {
  color: #DBDBDB;
  margin-right: 19px;

  }

`;

export const Title = styled.h1`
color: #DBDBDB;
font-size: 24px;
font-family: Poppins, sans-serif;
margin-top: 70px;
margin-left:40px;
`;

export const DivCapa = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

export const ImgFundo = styled.img`
height: 300px;
width:500px;
margin: 18px;

`;

export const DivButt = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
position: relative;
left: 0px;

span {
  color: #DBDBDB;
  font-family: Poppins, sans-serif;
  margin:18px;
}

a {
    text-decoration: none;
    color: #fff;
  }

`;

export const Img = styled.img`
height: 30px;
width:35px;
margin-right: 5px;
`;

export const Button = styled.button`
background-color:#04D361;
color: #ffff;
padding: 22px;
border-radius: 12px;
font-family: Roboto, sans-serif;
font-weight:700;
font-size: 18px;

margin:18px;


display:flex;
justify-content: center;
align-items: center;

text-decoration: none;

transition: 0.2s;

outline: none;
border: none;

&:hover{
  background: ${shade(0.2, '#04d361')};
 }

`;
