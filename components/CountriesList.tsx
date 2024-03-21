import { gql, useQuery } from '@apollo/client';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  SetStateAction,
} from 'react';
import { useState } from 'react';

type Country = {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency: string;
  emoji: string;
  languages: { name: string }[];
  native: string;
  phone: string;
};

const GET_COUNTRIES = gql`
  query Query {
    countries {
      code
      name
      continent {
        name
      }
      currency
      emoji
      languages {
        name
      }
      native
      phone
    }
  }
`;

function CountriesList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const handleCountryClick = (countryCode: any) => {
    setExpandedCountry(countryCode === expandedCountry ? null : countryCode);
  };

  const handleSearchInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = data.countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="p-2 mb-4 rounded border"
        />
      </div>
      {data && data.countries && (
        <ul className="list-none  grid grid-cols-1 gap-5 p-5  2xl:container 2xl:mx-auto">
          {filteredCountries.map(
            (country: {
              code: Key | null | undefined;
              name: string;

              continent: {
                name: string;
              };
              currency: string;

              emoji: string;

              languages: { name: any }[];
              native: string;

              phone: string;
            }) => (
              <li key={country.code}>
                <a
                  className=" p-4 border rounded hover:bg-gray-300 flex flex-row justify-center items-center cursor-pointer"
                  onClick={() => handleCountryClick(country.code)}
                >
                  <div className="font-bold text-2xl">{country.name}</div>
                </a>
                {expandedCountry === country.code && (
                  <div className="flex flex-col items-center bg-gray-300 ">
                    <strong>Continent:</strong> {country.continent.name}
                    <br />
                    <strong>Currency:</strong> {country.currency}
                    <br />
                    <strong>Emoji:</strong> {country.emoji}
                    <br />
                    <strong>Languages:</strong>{' '}
                    {country.languages.map((lang) => lang.name).join(', ')}
                    <br />
                    <strong>Native:</strong> {country.native}
                    <br />
                    <strong>Phone:</strong> {country.phone}
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default CountriesList;
