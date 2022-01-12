import clsx from "clsx";
import { ButtonHTMLAttributes, useCallback } from "react";
import { rangeWithDots } from "../../utils";

type Props = {
  pageCount: number | null;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  className?: string;
};
const Pagination: React.FC<Props> = ({ pageCount = 0, currentPage, setCurrentPage, className }) => {
  const paginationData = rangeWithDots(pageCount ?? 0, currentPage, 7);

  const onPressPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const onPressNext = useCallback(() => {
    if (currentPage < (pageCount ?? 0)) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pageCount, setCurrentPage]);

  const onPressChangePage: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = useCallback(
    (event) => {
      setCurrentPage(Number(event.target.dataset.page));
    },
    [setCurrentPage]
  );

  return (
    <div className={clsx("flex items-center justify-center", className)}>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 text-gray-700">
            <button
              onClick={onPressPrevious}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 mr-1 rounded disabled:cursor-not-allowed cursor-pointer hover:bg-[#1A202C]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {paginationData.map((page, index) => {
              if (page === currentPage) {
                return (
                  <button
                    key={page}
                    className="items-center justify-center w-8 h-8 lg:w-12 lg:h-12 leading-5 transition duration-150 ease-in bg-[#1A202C] rounded cursor-not-allowed flex"
                    disabled
                  >
                    <span className="text-sm lg:text-base font-semibold text-magenta">{page}</span>
                  </button>
                );
              }
              // Page is not in range
              if (page === 0) {
                return (
                  <div
                    key={`${index}-dot`}
                    className="flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 leading-5 transition duration-150 ease-in rounded cursor-not-allowed"
                  >
                    <span className="text-sm lg:text-base font-semibold">...</span>
                  </div>
                );
              }
              return (
                <button
                  key={page}
                  data-page={page}
                  onClick={onPressChangePage}
                  className="items-center justify-center w-8 h-8 lg:w-12 lg:h-12 leading-5 transition duration-150 ease-in rounded cursor-pointer flex hover:bg-[#1A202C]"
                >
                  <span className="text-sm lg:text-base font-semibold pointer-events-none select-none">
                    {page}
                  </span>
                </button>
              );
            })}
            <button
              onClick={onPressNext}
              disabled={currentPage === pageCount}
              className="flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 ml-1 rounded cursor-pointer disabled:cursor-not-allowed hover:bg-[#1A202C]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
