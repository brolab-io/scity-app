import CardItem from "./CardItem";

type Props = {
  cards: unknown[];
};

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 lg:px-6 lg:gap-6 xl:px-8 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((_, index) => (
        <CardItem key={index} />
      ))}
    </div>
  );
};

export default CardList;
