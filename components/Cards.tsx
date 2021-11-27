import Card from "./Card";

const Cards: React.FC<{}> = () => {
  const cards = new Array(40).fill(0);
  return (
    <div className="grid grid-cols-2 gap-y-8 gap-x-6 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default Cards;
