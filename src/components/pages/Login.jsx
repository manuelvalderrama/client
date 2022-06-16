import React, { useState } from "react";
import logo from "../../img/linio_dark.png";
import fondo from "../../img/linio_back.png";
import { useNavigate } from "react-router-dom";
export default function Login({ handleSubmit, changeRemember }) {
  //variables para el formulario de envio
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); //objeto usado para cambiar ruta

  const handleChange = (event) => {
    //funcion para cambiar formulario con cada input de teclado
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSub(e) {
    //funcion para enviar formulario de inicio
    e.preventDefault();
    try {
      await handleSubmit(formValue);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const handlerem = (e) => {
    //cambiar estado del checkbox
    changeRemember(e.target.checked);
  };
  return (
    <>
      <div
        onSubmit={handleSub}
        className="min-h-screen flex items-stretch text-white "
      >
        <div
          className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center"
          style={{
            background: `url(${fondo})`,
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10 text-center">
            <img src={logo} alt="#" />
            <h1 className="text-5xl font-bold tracking-wide">iniciar sesión</h1>
          </div>
        </div>
        <div className="lg:w-1/2 bg-gray-800 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              background: `url(${fondo})`,
            }}
          >
            <div className="absolute bg-black concity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20 ">
            <h1 className="text-gray-100 text-4xl font-bold tracking-wide my-10">
              Ingresa tus credenciales!
            </h1>
            <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pb-2 pt-4">
                <input
                  type="text"
                  name="username"
                  value={formValue.username}
                  onChange={handleChange}
                  placeholder="Usuario"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
              </div>
              <div className="text-left text-gray-400 hover:text-gray-100 flex justify-center align-middle">
                <input
                  type="checkbox"
                  name="password"
                  onChange={handlerem}
                  className="my-auto mr-2"
                />
                Recuerdame?
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  onClick={handleSub}
                  className="uppercase block w-full p-2 text-lg rounded-md bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
