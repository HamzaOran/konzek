import Toggle from './Toogle';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-black shadow p-5 ">
        <div>
          <h1 className="font-bold text-white  text-4xl">
            Where in the world?
          </h1>
        </div>

        {/* <div>
          <Toggle />
        </div> */}
      </header>

      <div className="pt-20"></div>
    </>
  );
}
