import React, { useState } from 'react';
import {Card, CardContent, CardHeader, Chip, Stack, Typography, 
  Button, CardActionArea, CardActions, Divider, Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import dateFormat from "dateformat";

const Post = ({openDonate, post, setIsView, setPostId, id, tab, setDonateTo}) => {
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

  console.log({post});
  const handleView = () => {
    setIsView(true);
    setPostId(id);
  }

  return (
    <Card sx={{ minHeight:360, width: 325 }} style={{ boxShadow: "5px 5px 15px", margin: "30px" }}>
      <CardHeader
        title={post.title}
        subheader={dateFormat(new Date(post.date_created), "dddd, mmmm dS, yyyy")}
      />
      <CardActionArea onClick={handleView}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description.substring(0,100) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardContent>
      <Stack direction="row" spacing={1} style={{marginBottom: "10px"}}>
        {post.category ? <Chip label={post.category} /> : <Chip label="other" />}
      </Stack>
      <PrettoSlider
        valueLabelDisplay='auto'
        aria-label="pretto slider"
        value={Math.round((post.fund_raised * 100 /post.expected_fund) * 100) / 100}
        marks={[{value: Math.round((post.fund_raised * 100 / post.expected_fund) * 100) / 100, label: '%'}]}
      />
      </CardContent>
      <CardActions style={{justifyContent: "space-between"}}>
        {tab === "donated" && <Button color="primary">Donated ₹{post.amount}</Button>}
        {tab === "feed" && 
          <Button size="small" color="primary" onClick={() => {setDonateTo(id); openDonate();}}>
           ₹ Donate
          </Button>
        }
        {tab === "created" && (post.verified === "yes" 
          ? <Typography variant='button' style={{color: '#2e7d32', marginLeft: '8px'}}>verified</Typography>
          : <Typography variant='button' style={{color: 'rgb(244, 67, 54)', marginLeft: '8px'}}>not verified</Typography>
        )}
        <Button size="small" color="secondary" onClick={handleView}>
            More
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;