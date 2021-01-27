import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`

display:flex;
justify-content: center;
align-items: center;
text-align: center;
color:#ffffff;

button{
font-size: 15px;
width: 250px;
height: 85px;
background: #04D361;
border-radius: 10px;
border: 0;
color: #fff;
font-weight: bold;
margin: 50px;
transition: background-color 0.2s;
&:hover {
  background: ${shade(0.2, '#04d361')}
}
}
`;
