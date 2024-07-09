import { StarIcon } from "@heroicons/react/24/solid";
interface Props {
    rating: number;
}
const RatingStar = (props: Props) => {
    const { rating } = props;
    return (
        <div className="flex my-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                    key={star}
                    className={`w-6 h-6 ${
                        star <= rating ? "text-yellow-300" : "text-gray-400"
                    }`}
                />
            ))}
        </div>
    );
};

export default RatingStar;
