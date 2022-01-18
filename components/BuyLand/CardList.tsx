import NFTCard from "../Common/NFTCard";

type Props = {
  cards: unknown[];
};

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <div className="grid gap-responsive sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((_, index) => (
        <NFTCard supply key={index} />
      ))}
    </div>
  );
};

export default CardList;
