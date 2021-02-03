import styled from 'styled-components';
import { shade } from 'polished';

export const DivButton = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`;

export const H3 = styled.h3`
  /* font-family: Roboto, sans-serif; */
  font-family: Poppins, sans-serif;
  font-weight: 400;
  text-decoration: none;
  color:#ffffff;
  margin-left:39px;
  color: #DBDBDB;
  margin-top:-8px;

`;

export const Button = styled.button`
font-size: 15px;
width: 200px;
height: 45px;
background: #04D361;
border-radius: 10px;
border: 0;
color: #fff;
font-weight: bold;
margin-right: 37px;
margin-top:25px;
transition: background-color 0.2s;
&:hover {
  background: ${shade(0.2, '#04d361')}
}
`;

export const Container = styled.div`
color:#3D3D4D;
display:flex;
justify-content: center;
align-items: center;
text-align: center;
color:#ffffff;
margin-bottom:22px;

button{
font-size: 15px;
width: 250px;
height: 85px;
background: #04D361;
border-radius: 10px;
border: 0;
color: #fff;
font-weight: bold;
margin: 15px;
transition: background-color 0.2s;
&:hover {
  background: ${shade(0.2, '#04d361')}
}
}
`;

export const Books = styled.div`
margin-left: 100px;
margin-right: 5;
color:#3D3D4D;

margin-top:5px;
max-width:700px;
background: #fff;
border-radius:25px;
padding-inline: 20px;
padding-block: 10px;

  div {
    strong {
    color:#3D3D4D;
      font-size: 18px;
      font-family: Roboto, sans-serif;
     font-weight:500;
     margin-right:25px;
     margin-top:25px;
     margin-bottom:25px;


    }
    p {
      color:#3D3D4D;

      font-size: 18px;
      color:#A1A999;
      margin-top:4px;
      font-family: Roboto, sans-serif;
     font-weight:300;
    }
    }
`;

export const Div1 = styled.div`
display:block;
align-items: center;
justify-content: start;
text-align: start;
margin-top:20px;
margin-bottom:20px;

strong{
color:#3D3D4D;
font-family: Roboto, sans-serif;
font-weight:300;

}

`;

export const Div2 = styled.div`
display:block;
align-items: center;
justify-content: space-between;
text-align: start;
margin-top:10px;
margin-bottom:20px;
margin-right:0px;

textarea {
  height: 60px;
  width: 250px;
  resize: none;
  background: #D8D8D8;
  margin-top:19px;
}

span {
  font-size: 11px;
}
`;

export const Div3 = styled.div`
display:block;
align-items: center;
justify-content: start;
`;

export const Div4 = styled.div`
display:block;
align-items: center;
justify-content: start;
margin-left: 70px;
div{
button{
background: #D30404;
transition: background-color 0.2s;
&:hover {
  background: ${shade(0.2, '#D30404')}
}
}
}
`;

export const Div5 = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
