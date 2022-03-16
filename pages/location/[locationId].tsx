import { GetServerSideProps } from "next/types";
import instance from "../../api/instance";
import LocationDetails from "../../components/Locations/LocationDetails";

function LocationDetailsPage(props: any) {
  return (
    <div>
      <LocationDetails location={props.location} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locationId } = context.query;
  const response = await instance.get(`location/${locationId}`);
  const data = await response.data;

  return {
    props: {
      location: data,
    },
  };
};

export default LocationDetailsPage;
