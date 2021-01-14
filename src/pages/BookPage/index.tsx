import React from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { DivH, DivHeader, DivV } from './styles';

const BookPage: React.FC = () => {
  return (
    <>
      <DivHeader>
        <Logo />
        <BackButton />
      </DivHeader>
      <DivH>
        <img src="https://images-submarino.b2w.io/produtos/01/00/item/7288/8/7288845SZ.jpg" alt="img" />
        <div>
          <strong>!CSS Cookbook - Soluções Rápidas para Problemas Comuns com CSS!</strong>
          <p>
            Autor: !Christopher Schmitt!
          </p>
        </div>
      </DivH>
      <DivV>
        <strong>
          Caso tenha interesse em pegar emprestado esse livro, solicite ao seu dono:
        </strong>
        <p>
          Dono do livro: !Aleatório 1!
        </p>
        {/* Rever esse trecho */}
        <button type="button">
          Solicitar
          {' '}
          <br />
          {' '}
          Empréstimo
        </button>
      </DivV>
    </>
  );
};
export default BookPage;
