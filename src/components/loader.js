import React from 'react';
import { Box, Typography, CircularProgress } from "@mui/material";

const Loader = ({ text }) => {
    return (
        <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem'}}>
            <Typography variant='caption' sx={{fontSize: '1rem' }} gutterBottom>
                {text ? text : 'Завантаження. Будь ласка, почекайте...'}
            </Typography>
            <CircularProgress />
        </Box>
    );
}

export default Loader;