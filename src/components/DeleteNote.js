import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../qql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../qql/query';

const DeleteNote = (props) => {
  const navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],

    onCompleted: () => {
      navigate('/mynotes');
    },
  });

  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default DeleteNote;
