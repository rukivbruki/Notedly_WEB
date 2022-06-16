import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../qql/query';
import { EDIT_NOTE } from '../qql/mutation';

const EditNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME);
  console.log(userdata);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      navigate(`/note/${id}`, { replace: true });
    },
  });

  if (loading) return 'Loading...';
  if (error) return <p>Error!</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
