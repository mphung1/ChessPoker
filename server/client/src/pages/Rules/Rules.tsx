import Hero from 'components/Hero/Hero';
import background from './bg2.jpeg';
import './Rules.scss'

const Rules = () => {
  return (
    <div>
      <Hero background={background}>
        <div className='section-wrapper'>
          <div className='section-content'>
            <div className='bughouse'>
              <h1> Bughouse </h1>
              <p> The guide on how this game mode works can be found {""}
                <a href='https://www.chess.com/terms/bughouse-chess'>
                <span>here.</span>
                </a>
              </p>
            </div>

            <div className='chesspoker'>
              <h1> Chess Poker </h1>
              <p style={{fontStyle: 'italic'}}> (To be updated) </p>
            </div>

          </div>
        </div>
      </Hero>
    </div>
  );
};

export default Rules;
