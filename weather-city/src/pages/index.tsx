import Image from "next/image";
import { useRouter } from "next/router";
import Globe from '../assets/globe.png';

const cities = [
  { name: 'Dallol', country: 'NG' },
  { name: 'Fairbanks', country: 'US' },
  { name: 'London', country: 'GB' },
  { name: 'Recife', country: 'BR' },
  { name: 'Vancouver', country: 'CA' },
  { name: 'Yakutsk', country: 'RU' },
]

export default function Home() {
  const router = useRouter();

  const handleClick = (city: string, country: string) => {
    router.push(`/city/${city}?country=${country}`);
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] flex flex-col items-center font-inter px-[2.719rem] py-[2rem] sm:py-0">
      <h1 className="text-[3rem] font-medium sm:mt-[2rem] sm:mt-[9.344rem] mb-[0.25rem]">Weather</h1>
      <p className="text-[1.563rem] mb-[3.031rem]">Select a city</p>

      <div className="mb-[3.031rem]">
        <Image src={Globe} alt="Globe" className="w-[8.938rem] h-[8.938rem]" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-[1.5rem] sm:gap-x-[3rem] gap-y-[2rem] xl:mb-[28.906rem] text-xs text-center w-full">
        {cities.map(city => (
          <p 
            key={city.name}
            className="hover:underline cursor-pointer text-[1.25rem]"
            onClick={() => handleClick(city.name, city.country)}
          >
            {city.name}
          </p>
        ))}
      </div>
    </main>
  );
}
