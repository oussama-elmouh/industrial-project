interface Props {
  title: string;
  image: string;
}

const FeatureCard = ({ title, image }: Props) => {
  return (
    <div className="group flex h-80 flex-col justify-between rounded-lg bg-white px-12 py-8 shadow hover:bg-blue-500">
      <img src={image} className="mx-auto h-40 object-cover" alt={title} />
      <h3 className="font-poppins mx-auto w-64 text-center text-2xl font-bold text-gray-900 group-hover:text-white">
        {title}
      </h3>
    </div>
  );
};

export default FeatureCard;
