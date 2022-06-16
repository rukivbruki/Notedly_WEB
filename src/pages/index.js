import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import SignUp from './signup';
import SignIn from './signin';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import PrivateRoute from '../components/PrivateRoute';
import NewNote from './new';
import EditNote from './edit';

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mynotes" element={<MyNotes />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/new" element={<NewNote />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/edit/:id" element={<EditNote />} />
          </Route>
          <Route path="/note/:id" element={<Note />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Pages;
