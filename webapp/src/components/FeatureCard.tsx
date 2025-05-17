interface Props {
  title: string;
  image: string;
}

const FeatureCard = ({ title, image }: Props) => {
  return (
    <div className="group h-[400px] space-y-16 rounded-lg bg-white px-12 py-8 shadow hover:bg-blue-500">
      <img src={image} className="h-52 object-cover" alt={title} />
      <h3 className="font-poppins text-center text-2xl font-bold text-gray-900 group-hover:text-white">
        {title}
      </h3>
    </div>
  );
};

export default FeatureCard;
