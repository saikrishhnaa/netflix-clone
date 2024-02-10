function PageIndicator({
  pagesCount,
  currentPage,
  className,
}: {
  pagesCount: number;
  currentPage: number;
  className: string;
}) {
  return isFinite(pagesCount) ? (
    <ul
      className={`flex items-center justify-end gap-1 pr-4 opacity-0 transition-opacity duration-300 ease-in ${className}`}
    >
      {Array(pagesCount)
        .fill(0)
        .map((_page, index) => (
          <li
            className={`$ h-[2px] w-3 ${currentPage === index ? "bg-gray-100" : "bg-gray-600"}`}
            key={index}
          ></li>
        ))}
    </ul>
  ) : null;
}

export default PageIndicator;
