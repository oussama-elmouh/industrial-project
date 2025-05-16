interface Props {
  title: string;
  image: string;
}

const FeatureCard = ({ title, image }: Props) => {
  return (
    <div className="h-80 flex flex-col justify-between group rounded-lg bg-white px-12 py-8 shadow hover:bg-blue-500">
      <img src={image} className="h-40 object-cover mx-auto" alt={title} />
      <h3 className="w-64 mx-auto font-poppins text-center text-2xl font-bold text-gray-900 group-hover:text-white">
        {title}
      </h3>
    </div>
  );
};

export default FeatureCard;
