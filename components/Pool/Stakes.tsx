import PoolStake from "./Stake";

const PoolStakes = () => {
  return (
    <div className="grid gap-responsive lg:grid-cols-2">
      <PoolStake />
      <PoolStake />
    </div>
  );
};

export default PoolStakes;
