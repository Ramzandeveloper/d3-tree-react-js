import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import defaultArray from './convertedArray';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Grid, Select,Typography } from '@mui/material';
import './custom-tree.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export default function CenteredTree() {

  const [channel, setChannel] = useState('Retail');

  const channels = defaultArray.filter(item => item.name === channel)
  const debugData = [
    {
      name: "SALAM DMS",
      children: channels
    }

  ];
  const containerStyles = {
    width: "100%",
    height: "100vh"
  };

  const handleChange = (event) => {
    setChannel(event.target.value);
  };
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  })
  const treeContainer = useRef(null)
  useEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 3,
      y: dimensions.width / 3
    })
  }, []);
  const color = (nodeDatum) => {
    console.log('nodeDatum', nodeDatum)
    return nodeDatum.dealerType === "pos_shop" ? "#a9d5e8" : nodeDatum.dealerType === "distributor" || nodeDatum.dealerType === "sub_distributor" ? "#faddb1" : nodeDatum.name === "SALAM DMS" ? "#cdf7cd" : "#fac3c3";
  }

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle cx="5" cy="5" r="10" fill={color(nodeDatum)} />
      <text fill="black" strokeWidth="1" x="20" class="font">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.department && (
        <text fill="black" x="20" dy="20" strokeWidth="1">
          Department: {nodeDatum.attributes?.department}
        </text>
      )}
    </g>
  );
  return (

    <div style={containerStyles} ref={treeContainer} >
      <Grid container style={{ width: "300px !important", border: "1px solid", height: "100%", margin: "0", overflow: "hidden" }}>
        <Grid item xs={3} style={{ border: "1px solid" }}>
          <FormControl style={{margin: "30px 0px"}} >
            <InputLabel id="demo-simple-select-label">Select Channel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={channel}
              label="Select Channel"
              onChange={handleChange}
            >
              {defaultArray.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Typography variant="p" component="h3" style={{margin: "30px 0px"}}>
            Ledger
          </Typography>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert icon={false} severity="warning">Distributor</Alert>
            <Alert icon={false} severity="info">POS Shop</Alert>
            <Alert icon={false} severity="success">SALAM DMS</Alert>
            <Alert icon={false} severity="error">Channels Name</Alert>
          </Stack>
        </Grid>
        <Grid item xs={9} style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          <Tree
            data={debugData}
            translate={translate}
            orientation={"vertical"}
            renderCustomNodeElement={renderRectSvgNode}
          />

        </Grid>

      </Grid>
      {/* <Box sx={{ maxWidth: 300 }} style={{width:"30%"}}>
      <p align="left">Yellow</p>
    <p align="left">Blue</p>
    <p align="left">Black</p>
      </Box> */}
      {/* <div style={{width: "30%"}}>
      <p align="left">Yellow</p>
    <p align="left">Blue</p>
    <p align="left">Black</p>
      </div> */}
    </div>
  );
}
