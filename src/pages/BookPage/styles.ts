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
  justify-content: start;
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
button{
  width: 210px;
  height: 55px;
  background: #04D361;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-weight: bold;
  margin-top:15px;
  transition: background-color 0.2s;
  margin-left: 0px;
  &:hover {
    background: ${shade(0.2, '#04d361')}
  }
}
`;
