import React, { PropsWithChildren } from 'react';
import cls from 'classnames';
import { IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import styles from './Group.module.scss';

export type GroupVariant = 'default' | 'outlined' | 'dashed';

export type GroupProps = PropsWithChildren<{
  variant: GroupVariant;

  onClose?: () => void;
}>;

export const Group = ({ variant, children, onClose }: GroupProps) => (
  <div className={cls(styles.root, styles[`root--${variant}`])}>
    {onClose && (
      <IconButton size="small" className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    )}

    {children}
  </div>
);
