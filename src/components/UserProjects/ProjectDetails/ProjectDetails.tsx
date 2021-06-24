import React, { memo } from 'react';
import { TextField, InputLabel, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { Group } from '../../surfaces/Group';
import { FieldChangeHandler } from '../../hooks/useForm';

export type ProjectDetailsProps = {
  id: string;
  projectsOptions: string[];
  unitsOptions: string[];
  onChange: FieldChangeHandler;
  onClose: () => void;
  onBlur: () => void;

  project?: string;
  details?: string;
  duration?: string;
  units?: string;
  groupErrors?: Record<string, Partial<Record<string, string>>>;
};

export const ProjectDetails = memo(
  ({
    id,
    project,
    details,
    duration,
    units,
    projectsOptions,
    unitsOptions,
    groupErrors,
    onChange,
    onClose,
    onBlur,
  }: ProjectDetailsProps) => (
    <Group variant="dashed" onClose={onClose}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <InputLabel>Project</InputLabel>
        </Grid>
        <Grid item xs={12} md={9}>
          <Autocomplete
            defaultValue={project}
            value={project}
            inputValue={project}
            options={projectsOptions}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                name="project"
                variant="outlined"
                error={!!(groupErrors || {})[id]?.project}
                helperText={(groupErrors || {})[id]?.project}
              />
            )}
            onChange={onChange('project', id) as any}
            onInputChange={onChange('project', id) as any}
            onBlur={onBlur}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <InputLabel>Details</InputLabel>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            name="details"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            size="small"
            defaultValue={details}
            error={!!(groupErrors || {})[id]?.details}
            helperText={(groupErrors || {})[id]?.details}
            onChange={onChange('details', id)}
            onBlur={onBlur}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <InputLabel>Duration</InputLabel>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="duration"
                variant="outlined"
                size="small"
                defaultValue={duration}
                error={!!(groupErrors || {})[id]?.duration}
                helperText={(groupErrors || {})[id]?.duration}
                onChange={onChange('duration', id)}
                onBlur={onBlur}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                defaultValue={units}
                value={units}
                inputValue={units}
                options={unitsOptions}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="units"
                    variant="outlined"
                    error={!!(groupErrors || {})[id]?.units}
                    helperText={(groupErrors || {})[id]?.units}
                  />
                )}
                onChange={onChange('units', id) as any}
                onInputChange={onChange('units', id) as any}
                onBlur={onBlur}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Group>
  ),
);
