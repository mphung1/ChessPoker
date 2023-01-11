import React, { useState, useContext } from "react";
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
import { Link } from 'react-router-dom';
import { AuthContext } from "context/authContext";

export default function LogIn() {
  const { classes } = useStyles();

  const { login } = useContext(AuthContext);

  const [logInputs, setLogInputs] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setLogInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBoolChange = (e: React.ChangeEvent<any>) => {
    setLogInputs((prev) => ({ ...prev, rememberMe: !logInputs.rememberMe }));
  };

  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await login(logInputs);
      window.location.href = "/app"
    } catch (err: any) {
      alert(err.response.data)
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleLogin}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome back!
          </Title>

          <TextInput label="Email address" name="email" placeholder="hello@gmail.com" size="md"
            onChange={handleChange}
          />
          <PasswordInput label="Password" name="password" placeholder="Your password" mt="md" size="md"
            onChange={handleChange}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>

          <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Link to='/signup'>
              Register
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

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
