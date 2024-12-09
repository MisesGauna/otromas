import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-zinc-800 flex justify-center items-center">
      <header className="bg-zinc-800 p-10 flex justify-center items-center flex-col">
        <h1 className="text-5xl py-2 font-bold">Sistema de Sumarios</h1>
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block "
          to="/login"
        >
          Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
