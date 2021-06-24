import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

export type ProjectDetailsAddProps = {
  onAdd: () => void;
};

export const ProjectDetailsAdd = ({ onAdd }: ProjectDetailsAddProps) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item>
      <p>Projects Details</p>
    </Grid>
    <Grid item>
      <IconButton size="small" onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </Grid>
  </Grid>
);
