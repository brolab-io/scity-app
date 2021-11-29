import Card from "./Card";

const Cards: React.FC<{}> = () => {
  const cards = new Array(40).fill(0);
  return (
    <div className="grid grid-cols-2 p-4 gap-4 lg:p-6 lg:gap-6  xl:p-8 xl:gap-10 md:grid-cols-3 xl:grid-cols-4">
      {cards.map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default Cards;
