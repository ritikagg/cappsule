import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { APIResponse } from "../../utils";
import CardsContainer from "./CardsContainer";

const LandingPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);

  const fetchData = async (query: string) => {
    const url = `https://backend.cappsule.co.in/api/v1/new_search?q=${query}&pharmacyIds=1,2,3`;
    try {
      setLoading(true);
      const response = await fetch(url);
      const jsonData: APIResponse = await response.json();
      setResponse(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSearch = (input: string) => {
    if (!isSearching) {
      setResponse(null);
      fetchData(input);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="h-full w-[90%] lg:w-[80%] xl:w-[70%]">
        <div className="pb-10 pt-10 text-3xl">
          Cappsule web development test
        </div>

        <div className="flex flex-col items-center justify-start gap-10">
          <SearchBar
            onSearch={onSearch}
            setResponse={setResponse}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />

          <div className="w-full border" />

          <div className="flex h-[70vh] w-full flex-col items-center justify-center overflow-auto px-6">
            <CardsContainer
              loading={loading}
              isSearching={isSearching}
              response={response}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
