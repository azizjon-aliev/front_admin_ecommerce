import React from 'react';
// import loader from mui loader here
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
            <CircularProgress />
        </div>
    );
};

export default Loader;