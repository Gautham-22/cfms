import React, { useState } from 'react';
import {Card, CardContent, CardHeader, Chip, Stack, Typography, 
  Button, CardActionArea, CardActions, Divider, Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Post = ({openDonate}) => {
  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  const [tab, setTab] = useState("feed");

  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <Card sx={{ maxWidth: 325 }} style={{ boxShadow: "5px 5px 15px", margin: "30px" }}>
      <CardHeader
        title="Plant Monitoring System"
        subheader="Sep 24, 2020"
      />
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content.substring(0,100) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardContent>
      <Stack direction="row" spacing={1} style={{marginBottom: "10px"}}>
        <Chip label="Agriculture" />
        <Chip label="Education" variant="outlined" />
      </Stack>
      <PrettoSlider
        valueLabelDisplay='auto'
        aria-label="pretto slider"
        value={(10000*100)/40000}
        marks={[{value: (10000*100)/40000, label: '%'}]}
      />
      </CardContent>
      <CardActions style={{justifyContent: "space-between"}}>
        {tab === "donated" && <Button color="primary">Donated ₹5000</Button>}
        {tab === "feed" && 
          <Button size="small" color="primary" onClick={() => openDonate()}>
           ₹ Donate
          </Button>
        }
        <Button size="small" color="secondary">
            More
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;