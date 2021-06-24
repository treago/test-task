import React, { useCallback, useState, useMemo } from 'react';
import { Typography, TextField, Grid, Button } from '@material-ui/core';

import { Paper } from '../../surfaces/Paper';
import { State } from '../../surfaces/State';
import { ProjectDetails } from '../ProjectDetails';
import { ProjectsChips } from '../ProjectsChips';
import { ProjectDetailsAdd } from '../ProjectDetailsAdd';
import { useForm, getValue } from '../../hooks/useForm';

export interface Project {
  key: string;
  value: string;
}

const UNITS_OPTIONS = [' ', 'year', 'month', 'day'];

const generateProjects = (values: string[]): Project[] => {
  const projects: Project[] = [];

  for (const value of values) {
    projects.push({
      key: Math.random().toString(),
      value,
    });
  }

  return projects;
};

export const UserProjectsForm = () => {
  const [projects, setProjects] = useState<Project[]>(
    generateProjects(['Bank', 'Tank', 'Sank']),
  );
  const [projectsDetailsIds, setProjectsDetailsIds] = useState<string[]>([]);
  const [showState, setShowState] = useState(false);

  const projectsOptions = useMemo(
    () => [' ', ...projects.map(({ value }) => value)],
    [projects],
  );

  const validations = useMemo(
    () => ({
      name: {
        required: {
          value: true,
        },
      },
    }),
    [],
  );

  const groupValidations = useMemo(
    () =>
      projectsDetailsIds.reduce(
        (acc, current) => ({
          ...acc,
          [current]: {
            project: {
              required: {
                value: true,
                message: 'Please select a project',
              },
            },
            details: {
              required: {
                value: true,
              },
            },
            duration: {
              required: {
                value: true,
              },
            },
            units: {
              required: {
                value: true,
              },
            },
          },
        }),
        {},
      ),
    [projectsDetailsIds],
  );

  const onSubmit = useCallback(() => {
    setShowState(true);
  }, []);

  const {
    values,
    errors,
    groupErrors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useForm({
    validations,
    groupValidations,
    onSubmit,
  });

  const handleCancel = useCallback(() => {
    setShowState(false);
  }, []);

  const handleAddProject = useCallback((value: string) => {
    setProjects((prev) => [...prev, ...generateProjects([value])]);
  }, []);

  const handleRemoveProject = useCallback((key: string) => {
    setProjects((prev) => prev.filter(({ key: k }) => k !== key));
  }, []);

  const handleAddProjectDetails = useCallback(() => {
    setProjectsDetailsIds((prev) => [...prev, Math.random().toString()]);
  }, []);

  const handleRemoveProjectDetails = useCallback(
    (key: string) => () => {
      setProjectsDetailsIds((prev) => prev.filter((k) => k !== key));
    },
    [],
  );

  return (
    <Paper variant="outlined" padding={3}>
      {showState ? (
        <State state={{ ...values, projects }} title="Form state" />
      ) : (
        <>
          <Typography variant="h5">User projects</Typography>
          <p>Name</p>
          <TextField
            name="name"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            error={!!errors?.name}
            helperText={errors?.name}
            defaultValue={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur}
          />

          <ProjectsChips
            projects={projects}
            onAdd={handleAddProject}
            onRemove={handleRemoveProject}
          />

          <ProjectDetailsAdd onAdd={handleAddProjectDetails} />

          {!!projectsDetailsIds.length && (
            <Grid container spacing={4} direction="column">
              {projectsDetailsIds.map((key) => (
                <Grid item key={key}>
                  <ProjectDetails
                    id={key}
                    details={getValue('details', values, key)}
                    project={
                      getValue('project', values, key) ?? projectsOptions[0]
                    }
                    projectsOptions={projectsOptions}
                    duration={getValue('duration', values, key)}
                    units={getValue('units', values, key) ?? UNITS_OPTIONS[0]}
                    unitsOptions={UNITS_OPTIONS}
                    groupErrors={groupErrors}
                    onChange={handleChange}
                    onClose={handleRemoveProjectDetails(key)}
                    onBlur={handleBlur}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      <Grid
        container
        spacing={3}
        justify={showState ? 'flex-start' : 'flex-end'}
      >
        {showState ? (
          <Grid item>
            <Button color="secondary" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default UserProjectsForm;
