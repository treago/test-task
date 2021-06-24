import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { TextField, Grid, Chip } from '@material-ui/core';

import { Project } from '../UserProjectsForm/UserProjectsForm';

export type ProjectsChipsProps = {
  projects: Project[];
  onAdd: (value: string) => void;
  onRemove: (key: string) => void;
};

const ENTER_KEY = 'Enter';

export const ProjectsChips = ({
  projects,
  onAdd,
  onRemove,
}: ProjectsChipsProps) => {
  const [project, setProject] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  }, []);

  const handleAdd = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ENTER_KEY && project.trim()) {
        onAdd(project);
        setProject('');
      }
    },
    [project, onAdd],
  );

  const handleRemove = useCallback(
    (key: string) => () => {
      onRemove(key);
    },
    [project, onAdd],
  );

  return (
    <div>
      <p>Projects</p>
      <Grid container spacing={2} alignItems="center">
        {projects.map(({ key, value }) => (
          <Grid key={key} item>
            <Chip
              label={value}
              variant="outlined"
              onDelete={handleRemove(key)}
            />
          </Grid>
        ))}
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            color="primary"
            size="small"
            value={project}
            onChange={handleChange}
            onKeyDown={handleAdd}
          />
        </Grid>
      </Grid>
    </div>
  );
};
