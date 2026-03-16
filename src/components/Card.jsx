import { useNavigate } from 'react-router';
import './Card.css'

function Card({ data, type }) {
  const navigate = useNavigate();
  const config = {
    league: {
      imageField: 'image',
      titleField: 'name',
      countryField: 'area',
      navigatePath: `./calendar/${data.id}`,
      state: { leagueName: data.name }
    },
    team: {
      imageField: 'image',
      titleField: 'name',
      navigatePath: `/calendar/teams/${data.id}`,
      state: { teamName: data.name }
    }
  }[type];

  const handleClick = () => {
    navigate(config.navigatePath, {
      state: config.state
    });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img 
        src={data[config.imageField]} 
      />
      <h1>{data[config.titleField]}</h1>
      {config.countryField && <p>{data[config.countryField]}</p>}
    </div>
  );
}

export default Card;