const SectionTitle = ({
  title,
  subtitle,
  desc,
}: {
  title: string;
  subtitle: string;
  desc: string;
}) => {
  return (
    <div className="mb-8 text-center">
      {title && (
        <h3 className="text-[#357fdf] mb-2 font-roboto  dark:text-gray-300  flex items-center justify-center font-medium uppercase tracking-wider">
          {title}
        </h3>
      )}
      {subtitle && (
        <h2 className="block w-full bg-clip-text mb-1 font-bold text-3xl sm:text-4xl dark:text-gray-300 transition-colors duration-500">
          {subtitle}
        </h2>
      )}
      {desc && (
        <p className="mx-auto w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-500">
          {desc}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
