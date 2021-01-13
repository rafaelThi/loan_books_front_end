import styled from 'styled-components';
import { shade } from 'polished';

export const DivHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right:23px;
  margin-right: 140px;

`;

export const Span = styled.p`
  display:flex;
  text-align: start;
  justify-content: start;
  align-items: center;
  margin-left: 1px;
  margin-bottom: 4px;
  margin-top:-18px;
`;

export const Container = styled.div`
  margin-left: 100px;
  margin-right: 50px;
  display:block;
  justify-content: start;
  align-items: center;
  text-align: start;
  color:#ffffff;

  div{
    display:flex;
    align-items: center;
    justify-content:start;
    text-align: center;
  }

input{
  display:block;

  height: 40px;
  width:400px;
  padding:0 14px;
  border: 0;
  border-radius:10px;
  color: #3a3a3a;
  margin-bottom:25px;
}
input::placeholder {
    color:#a8a8b3;
  }
button{
  width: 195px;
  height: 40px;
  background: #04D361;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-weight: bold;
  margin-top:-24px;
  transition: background-color 0.2s;
  margin-left: 10px;
  &:hover {
    background: ${shade(0.2, '#04d361')}
  }
}
span {
  display:flex;
  text-align: start;
  justify-content: start;
  align-items: center;
  margin-left: 12px;
  margin-bottom: 4px;
  margin-top:-18px;
}

`;

export const Title = styled.h1`
  font-family: Roboto, sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: start;
  color:#ffffff;
  text-align:  start;
  margin-top: -20px;
`;

export const H3 = styled.h3`
  font-family: Roboto, sans-serif;
  font-weight: 400;
  text-decoration: none;
  color:#ffffff;

`;
