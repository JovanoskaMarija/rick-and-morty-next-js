import instance from "../axiosInstance.ts";

export async function getLocationsList(page: number) {
  let locations = null;

  try {
    const results = await instance.get(`location?page=${page}`);

    locations = await results.data;
  } catch {
    locations = null;
  }

  return locations;
}

export async function getLocation(locationId: string) {
  const response = await instance.get(`location/${locationId}`);

  return response.data;
}
