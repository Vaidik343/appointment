import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {usePatient} from '../context/PatientContext';
import { AppBar, Button,Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const {patient, logoutPatient} = usePatient();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    {label: "Doctor", path:"/doctor"},
    {label: "Services", path: "/service"},
    {label: "Appointment", path: "/book-appointment"},
    {label: "Profile", path: '/patient-profile'},
  ];

  const drawer = (
    <Box sx={{ textAlign:'center'}}>
      <Typography>
        HealthCare System
      </Typography>
      <Divider />

      <List>
        {navItems.map( (item)=>(
          <ListItem
             key={item.path}
             component={Link}
             to={item.path}
             onClick={() => setMobileOpen(false)}
             selected={location.pathname === item.path}
             sx={{
              textAlign: "center",
              color: "text.primary",
              "&.Mui-selected":{ backgroundColor: "action.selected"},
             }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider />
        { patient ? (
            <Button
              startIcon={<LogoutOutlinedIcon />}
              color='error'
              onClick={() => {
                logoutPatient();
                setMobileOpen(false);
              }}
              sx={{m:1}}
            > Logout

            </Button>
          ) : (
            <Button
              startIcon={<LoginIcon />}
              color='primary'
              component={Link}
              to="/login"
              onClick={() => {
                setMobileOpen(false);
              }}
              sx={{m:1}}
            > Login

            </Button>
          )
        }

    </Box>
  )
  return (
    <div>
        <AppBar position='sticky' sx={{bgcolor: "primary.main"}}>
          <Toolbar>
            {/* mobile menu button */}


            <IconButton
              color='inherit'
              edge="start"
              onClick={handleDrawerToggle}
              sx={{display: {sm: "none"}, mr: 2}}
            >
              <MenuIcon />
            </IconButton>

            {/* home */}

            <Typography variant='h6'
              component={Link}
              to='/doctor'
              sx={{
                flexGrow: 1,
                color: "inherit",
                textDecoration: "none",
                fontWeight: "bold",
              }}

              >Home</Typography>

              {/* Desktop */}

              <Box sx={{
                display:{xs: "none", sm:"block"}
              }}>

                {navItems.map((item) => (
                  <Button 
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      mx:1,
                      textDecoration: "none",
                      borderBottom: location.pathname === item.path ? "2px solid white" : "2px solid transparent",

                    }}
                  >{item.label}</Button>
                ))}

                {patient ? (
                  <>
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    mr: 2,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {patient.name}
                </Typography>
                <Button
                  color="inherit"
                  startIcon={<LogoutOutlinedIcon />}
                  onClick={logoutPatient}
                >
                  Logout
                </Button>
              </>
                ) : (

                    <Button
                color="inherit"
                startIcon={<LoginIcon />}
                component={Link}
                to="/login"
              >
                Login
              </Button>
                )}

              </Box>
          </Toolbar>

        </AppBar>

        {/* mobile drawer */}
        <Drawer
        
         anchor="left"
         open={mobileOpen}
         onClose={handleDrawerToggle}
         ModalProps={{keepMounted: true}}
        >

          {drawer}
        </Drawer>
        
    </div>
  )
}

export default Navbar