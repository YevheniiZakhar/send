import { Container, Typography } from '@mui/material';
import React, { useEffect, useState }from 'react';
import AddOrUpdateAd from '../Add/AddOrUpdateAd'
import axios from "axios";

export default function Profile() {

  const [ad, setAd] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {

      const data = await axios.get(process.env.REACT_APP_SERVER_URL+`ad/getbyid?id=${652}`);
      console.log(data);
      data.data.price = data.data.price.toString();

      setAd(data.data);
    }
    fetchData();
  }, [])
  return (
    <Container>
      <Typography>My Profile</Typography>
      {ad !== undefined && <AddOrUpdateAd defaultValue={ad} />}
    </Container>
  )
}