import { shade } from 'polished';
import styled from 'styled-components';

export const DivHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right:23px;
  margin-right: 140px;

`;

export const DivH = styled.div`
  display:flex;
  align-items: center;
  justify-content: start;
  margin-left: 100px;
  margin-right: 50px;
  max-width:800px;

img {
  height: 200px;
  width: 200px;
  border-radius:25px;
  margin-right:25px;
}

strong {
  font-size: 32px;
  color: #FFF;
  font-family: Roboto, sans-serif;
  font-weight:700;
}
p {
  font-size: 18px;
  color:#FFF;
  margin-top:4px;
  font-family: Roboto, sans-serif;
  font-weight:100;
}

`;

export const DivV = styled.div`
  display:block;
  align-items: center;
  justify-content: center;
  margin-left: 120px;
  margin-right: 50px;
  max-width:700px;
  margin-top: 55px;
strong {
  font-size: 25px;
  color:#FFFF;
  margin-top:4px;
  font-family: Roboto, sans-serif;
  font-weight:700;

}

p{
  font-size: 18px;
  color:#FFFA;
  margin-top:4px;
  font-family: Roboto, sans-serif;
  font-weight:500;
}
div{
display: flex;
button{
  width: 210px;
  height: 40px;
  background: #04D361;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  margin-left: 10px;
  &:hover {
    background: ${shade(0.2, '#04d361')}
  }
}
  input{
  display:flex;
  height: 40px;
  width:450px;
  padding:0 14px;
  border: 0;
  border-radius:10px;
  color: #3a3a3a;
  margin-bottom:22px;
}
input::placeholder {
    color:#a8a8b3;
  }
}

`;
