import styled from 'styled-components';
import { shade } from 'polished';

export const ImgOk = styled.img`
height:35px;
width:35px;
margin-bottom:10px;
margin-top:-10px;
`;

export const ImgX = styled.img`
height:45px;
width:45px;
border-radius:50%;
margin-bottom:10px;
margin-top:-10px;
`;

export const Container = styled.div`
color:#3D3D4D;
display:flex;
justify-content: center;
align-items: center;
text-align: center;
color:#ffffff;
margin-bottom:20px;

`;

export const Books = styled.div`
margin-left: 100px;
margin-right: 5;
color:#3D3D4D;

margin-top:25px;
min-width:850px;
max-width:850px;
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
     margin-right:10px;
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
justify-content: center;
text-align: center;

/* margin-left: 70px; */
div{
display: block;
align-items: center;
justify-content:space-between;
}
input{
  /* display:block; */
  height: 35px;
  width:140px;
  padding:0 14px;
  border: 0;
  border-radius:5px;
  color: #3a3a3a;
  margin-bottom:15px;
  margin-left:-22px;
  background: #D8D8D8;

}
input::placeholder {
    color:#a8a8b3;
  }
  button{
font-size: 15px;
width: 140px;
height: 35px;
background: #04D361;
border-radius: 10px;
border: 0;
color: #fff;
font-weight: bold;
margin: 5px;
transition: background-color 0.2s;
&:hover {
  background: ${shade(0.2, '#04d361')}
}
}
`;

export const Div5 = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
