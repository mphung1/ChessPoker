import Hero from 'components/Hero/Hero';
import background from './background1.jpg';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/Rules';
    navigate(path);
  };
  return (
    <div>
      <Hero background={background}>
        <div className="center">
          <h1> Welcome </h1>
          <h3> This game is a variation of chess and poker. </h3>
          <button
            className="btn home-btn"
            onClick={routeChange}
          >
            Learn the rules
          </button>
        </div>
        <div className="footer">
          <p>© Made by MP</p>
        </div>
      </Hero>
    </div>
  );
};

export default Home;
