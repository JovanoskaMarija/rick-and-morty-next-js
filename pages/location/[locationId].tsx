import { GetServerSideProps } from "next/types";
import LocationDetails from "../../components/Locations/LocationDetails";
import { getLocation } from "../api/location";
import { ILocationDetail } from "../api/location/type";

interface ILocation {
  location: ILocationDetail;
}

function LocationDetailsPage({ location }: ILocation) {
  return (
    <div>
      <LocationDetails location={location} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locationId } = context.query;
  const response = await getLocation(locationId as string);

  return {
    props: {
      location: response,
    },
  };
};

export default LocationDetailsPage;
