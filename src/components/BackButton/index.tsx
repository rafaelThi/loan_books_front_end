import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';
import { A } from './styles';

const BackButton: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <A onClick={history.goBack}>
        <ArrowBackIosIcon />
        Voltar
      </A>
    </div>
  );
};

export default BackButton;
