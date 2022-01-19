import NFTCard, { CardBasicInfo, CardPriceInfo } from "../Common/NFTCard";

type Props = {
  cards: unknown[];
};

const testMetadata: LandNFT = {
  attributes: [
    {
      trait_type: "name",
      value: "Hong Kong #1",
    },
    {
      trait_type: "city",
      value: "Hong Kong",
    },
    {
      trait_type: "location",
      value: "0,0",
    },
    {
      trait_type: "rare",
      value: "SR",
    },
    {
      trait_type: "miningPower",
      value: 16,
    },
    {
      trait_type: "miningEfficiency",
      value: 147,
    },
  ],
  hash: "e7c18cf2367345753b3be8a3ef112907a97c30053239d0cace4b048d5dfb6e39",
  name: "Hong Kong #1",
  description: null,
  ownerAddress: "0x0",
  image: "https://res.cloudinary.com/dcrbaasbt/image/upload/v1637838193/Group_329_ufuao2.png",
};

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <div className="grid gap-responsive sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((_, index) => (
        <NFTCard
          key={index}
          CardHeader={<></>}
          CardFooter={
            <>
              <CardBasicInfo title="Probability" value="6.5%" />
              <CardBasicInfo title="Supply" value="478" />
              <CardBasicInfo title="Hashrate" value="x1000" />
            </>
          }
          metadata={testMetadata}
        />
      ))}
    </div>
  );
};

export default CardList;
