import Hero from 'components/Hero/Hero';
import './Leaderboard.scss';
import background from './background3.jpg';

const Leaderboard = () => {
  return (
    <div>
      <Hero background={background}>
        <div> Leaderboard</div>
        <div className="container">
          <div className="leaderboard">
            <div className="head">
              <i className="fas fa-crown"></i>
              <h1>Highest-rated Players</h1>
            </div>
            <div className="body">
              <ol>
                <li>
                  <mark>Minh Phung</mark>
                  <small>2000</small>
                </li>
                <li>
                  <mark>User 2</mark>
                  <small>1500</small>
                </li>
                <li>
                  <mark>User 3</mark>
                  <small>1500</small>
                </li>
                <li>
                  <mark>User 4</mark>
                  <small>1500</small>
                </li>
                <li>
                  <mark>User 5</mark>
                  <small>1500</small>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Hero>
    </div>
  );
};

export default Leaderboard;
