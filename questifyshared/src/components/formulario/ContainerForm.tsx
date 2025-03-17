import { Tooltip } from '@mui/material';
import React from 'react';
import styles from '../Wrapper';

interface ContainerFormProps{
    children: React.ReactNode
}

const ContainerForm: React.FC<ContainerFormProps> = ({children}) => {
    return (
        
        <div className={`${styles.wrapper} ${styles.size} flex-1 flex-col p-8 m-8 h-11/12`}>
            {children}
        </div>
    );
};
  
export default ContainerForm;