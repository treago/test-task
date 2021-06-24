import React from 'react';
import { Container } from '@material-ui/core';

import UserProjectsForm from './components/UserProjects/UserProjectsForm';

import styles from './App.module.scss';

function App() {
  return (
    <Container className={styles.root} maxWidth="sm">
      <UserProjectsForm />
    </Container>
  );
}

export default App;
