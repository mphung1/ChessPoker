import Hero from 'components/Hero/Hero';
import background from './bg1.jpg';
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
