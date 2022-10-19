import './Hero.scss';

interface Props {
  children: any;
  background: string;
}

const Hero = ({ children, background }: Props) => {
  return (
    <div
      className="hero-image"
      style={{ backgroundImage: `url(${background})` }}
    >
      {children}
    </div>
  );
};

export default Hero;
