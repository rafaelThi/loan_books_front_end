import styled from 'styled-components';
import { shade } from 'polished';

export const TitleProfile = styled.h3`
font-size:12px;
font-family: Roboto, sans-serif;
text-decoration: none;
color: #fff;
text-align: center;
`;

export const Div = styled.div`
display:flex;
align-items: center;
justify-content:start;
margin: 28px;
margin-left: 35px;

a {
  text-decoration: none;
  display:flex;
  align-items: center;
  justify-content:start;

}

`;

export const DivMargin = styled.div`
margin-bottom: 50px;
`;

export const DivHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right:23px;
  margin-right: 140px;
  div{
a{
  color: #FFF;
  text-decoration: none;
  display:flex;
  align-items: center;
  justify-content:start;
  font-family: Roboto, sans-serif;
  font-size: 12px;

}
}
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
  width:450px;
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
  width: 210px;
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

export const Books = styled.div`
  margin-left: 100px;
  margin-right: 5;

  margin-top:25px;
  max-width:700px;
  background: #fff;
  border-radius:25px;

    a {
      background: #fff;
      border-radius: 25px;
      width:90%;
      padding:15px;
      display: block;
      text-decoration: none;
      display:flex;
      align-items:center;
      transition: transform 0.3s;
& + a {
  margin-top:16px;
}
    img {
      width:64px;
      height:64px;
      border-radius:30%
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3D3D4D;
        font-family: Roboto, sans-serif;
       font-weight:700;
      }
      p {
        font-size: 18px;
        color:#A1A999;
        margin-top:4px;
        font-family: Roboto, sans-serif;
       font-weight:300;
      }
      }
      svg {
        margin-left: auto;
        color: #cbcbd6;
      }
      &:hover {
        transform: translateX(10px)
      }
    }
`;
