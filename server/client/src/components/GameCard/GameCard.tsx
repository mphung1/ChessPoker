import './GameCard.scss';

interface Props {
  gameMode: string;
  description: string;
  onClickJoin: any;
  onClickCreate: any;
  rating: number;
}

const GameCard = ({ gameMode, description, onClickJoin, onClickCreate, rating }: Props) => {
  return (
    <div className="wrapper">
      <div className="overview-info">
        <div className="mode-info">
          <div className="grouptext">
            <h3>Your rating</h3>
            <p>{rating}</p>
          </div>
          <div className="image">
            <img
              src="https://i.imgur.com/ckSgzLQ.png"
              alt="ps5 controller"
            />
          </div>
        </div>
      </div>

      <div className="mode-specifications">
        <h1> {gameMode} </h1>
        <p> {description} </p>

        <div className="button-group">
          <button className="single-button" onClick={onClickJoin}>
            <p>Join Room</p>
            <div className="buttonaction">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>

          <button className="single-button" onClick={onClickCreate}>
            <p>Create Room</p>
            <div className="buttonaction">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0677 11.9929L18.818 7.75739L17.4061 9.17398L19.2415 11.0032L0.932469 11.0012L0.932251 13.0012L19.2369 13.0032L17.4155 14.8308L18.8321 16.2426L23.0677 11.9929Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
