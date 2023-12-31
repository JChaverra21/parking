/* eslint-disable react/prop-types */
import { Image, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { formaterDate } from "./formaterDate";
export const CellMotorcycle = ({ item }) => {
  const { userRegister } = useContext(UserContext);
  const [dataVehicle, setDataVehicle] = useState({});
  const { vehicle } = item;

  useEffect(() => {
    if (vehicle !== "") {
      const user = userRegister.find((user) => user.vehiclesPlates.some((item) => item.plate === vehicle));

      if (user) {
        setDataVehicle({ owner: user.idUser, vehicle: user.vehiclesPlates.find((item) => item.plate === vehicle) });
      }
    }
  }, [vehicle, userRegister]);

  console.log("dataVehiclestate", dataVehicle);
  return (
    <div className="w-24 h-60 border border-x-5 text-white border-t-0 mb-8  border-b-0 border-white flex justify-center items-center ">
      {item.empty ? (
        <h1 className="">{item.cell}</h1>
      ) : (
        <div className="flex flex-col text-center">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Image
                src="/src/assets/motico.png"
                className="cursor-pointer   hover:scale-110"
                width="1200"
                height="200"
                alt="icono"
              />
            </PopoverTrigger>
            <PopoverContent className="text-center mt-4">
              {dataVehicle.vehicle ? (
                <div className=" py-2  text-left">
                  <p>
                    <span className="font-semibold">Cilindraje: </span>
                    {dataVehicle.vehicle.modelCylinder}
                  </p>
                  <p>
                    <span className="font-semibold">Marca: </span>
                    {dataVehicle.vehicle.brand}
                  </p>
                  <p>
                    <span className="font-semibold">Dueño:</span>
                    {dataVehicle.owner}
                  </p>
                  <p>
                    <span className="font-semibold">Hora de entrada: </span>
                    {item.date ? formaterDate(item.date) : "Sin registro"}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </PopoverContent>
          </Popover>

          <h1 className="">{item.vehicle}</h1>
        </div>
      )}
    </div>
  );
};
