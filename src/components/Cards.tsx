import { useEffect, useState } from "react";

import {
  Product,
  SaltSuggestions,
  buttonMapper,
  getTrimmedData,
} from "../utils";
import Button from "./Button";

const Card = ({ data }: { data: SaltSuggestions }) => {
  const flattendAndFiltered = getTrimmedData(data);
  const salt_forms_json = flattendAndFiltered.salt_forms_json;
  const { productObj } = flattendAndFiltered;

  const [selectedFSP, setSelectedFSP] = useState({
    form: data.available_forms[0],
    strength: Object.keys(salt_forms_json[data.available_forms[0]])[0],
    packaging: Object.keys(
      salt_forms_json[data.available_forms[0]][
        Object.keys(salt_forms_json[data.available_forms[0]])[0]
      ],
    )[0],
  });

  const [isExpended, setIsExpended] = useState({
    form: false,
    strength: false,
    packaging: false,
  });

  const [hasSeller, setHasSeller] = useState({ hasData: false, price: 0 });

  const onClickFormType = (selectedForm: string) => {
    setSelectedFSP({
      form: selectedForm,
      strength: Object.keys(salt_forms_json[selectedForm])[0],
      packaging: Object.keys(
        salt_forms_json[selectedForm][
          Object.keys(salt_forms_json[selectedForm])[0]
        ],
      )[0],
    });
    setIsExpended((prev) => ({ ...prev, strength: false, packaging: false }));
  };

  const onClickStrengthType = (selectedStrength: string) => {
    setSelectedFSP((prev) => ({
      ...prev,
      strength: selectedStrength,
      packaging: Object.keys(salt_forms_json[prev.form][selectedStrength])[0],
    }));
    setIsExpended((prev) => ({ ...prev, form: false, packaging: false }));
  };

  useEffect(() => {
    const selectedSellerDetails: Product =
      salt_forms_json[selectedFSP.form] &&
      salt_forms_json[selectedFSP.form][selectedFSP.strength] &&
      salt_forms_json[selectedFSP.form][selectedFSP.strength][
        selectedFSP.packaging
      ];

    if (selectedSellerDetails) {
      setHasSeller({
        hasData: true,
        price: selectedSellerDetails.selling_price || 0,
      });
    } else {
      setHasSeller({ hasData: false, price: 0 });
    }
  }, [selectedFSP]);

  const formArr = data.available_forms;
  const strengthArr = Object.keys(salt_forms_json[selectedFSP.form]);
  const packagingArr = Object.keys(
    salt_forms_json[selectedFSP.form][selectedFSP.strength],
  );

  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-r from-white from-60% to-[#E7F1F1] p-6 shadow-[0_0_10px_6px_rgba(220,220,220,0.4)] lg:flex-row lg:items-center lg:gap-2">
      <div className="flex flex-col gap-5 lg:w-1/3">
        <div className="flex">
          <div className="flex w-1/3 min-w-[100px] justify-start">Form :</div>
          <div className="flex w-2/3 flex-wrap gap-4">
            {formArr
              .slice(0, isExpended.form ? formArr.length : 4)
              .map((form: string, idx: number) => (
                <Button
                  variant={buttonMapper(
                    productObj[form],
                    selectedFSP.form === form,
                  )}
                  key={idx}
                  onClick={() => onClickFormType(form)}
                >
                  {form}
                </Button>
              ))}

            {formArr.length > 4 && (
              <button
                className="font-bold text-[#204772]"
                onClick={() =>
                  setIsExpended((prev) => ({ ...prev, form: !isExpended.form }))
                }
              >
                {isExpended.form ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex w-1/3 min-w-[100px] justify-start">
            Strength :
          </div>
          <div className="flex w-2/3 flex-wrap gap-4">
            {strengthArr
              .slice(0, isExpended.strength ? strengthArr.length : 4)
              .map((strength, idx) => (
                <Button
                  variant={buttonMapper(
                    productObj[selectedFSP.form]?.[strength],
                    selectedFSP.strength === strength,
                  )}
                  key={idx}
                  onClick={() => onClickStrengthType(strength)}
                >
                  {strength}
                </Button>
              ))}

            {strengthArr.length > 4 && (
              <button
                className="font-bold text-[#204772]"
                onClick={() =>
                  setIsExpended((prev) => ({
                    ...prev,
                    strength: !isExpended.strength,
                  }))
                }
              >
                {isExpended.strength ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>

        <div className="flex">
          <div className="flex w-1/3 min-w-[100px] justify-start">
            Packaging :
          </div>
          <div className="flex w-2/3 flex-wrap gap-4">
            {packagingArr
              .slice(0, isExpended.packaging ? packagingArr.length : 4)
              .map((packaging, idx) => (
                <Button
                  variant={buttonMapper(
                    productObj[selectedFSP.form]?.[selectedFSP.strength]?.[
                      packaging
                    ],
                    selectedFSP.packaging === packaging,
                  )}
                  key={idx}
                  onClick={() =>
                    setSelectedFSP((prev) => ({ ...prev, packaging }))
                  }
                >
                  {packaging}
                </Button>
              ))}

            {packagingArr.length > 4 && (
              <button
                className="font-bold text-[#204772]"
                onClick={() =>
                  setIsExpended((prev) => ({
                    ...prev,
                    packaging: !isExpended.packaging,
                  }))
                }
              >
                {isExpended.packaging ? "hide.." : "more.."}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:w-1/3">
        <div>
          <div className="break-all text-lg font-bold">{data.salt}</div>
          <div className="text-[#2A527A]">
            {selectedFSP.form} | {selectedFSP.strength} |{" "}
            {selectedFSP.packaging}{" "}
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:w-1/3">
        {hasSeller.hasData ? (
          <div className="flex justify-end text-3xl font-extrabold text-[#112D31]">
            From₹{hasSeller.price}
          </div>
        ) : (
          renderNoStore()
        )}
      </div>
    </div>
  );
};

const renderNoStore = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[220px] rounded-md border border-[#A7D6D5] bg-white px-6 py-2 ">
        No stores selling this product near you
      </div>
    </div>
  );
};

const Cards = ({ data }: { data: SaltSuggestions[] }) => {
  return (
    <div className="flex flex-col gap-10 py-4">
      {data.map((item: SaltSuggestions) => (
        <Card data={item} key={item.id} />
      ))}
    </div>
  );
};

export default Cards;
