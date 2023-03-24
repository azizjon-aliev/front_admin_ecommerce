import {Link} from "react-router-dom";
import { Close, Menu } from '@mui/icons-material';
import {
  AppBar,
  Box, Button, Dialog, Hidden, IconButton, Slide, Toolbar, Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { privateRouter } from "../constants/api.router";

export type NavigationProps = {
  isSmall: boolean;
};


const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function Navigation({ isSmall }: NavigationProps) {
  const [ open, setOpen ] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = (
    privateRouter.map(({ path, title }) => {
      return (
        <div key={path}
        style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
        <Link to={path} className="link" style={
            {
                color: 'black',
                textDecoration: 'none',
                padding: '10px 20px',
                marginBottom: '20px',
            }    
            }>
          <Button color="inherit" size="large" fullWidth={isSmall} onClick={onCloseHandler}>
          {title}
          </Button>
        </Link>
        </div>
      );
    })
  );

  return (
    <>
      <Hidden smDown>
        <Box display="flex" gap={2}>
          {mappedItems}
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
          PaperProps={{
            sx: {
              boxShadow: 'none',
            },
          }}
        >
          <AppBar position="static" sx={{ background: 'white', color: 'text.primary' }}>
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Меню
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" flexDirection="column" py={3} width="100%">
            {mappedItems}
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};