import { createContext, useState } from 'react';

import { carBrand, carModel, motorcycleBrand, motorcycleCylinder } from "../data/Vehicle";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [users] = useState([
        { username: 'daniel', password: '9999' },
        { username: 'jose', password: '7777' }
    ]);

    //Nuevo estado para el usuario logueado
    const [user, setUser] = useState(null);

    //Registro de usuarios
    const [selectedVehicleType, setSelectedVehicleType] = useState("");
    const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([]);
    const [brandChange, setBrandChange] = useState([]);
    const [plate, setPlate] = useState("");
    const [error, setError] = useState(false);

    //Estados para almacenar los datos del brand y model
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");

    const handlerSelectModel = (e) => {
        setModel(e.target.innerText);
    };

    const handlerSelectBrand = (e) => {
        setBrand(e.target.innerText);
    };

    const handlerPlateChange = (e) => {
        setPlate(e.target.value);
    };

    //identificacion de la persona
    const [idUser, setIdUser] = useState("");

    const handlerIdUserChange = (e) => {
        setIdUser(e.target.value);
    };

    //Autocomplete dinamico para el modelo y marca
    const handlerSelectVehicle = (e) => {
        setSelectedVehicleType(e.target.innerText);
        console.log(e.target.innerText);

        if (e.target.innerText === "car") {
            setSecondAutocompleteOptions(carModel);
            setBrandChange(carBrand);
        } else if (e.target.innerText === "motorcycle") {
            setSecondAutocompleteOptions(motorcycleCylinder);
            setBrandChange(motorcycleBrand);
        }
    };

    //Crea el estado para almacenar los registros
    const [userRegister, setUserRegister] = useState([]);

    // Funcion para registrar los datos
    const handlerRegister = () => {

        console.log("Registros", userRegister)

        //Verifica si algun campo requerido esta vacio
        if (!idUser || !selectedVehicleType || !plate || !model || !brand) {
            setError(true);
            return;
        }

        //Verifica si el usuario ya existe
        const userExist = userRegister.find((user) => user.idUser === idUser);

        //Verifica si la placa ya existe
        const plateExist = userRegister.some((user) => user.vehiclesPlates.some((vehicle) => vehicle.plate === plate));

        if (plateExist) {
            alert("La placa ya existe");
        } else if (userExist) {
            if (userExist.vehiclesPlates.length < 2) {
                const newVehicle = {
                    plate,
                    vehicleType: selectedVehicleType, // car or motorcycle
                    Cylinder: model,
                    brand: brand,
                };
                userExist.vehiclesPlates.push(newVehicle);
                setUserRegister([...userRegister]);
                setIdUser("");
                setPlate("");
                setSelectedVehicleType("");
            } else {
                alert("El usuario ya tiene 2 vehiculos registrados");
            }
        } else {
            const newRegister = {
                idUser,
                vehiclesPlates: [{ plate, vehicleType: selectedVehicleType, modelCylinder: model, brand: brand }],
            };
            setUserRegister([...userRegister, newRegister]);

            // Limpia los campos del formulario
            setIdUser("");
            setPlate("");
            setSelectedVehicleType("");
        }
    };

    //Funcion para reiniar el estado de error
    const handlerError = () => {
        setError(false);
        setIdUser("");
        setPlate("");
    };

/*     // Funcion para obtener los usuarios registrados
    const handlerGetUsers = () => {
        // Obtener la informacion de los vehiculos por medio del id o la placa
        const userExist = userRegister.find((user) => user.idUser === idUser);
        const plateExist = userRegister.find((user) => user.vehiclesPlates.some((vehicle) => vehicle.plate === plate));

        if (userExist) {
            //alert(`El usuario ${userExist.idUser} tiene los siguientes vehiculos registrados: ${userExist.vehiclesPlates.map((vehicle) => vehicle.plate)}`);
            alert(`El usuario ${userExist.idUser} tiene los siguientes vehiculos registrados: 
            ${userExist.vehiclesPlates.map((vehicle) => [vehicle.plate, vehicle.vehicleType, vehicle.brand, vehicle.modelCylinder])}`);
        } else if (plateExist) {
            alert(`El vehiculo con placa ${plateExist.vehiclesPlates.map((vehicle) => vehicle.plate)} pertenece al usuario ${plateExist.idUser}`);
        } else {
            alert("El usuario no existe");
        }
    } */

    return (
        <UserContext.Provider value={{
            users,
            user,
            setUser,
            userRegister,
            setUserRegister,
            idUser,
            plate,
            selectedVehicleType,
            secondAutocompleteOptions,
            brandChange,
            error,
            handlerError,
            handlerSelectModel,
            handlerSelectBrand,
            handlerPlateChange,
            handlerSelectVehicle,
            handlerIdUserChange,
            handlerRegister,
            //handlerGetUsers,
        }}>
            {children}
        </UserContext.Provider>
    );
};
