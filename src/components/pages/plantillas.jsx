import React, { useState } from "react";
import { useAppContext } from "../../context/contextapp";
import logo_light from "../../img/linio_light.png";
import ExportExcel from "react-export-excel";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";

const Excelfile = ExportExcel.ExcelFile;
const Excelsheet = ExportExcel.ExcelFile;
const Excelcolumn = ExportExcel.ExcelFile;
export default function Plantillas() {
  const [products, setProducts] = useState();
  const [Country, setCountry] = useState();
  const [Tipo, setTipo] = useState();
  const [Loader, setLoader] = useState(false);
  const [Form, setForm] = useState("");
  const [Combobox, setCombobox] = useState([
    {
      ID: 1,
      Modulo: "Plantilla",
      Name: "Club Premier",
    },
    {
      ID: 2,
      Modulo: "Plantilla",
      Name: "Life Miles",
    },
    {
      ID: 3,
      Modulo: "Plantilla",
      Name: "Lighthouse (BOB)",
    },
    {
      ID: 4,
      Modulo: "Plantilla",
      Name: "UPC",
    },
    {
      ID: 5,
      Modulo: "Plantilla",
      Name: "Seller Center (Linio Sku - Imágenes)",
    },
    {
      ID: 6,
      Modulo: "Plantilla",
      Name: "Seller Center (Seller Sku - Imágenes)",
    },
    {
      ID: 7,
      Modulo: "Plantilla",
      Name: "Levis",
    },
    {
      ID: 8,
      Modulo: "Plantilla",
      Name: "Plantilla HP Notebooks",
    },
    {
      ID: 9,
      Modulo: "Plantilla",
      Name: "Sodexo",
    },
    {
      ID: 10,
      Modulo: "Plantilla",
      Name: "Marcas",
    },
    {
      ID: 11,
      Modulo: "Plantilla",
      Name: "CMR",
    },
    {
      ID: 12,
      Modulo: "Paises",
      Name: "MX",
    },
    {
      ID: 13,
      Modulo: "Paises",
      Name: "CO",
    },
    {
      ID: 14,
      Modulo: "Paises",
      Name: "CL",
    },
    {
      ID: 15,
      Modulo: "Paises",
      Name: "PE",
    },
    {
      ID: 16,
      Modulo: "Paises",
      Name: "MX_CP",
    },
    {
      ID: 17,
      Modulo: "Paises",
      Name: "MX_SX",
    },
    {
      ID: 18,
      Modulo: "Paises",
      Name: "MX_LV",
    },
    {
      ID: 19,
      Modulo: "Paises",
      Name: "CO_AV",
    },
    {
      ID: 20,
      Modulo: "Paises",
      Name: "CO_CMR",
    },
    {
      ID: 21,
      Modulo: "Paises",
      Name: "CL_CMR",
    },
    {
      ID: 22,
      Modulo: "Paises",
      Name: "PE_AV",
    },
    {
      ID: 23,
      Modulo: "Paises",
      Name: "PE_CMR",
    },
    {
      ID: 24,
      Modulo: "Plantilla",
      Name: "BOB (Linio Sku - Imágenes)",
    },
    {
      ID: 25,
      Modulo: "Plantilla",
      Name: "Productos sin ventas (BOB)",
    },
  ]);
  const { LifemilesRequest /*, getCombobox*/ } = useAppContext();

  const [formValue, setFormValue] = useState([
    "LE024EL64AMXLACOL",
    "LE024EL63AMYLACOL",
    "LE024EL62AMZLACOL",
  ]);

  async function handleSub(e) {
    e.preventDefault();
    var aux = {
      pais: Country,
      sku: formValue,
      tipo: Tipo,
    };
    try {
      setLoader(true);
      const res = await LifemilesRequest(aux);
      console.log(res);
      if (res === undefined || res === null) {
        throw Error;
      }
      setProducts(res);
      setLoader(false);
      toast.success("Solicitud Completada!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setLoader(false);
      toast.error("Se ha producido un error!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  }
  const handlechange = (e) => {
    e.preventDefault();
    var aux = e.target.value;
    setForm(aux);
    aux = aux.split("\n");

    setFormValue(aux);
  };
  return (
    <>
      <div className=" flex m-0 justify-start">
        <div className="p-4 min-h-full w-56">
          <div className="flex flex-col py-1">
            <label
              htmlFor="Text"
              className=" text-sm pr-4 font-medium text-gray-700"
            >
              Pais
            </label>
            <select
              id="country"
              value={Country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              name="country"
              className="py-0 pl-4 pr-8 w-full  text-xs font-semibold shadow-sm border-gray-500 border-2 rounded-md focus:border-indigo-500 "
            >
              <option> </option>
              {Combobox && (
                <>
                  {Combobox.map((item, i) => (
                    <>
                      {item.Modulo === "Paises" && <option>{item.Name}</option>}
                    </>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="flex flex-col py-1">
            <label
              htmlFor="Text"
              className=" text-sm pr-4 font-medium text-gray-700"
            >
              Tipo
            </label>
            <select
              value={Tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
              id="country"
              name="country"
              className="py-0 pl-4  text-xs font-semibold pr-8 w-full shadow-sm border-gray-500 border-2 rounded-md focus:border-indigo-500 "
            >
              <option> </option>
              {Combobox && (
                <>
                  {Combobox.map((item, i) => (
                    <>
                      {item.Modulo === "Plantilla" && (
                        <option>{item.Name}</option>
                      )}
                    </>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="flex flex-col py-1">
            <label
              htmlFor="Text"
              className=" text-sm pr-4 font-medium text-gray-700"
            >
              Atributo
            </label>
            <select
              id="country"
              name="country"
              className="py-0  text-xs font-semibold pl-4 pr-8 w-full shadow-sm border-gray-500 border-2 rounded-md focus:border-indigo-500 "
            >
              <option> </option>
            </select>
          </div>
          <div className="col-span-1">
            <div className="mt-2">
              <div className="flex">
                <label className=" text-sm font-medium text-gray-700">
                  SKUs
                </label>
                <button
                  onClick={() => {
                    setForm("");
                  }}
                  className="font-bold rounded-t-lg bg-gray-300 flex justify-between p-1 ml-auto text-sm leading-5 text-left"
                >
                  Vaciar
                </button>
              </div>
              <textarea
                name="skus"
                id="skus"
                onChange={handlechange}
                value={Form}
                className="py-3 px-2 h-40 w-full text-xs font-semibold shadow-sm border-gray-500 border-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col align-middle justify-center">
            <Menu>
              {({ open }) => (
                <>
                  <span className=" w-36">
                    <Menu.Button className="bg-gray-600  w-full text-white px-2 py-1 rounded-md flex flex-row">
                      <div className="flex w-full justify-center items-center">
                        <span className="mx-6">Acciones</span>
                      </div>
                    </Menu.Button>
                  </span>

                  <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="font-bold absolute w-36 mt-2 origin-top-right divide-y divide-gray-100 shadow-lg outline-none"
                    >
                      <div className="">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSub}
                              className={`${
                                active
                                  ? "bg-gray-300 text-gray-900"
                                  : "text-gray-700 bg-gray-400"
                              }  font-bold rounded-t-lg flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                            >
                              Consultar
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={`${
                                active
                                  ? "bg-gray-300 text-gray-900"
                                  : "text-gray-700 bg-gray-400"
                              } flex  justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                            >
                              Validar datos
                            </a>
                          )}
                        </Menu.Item>
                        {products && !(products.length === 0) && (
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                href="#sign-out"
                                className={`${
                                  active
                                    ? "bg-gray-300 text-gray-900"
                                    : "text-gray-700 bg-gray-400"
                                } flex  rounded-b-lg justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                <Excelfile
                                  element={
                                    <button className="font-bold">
                                      Exportar
                                    </button>
                                  }
                                  filename="data"
                                >
                                  <Excelsheet data={products} name="hoja1">
                                    {Object.keys(products[0]).map((obj) => (
                                      <Excelcolumn label={obj} value={obj} />
                                    ))}
                                  </Excelsheet>
                                </Excelfile>
                              </span>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
        <div
          style={{ maxHeight: "88vh" }}
          className="mt-2 w-full overflow-auto"
        >
          <div className="w-full bg-white">
            {products && !Loader ? (
              <table className=" divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {!(products.length === 0) ? (
                      Object.keys(products[0]).map((obj) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                        >
                          {obj}
                        </th>
                      ))
                    ) : (
                      <>Esta Consulta esta Vacia!</>
                    )}
                  </tr>
                </thead>

                <tbody className=" overflow-scroll w-full">
                  {products.slice(0, 500).map((person, personIdx) => (
                    <tr
                      key={person.name}
                      className={
                        personIdx % 2 === 0 ? "bg-white" : "bg-gray-300"
                      }
                    >
                      {Object.entries(person).map((obj) => (
                        <td className="px-6 py-3 max-w-xs overflow-hidden whitespace-nowrap text-xs text-gray-500">
                          {obj[1]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                style={{ width: "70vw", height: "50vw" }}
                className=" justify-center h-full  align-middle flex bg-opacity-30 "
              >
                <div className=" mx-auto my-auto">
                  {!Loader ? (
                    <img
                      src={logo_light}
                      alt="#"
                      className=" object-contain  opacity-25 mx-auto"
                    />
                  ) : (
                    <HashLoader size={100} color={"#ff6d01"} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
