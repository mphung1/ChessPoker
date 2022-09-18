import './Hero.scss';
import background from './choker.jpg';

const Hero = ({title} : {title: string}) => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1 style={{fontSize: '50px'}}> {title} </h1>
      </div>
    </div>
  );
};

export default Hero;
