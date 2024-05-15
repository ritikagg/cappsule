import Cards from "../../components/Cards";
import Spinner from "../../components/Spinner";
import { APIResponse } from "../../utils";

const CardsContainer = ({
  loading,
  isSearching,
  response,
}: {
  loading: boolean;
  isSearching: boolean;
  response: APIResponse | null;
}) => {
  if (loading) {
    return (
      <div>
        <Spinner size="large" />
      </div>
    );
  }

  if (response && response.data.saltSuggestions.length === 0) {
    return <div>No Product found</div>;
  }

  return (
    <>
      {response ? (
        <div className="h-full w-full">
          <Cards data={response.data.saltSuggestions} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-400">
          " Find medicines with amazing discount "
        </div>
      )}
    </>
  );
};

export default CardsContainer;
