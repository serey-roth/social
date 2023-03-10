import { Box } from '@chakra-ui/layout';
import React, { ReactNode } from 'react'

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
    variant?: WrapperVariant,
    children?: ReactNode,
}

const Wrapper: React.FC<WrapperProps> = ({ 
    children, 
    variant='regular' 
}) => {
    return (
        <Box 
        position='relative'
        px={3}
        mt={[4, 8]} 
        mx='auto'
        maxW={variant === 'regular' ? "800px" : "400px"} 
        w="100%">
            {children}
        </Box>
    );
}

export default Wrapper;