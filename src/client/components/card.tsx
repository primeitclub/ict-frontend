import { Calendar, Clock, MapPin, Banknote, ChevronRight } from "lucide-react";
import type { ContentType } from "../pages/home/sections/highlight-section/types";

interface CardProps {
  item: ContentType;
}

const Card = ({ item }: CardProps) => {
  return (
    <div className=" rounded-3xl bg-[#FEFEFE] p-4 group h-full font-sans w-[320px] mx-auto sm:w-auto">
      <div className="relative h-[180px] md:h-[155px] w-full rounded-2xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#970B0B] text-[10px] font-bold px-2.5 py-1 rounded-md text-white shadow-lg">
          {item.seats} / {item.totalSeats} Seats
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-[20px] font-semibold mb-1">{item.title}</h3>
        <p className="text-[12px] mb-2">{item.speaker}</p>

        <div className="flex -space-x-3 mb-6">
          {item.avatar.map((av, i) => (
            <div
              key={i}
              className={`${i == 0 ? "bg-[#2dDBDB] rounded-full" : "bg-[#1CCECE] rounded-full"}`}
            >
              <img src={av} alt="Speaker" className="w-8 h-8 rounded-full " />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2  mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 " />
            <span className="text-[12px] font-medium">{item.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4  text-[#10B981] " />
            <span className="text-[#10B981] text-[12px] font-medium">
              Rs. {item.price}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4  " />
            <span className="text-[12px] font-medium">{item.time}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <MapPin className="w-4 h-4  " />
            <span className="text-[12px] font-medium">{item.place}</span>
          </div>
        </div>

        <button
          className="w-full bg-[#3571F0] hover:bg-blue-700 text-white py-1.5 rounded-full 
                    font-bold flex items-center justify-center transition-colors group"
        >
          Register Now
          <ChevronRight
            className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
            strokeWidth={4}
          />
        </button>
      </div>
    </div>
  );
};
export default Card;
