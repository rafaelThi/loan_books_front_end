import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
font-family: Roboto, sans-serif;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
color:#ffffff;
margin-bottom: -8px;

`;

export const H3 = styled.h3`
font-family: Roboto, sans-serif;
font-weight: 400;
text-decoration: none;
color:#ffffff;


a {
  color: #000;
  font-style:italic;
  color:#ffffff;

}

`;

export const Container = styled.div`

  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color:#ffffff;


input{
  display:block;

  height: 50px;
  width:400px;
  padding:0 14px;
  border: 0;
  border-radius:15px;
  color: #3a3a3a;
  margin-bottom:25px;
}
input::placeholder {
    color:#a8a8b3;
  }
button{
  width: 195px;
  height: 50px;
  background: #04D361;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#04d361')}
  }
}

span {
  display:flex;
  font-size: 16px;
  margin:12px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  a{
    color:#ffffff;
  }
}

p {
  align-items: center;
  text-align: start;
  justify-content:start;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  margin-top: 50px;
}
`;
