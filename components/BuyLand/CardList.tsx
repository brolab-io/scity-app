import Card from "./CardItem";

const Cards: React.FC<{}> = () => {
  const cards = new Array(20).fill(0);
  return (
    <div className="grid grid-cols-2 gap-4 p-4 lg:p-6 lg:gap-6 xl:p-8 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default Cards;
