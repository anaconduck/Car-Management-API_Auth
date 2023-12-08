import { CarRequest, CarResponse } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";
import cloudinary from "../../config/cloudinary";

class CarServices {
  //Create
  static async createCar(car: CarRequest): Promise<Car> {
    const fileBase64 = car.car_img?.buffer.toString("base64");
    const file = `data:${car.car_img?.mimetype};base64,${fileBase64}`;

    const uploadedFileImage = await cloudinary.uploader.upload(file);

    const carToCreate: Car = {
      car_name: car.car_name,
      car_rentperday: car.car_rentperday,
      car_size: car.car_size,
      car_img: uploadedFileImage.url,
      create_by: car.create_by,
      create_at: car.create_at,
    };
    const createdCar = await CarsRepository.createCar(carToCreate);

    return createdCar;
  }

  //Read
  static async getCars(): Promise<CarResponse[]> {
    const listCar = await CarsRepository.getCars();

    const listCarResponse: CarResponse[] = listCar.map((car) => {
      const carResponse: CarResponse = {
        id: car.id as number,
        car_name: car.car_name,
        car_rentperday: car.car_rentperday,
        car_size: car.car_size,
        car_img: car.car_img,
        created_by: {
          id: car.created_by?.id as number,
          name: car.created_by?.name as string,
          email: car.created_by?.email as string,
          password: car.created_by?.password as string,
        },
        updated_by: {
          id: car.updated_by?.id as number,
          name: car.updated_by?.name as string,
          email: car.updated_by?.email as string,
          password: car.updated_by?.password as string,
        },
        deleted_by: {
          id: car.deleted_by?.id as number,
          name: car.deleted_by?.name as string,
          email: car.deleted_by?.email as string,
          password: car.deleted_by?.password as string,
        },
        create_at: car.create_at,
        update_at: car.update_at,
        delete_at: car.delete_at,
      };
      return carResponse;
    });
    return listCarResponse;
  }
  static async getCarsById(queryId: number): Promise<Car[]> {
    const listCar = await CarsRepository.getCarsById(queryId);
    const listCarResponse: CarResponse[] = listCar.map((car) => {
      const carResponse: CarResponse = {
        id: car.id as number,
        car_name: car.car_name,
        car_rentperday: car.car_rentperday,
        car_size: car.car_size,
        car_img: car.car_img,
        created_by: {
          id: car.created_by?.id as number,
          name: car.created_by?.name as string,
          email: car.created_by?.email as string,
          password: car.created_by?.password as string,
        },
        updated_by: {
          id: car.updated_by?.id as number,
          name: car.updated_by?.name as string,
          email: car.updated_by?.email as string,
          password: car.updated_by?.password as string,
        },
        deleted_by: {
          id: car.deleted_by?.id as number,
          name: car.deleted_by?.name as string,
          email: car.deleted_by?.email as string,
          password: car.deleted_by?.password as string,
        },
        create_at: car.create_at,
        update_at: car.update_at,
        delete_at: car.delete_at,
      };
      return carResponse;
    });
    return listCarResponse;
  }

  //Update
  static async updateCarById(
    queryId: number,
    car: CarRequest
  ): Promise<Car | null> {
    const fileBase64 = car.car_img?.buffer.toString("base64");
    const file = `data:${car.car_img?.mimetype};base64,${fileBase64}`;

    const uploadedImage = await cloudinary.uploader.upload(file);

    const carToUpdate: Car = {
      car_name: car.car_name,
      car_rentperday: car.car_rentperday,
      car_size: car.car_size,
      car_img: uploadedImage.url,
      update_by: car.update_by,
      update_at: car.update_at,
    };
    const updatedCar = await CarsRepository.updateCarById(queryId, carToUpdate);
    return updatedCar;
  }

   //Delete
   static async deleteCarById(
    queryId: number
    ): Promise<Car | null> {
    const deletedCar = await CarsRepository.deleteCarById(queryId);
    return deletedCar;
  }
}

export default CarServices;