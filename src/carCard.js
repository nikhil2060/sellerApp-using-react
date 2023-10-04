import "./carCard.css";
import {
  Users,
  GasPump,
  Gauge,
  SteeringWheel,
  Heart,
} from "@phosphor-icons/react";

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.photo} alt="camry" className="car-image" />
      <div className="car-details">
        <p className="car-title">{car.car_name}</p>
        <div className="car-att">
          <CarInfo
            icon={<Users size={29} color="#189cf4" />}
            value={`${car.seating_cap} People`}
          />
          <CarInfo
            icon={<GasPump size={29} color="#189cf4" />}
            value={car.fuel_type}
          />
          <CarInfo
            icon={<Gauge size={29} color="#189cf4" />}
            value={`${car.mileage} KM/L`}
          />
          <CarInfo
            icon={<SteeringWheel size={29} color="#189cf4" />}
            value={car.transmission}
          />
        </div>
        <div className="price-box">
          <p className="rent">
            $ {+car.rent_price * 15}
            <span> / month</span>
          </p>
          <div className="btns">
            <button className="btn-like">
              <Heart size={20} color="#189cf4" />
            </button>
            <button className="btn-rent">Rent Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarInfo({ icon, value }) {
  return (
    <span className="car-people">
      {icon}
      <span>{value}</span>
    </span>
  );
}
