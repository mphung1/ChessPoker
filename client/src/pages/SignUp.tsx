import React, { useState } from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import api from 'connections/api';

export default function SignUp() {
  const { classes } = useStyles();

  const [regInputs, setRegInputs] = useState({
   username: "",
   email: "",
   password: "",
 });

 console.log(regInputs);

 const handleChange = (e: React.ChangeEvent<any>) => {
   setRegInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const navigate = useNavigate();

 const handleSignup = async (e: React.ChangeEvent<any>) => {
   e.preventDefault();
   try {
     await api.post("/api/auth/signup", regInputs);
     navigate("/")
   } catch (err: any) {
     alert(err.response.data);
   }
 };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSignup}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome to Chessdeck!
          </Title>
          <TextInput label="Username" name="username" placeholder="Player1" size="md" mb="md" onChange={handleChange} />
          <TextInput label="Email address" name="email" placeholder="hello@gmail.com" size="md" onChange={handleChange} />
          <PasswordInput label="Password" name="password" placeholder="Your password" mt="md" size="md" onChange={handleChange} />
          <Button fullWidth mt="xl" size="md">
            Sign Up
          </Button>

          <Text align="center" mt="md">
            Already have an account?{' '}
            <Link to='/login'>
              Login
            </Link>
          </Text>
        </Paper>
      </form>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 700,
    backgroundSize: 'cover',
    backgroundImage:
      'url(' + require('../assets/theme.jpg') + ')',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
