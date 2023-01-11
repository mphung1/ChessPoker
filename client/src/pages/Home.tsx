import background from './bg1.jpg';
import Hero from 'components/Hero'
import { createStyles, Text } from '@mantine/core';

const Home = () => {
  const { classes, theme } = useStyles();
  return (
    <div>
        <Hero />
        <Text className={classes.footer}>
          © Made by MP
        </Text>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  }
}))

export default Home;
