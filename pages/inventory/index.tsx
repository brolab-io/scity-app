import { NextPage } from "next";
import { useEffect, useState } from "react";
import BoxList from "../../components/BuyBox/BoxList";
import CardList from "../../components/BuyLand/CardList";
import CompanyList from "../../components/Common/CompanyList";
import InventoryPageBanner from "../../components/Inventory/Banner";
import InventoryFilter from "../../components/Inventory/Filter";
import Container from "../../components/UI/Container";
import useBalance from "../../hooks/useBalance";
import useCompanies from "../../hooks/useCompanies";
import useOpenBox from "../../hooks/useOpenBox";

const filters = {
  land: {},
  company: {},
  box: {},
};

const sortBys = {
  topRate: {},
  midRate: {},
  lowRate: {},
};

const InventoryPage: NextPage = () => {
  const { openBox, cardURI, isLoading, totalBoxes } = useOpenBox();
  const { balance } = useBalance();

  const [filter, setFilter] = useState<keyof typeof filters>(
    (Object.keys(filters) as Array<keyof typeof filters>)[0]
  );
  const [sortBy, setSortBy] = useState<keyof typeof sortBys>(
    (Object.keys(filters) as Array<keyof typeof sortBys>)[0]
  );

  const { companies } = useCompanies();

  useEffect(() => {
    // openBox();
  }, [openBox]);

  return (
    <div className="pt-20 bg-black">
      <InventoryPageBanner />

      <div className="py-10">
        <InventoryFilter
          filter={filter}
          sortBy={sortBy}
          setFilter={setFilter}
          setSortBy={setSortBy}
          filters={filters}
          sortBys={sortBys}
        />
        {/*  LIST OF AVAILABLE CARDS CAN BE RECEIVED!  */}
        <Container className="space-y-4 lg:space-y-6 xl:space-y-8">
          {filter === "box" && (
            <BoxList
              openBox={openBox}
              boxes={new Array(Number(totalBoxes)).fill(0)}
            />
          )}
          {filter === "land" && (
            <CardList cards={new Array(Number(balance)).fill(0)} />
          )}
          {filter === "company" && <CompanyList companies={companies} />}
        </Container>
      </div>
    </div>
  );
};

export default InventoryPage;
