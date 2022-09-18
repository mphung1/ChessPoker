import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

interface GameCardProps {
  title: string,
  subtitle: string,
  description: string,
  option1: string,
  option2: string,
  link1: string,
  link2: string,
}

const GameCard = ({title, subtitle, description, option1, option2, link1, link2} : GameCardProps) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Link href={link1}>{option1}</Card.Link>
        <Card.Link href={link2}>{option2}</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default GameCard;
