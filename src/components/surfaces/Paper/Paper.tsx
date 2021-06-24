import React, { PropsWithChildren } from 'react';
import {
  Paper as MuiPaper,
  PaperProps as MuiPaperProps,
  Box,
} from '@material-ui/core';

export type PaperProps = MuiPaperProps &
  PropsWithChildren<{
    padding?: number | string;
  }>;

export const Paper = ({ children, padding = 0, ...rest }: PaperProps) => (
  <MuiPaper {...rest}>
    <Box padding={padding}>{children}</Box>
  </MuiPaper>
);
