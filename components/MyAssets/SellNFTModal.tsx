import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import {
  forwardRef,
  useCallback,
  useState,
  useImperativeHandle,
  ForwardedRef,
  useMemo,
} from "react";
import Modal from "../Common/Modal";
import SvgChevronDown from "../Icons/SvgChevronDown";
import MarketPlaceRules from "../MarketPlace/Rules";
import { Disclosure, Transition } from "@headlessui/react";
import { ContractTypes, getContractConfig } from "../../dapp/config";
import { useEtherContext } from "../EtherContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SellNFTModalRef = {
  openModal: (nft: NFT) => void;
};
type Props = {};

const bgStyle = {
  background: "radial-gradient(50% 50% at 50% 50%, #833EF1 0%, #491CB5 100%)",
};

const SellNFTModal = (_: Props, ref: ForwardedRef<SellNFTModalRef>) => {
  const [nft, setNFT] = useState<NFT | null>(null);
  const { getContract } = useEtherContext();

  const schema = useMemo(() => {
    return yup
      .object({
        price: yup.string().required(),
      })
      .required();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onClose = useCallback(() => {
    setNFT(null);
  }, []);

  const openModal: SellNFTModalRef["openModal"] = useCallback((_nft) => {
    setNFT(_nft);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      openModal,
    }),
    [openModal]
  );

  const onSubmit = handleSubmit(async (data) => {
    const { contractAddress } = getContractConfig().LAND;
    const contract = getContract(ContractTypes.MARKET);
    console.log("nft", nft);
    try {
      // contract.placeItemOnSale(contractAddress, nft.id, nft.price);
    } catch (error) {}
  });

  return (
    <Modal className="w-[480px] max-w-full" isOpen={nft !== null} onClose={onClose}>
      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-white font-[24px]">
        Sell NFT
      </Dialog.Title>
      <form onSubmit={onSubmit} className="py-1 mt-4 space-y-4">
        <div
          style={bgStyle}
          className="relative aspect-[347/369] rounded-[16px] w-[369px] max-w-full mx-auto items-center flex justify-center"
        >
          {nft && (
            <Image
              quality={100}
              className="absolute"
              alt=""
              src={nft.image}
              height={242}
              width={177}
            />
          )}
        </div>
        <h2 className="text-center text-[32px] font-semibold text-white leading-10">
          #123 Transport
        </h2>
        <div className="relative">
          <input
            placeholder="Please enter selling price"
            className="w-full input input-rounded bg-[#2D3748] text-white placeholder:text-[#718096] text-[16px]"
            autoComplete="off"
            {...register("price")}
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0AEC0] text-[16px]">
            ~ $123
          </span>
        </div>
        <button
          type="submit"
          className="w-full transition-all duration-300 ease-in-out rounded button button-magenta button-rounded"
        >
          <span className="text-[12px] md:text-[14px] lg:text-[16px]">Approve</span>
        </button>
        <div className="pt-2 space-y-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full">
                  <div className="flex items-center self-center justify-center space-x-3">
                    <span className="text-white font-[16px] font-medium">Market Rules</span>
                    <SvgChevronDown
                      className={clsx(
                        "w-4 h-4 transition-transform duration-150",
                        open && "rotate-180"
                      )}
                    />
                  </div>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform opacity-0 height-0"
                  enterTo="transform opacity-300 height-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel>
                    <MarketPlaceRules />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </form>
    </Modal>
  );
};

export default forwardRef<SellNFTModalRef>(SellNFTModal);
