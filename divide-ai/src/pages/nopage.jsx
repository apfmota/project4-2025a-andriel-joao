import React from 'react'
import { Box, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'
const NoPage = () => {
  return (
    <Box sx={{
      height: "100vh",
      display: "grid",
      textAlign: "center",
      justifyContent: "center",
    }}>
      <Box sx={{mt: 50, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)', height: 200, width: 300}}>
        <Error sx={{color: '#006bff', fontSize: 64}}/>
        <Typography variant="h6" fontSize={32} fontFamily={"'Jersey 15'"} color='#006bff'>
          Xiii! Algo deu errado,<br/> tenta de novo.
        </Typography>
      </Box>
      
    </Box>
  )
}

export default NoPage