import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UpdateBasicInfo from './UpdateBasicInfo';
import UploadDoc from './UploadDoc';
import Appereance from './Appereance';
import { appereancecontext } from '../context/Appereancestate';
import DepInfo from './DepInfo';
import { studentcontext } from '../context/StudentState';
// import { studentcontext } from '../context/StudentState';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
           {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const Settings = () => {

  const [value, setValue] = React.useState(0);
  const {bgcolor} = useContext(appereancecontext)
  // const {fetchThisStudent} = useContext(studentcontext)

  const {fetchdepbystid,thisStudent,fetchThisStudent} = useContext(studentcontext)


    const fetchbystid = async ()=>{
        await fetchdepbystid(thisStudent._id)
    }
    useEffect(()=>{
        fetchThisStudent();
        fetchbystid();
    },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box component="main" sx={{ flexGrow: 1}}>
      <DrawerHeader style={{backgroundColor:bgcolor}}/>
        <div className='d-sm-flex d-md-none'>
          <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider'}}>
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Update Basic Info" {...a11yProps(0)} />
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Fill Dependant's Info" {...a11yProps(1)} />
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Upload Documents" {...a11yProps(2)} />
            <Tab sx={{alignItems:'end' ,textAlign:"end"}}  label="Change Appereance" {...a11yProps(3)} />
          </Tabs>
        </div>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',px:10 }}>
        <div className='d-none d-md-flex my-4'>
          <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider',}} >
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Update Basic Info" {...a11yProps(0)} />
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Fill Dependant's Info" {...a11yProps(1)} />
            <Tab sx={{alignItems:'end',textAlign:"end"}}  label="Upload Documents" {...a11yProps(2)} />
            <Tab sx={{alignItems:'end' ,textAlign:"end"}}  label="Change Appereance" {...a11yProps(3)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0} style={{width:"100%",justifyContent:"center"}}>
            <UpdateBasicInfo/>  
        </TabPanel>
        <TabPanel value={value} index={1} style={{width:"100%"}}>
            <DepInfo/>  
        </TabPanel>
        <TabPanel value={value} index={2} style={{width:"100%"}}>
            <UploadDoc/>  
        </TabPanel>
        <TabPanel value={value} index={3} style={{width:"100%"}}>
             <Appereance/>
        </TabPanel>

      </Box>
    </Box>
    </>
  )
}

export default Settings
