import React from 'react';
import { Typography } from '@material-ui/core';

import styles from './State.module.scss';

export type StateProps<T extends {} = {}> = {
  state: T;

  title?: string;
  padding?: number | string;
};

export const State = ({ state, title }: StateProps) => (
  <>
    {title && <Typography variant="h5">{title}</Typography>}
    <pre className={styles.root}>
      <strong>state</strong> = {JSON.stringify(state, null, 2)}
    </pre>
  </>
);
