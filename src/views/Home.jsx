import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import AuthView from "./AuthView";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="h-screen">
      <Header />
      <main className="h-[90%]">
        <section className="h-[80%] w-full flex">
          <div className="w-1/2 h-full p-8">
            <div className="h-9/10 flex flex-col justify-center px-6">
              <div>
                <h1 className="text-6xl font-bold bungee-regular">
                  Optimiza el rendimiento de tus tiendas
                </h1>
                <p className="text-xl mt-6 pl-1 noto-sans">
                  Desde el registro de cada venta hasta metricas clave por
                  vendedor, producto y marca. Todo lo que necesitas para mejorar
                  resultados y escalar tu operacion comercial.
                </p>
              </div>
              <div className="w-full flex justify-start mt-6">
                <Link
                  to={isAuthenticated ? "/ventas" : "/login"}
                  className="bg-gray-500 cursor-pointer hover:bg-gray-600 hover:scale-[1.05] px-5 py-4 rounded-4xl text-white font-bold text-md bungee-regular"
                >
                  {isAuthenticated ? "Ir a ventas" : "Comienza ahora"}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
              <AuthView />
          </div>
        </section>
        <hr className="w-[75%] justify-self-center" />
        <section className="h-[19%] w-full flex py-10 px-20 gap-7">
          <div className="w-1/3 rounded-4xl border-x-2 border-gray-500 box shadow-2xl">
            <img
              src="/assets/logos-marcas/logo-chevignon.jpeg"
              alt="americanino"
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
          <div className="w-1/3 rounded-4xl border-x-2 border-gray-500 box shadow-2xl">
            <img
              src="/assets/logos-marcas/logo-americanino.jpg"
              alt="americanino logo"
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
          <div className="w-1/3 rounded-4xl border-x-2 border-gray-500 box shadow-2xl">
            <img
              src="/assets/logos-marcas/logo-esprit.jpeg"
              alt="esprit logo"
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;