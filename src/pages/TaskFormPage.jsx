// import { useEffect } from "react";  
// import { useNavigate, useParams } from "react-router-dom";  
// import { Button, Card, Input, Label } from "../components/ui";  
// import { useTasks } from "../context/tasksContext";  
// import { Textarea } from "../components/ui/Textarea";  
// import { useForm } from "react-hook-form";  
// import dayjs from "dayjs";  
// import utc from "dayjs/plugin/utc";  
// dayjs.extend(utc);  

// export function TaskFormPage() {  
//   const { createTask, getTask, updateTask } = useTasks();  
//   const navigate = useNavigate();  
//   const params = useParams();  
//   const {  
//     register,  
//     setValue,  
//     handleSubmit,  
//     formState: { errors },  
//   } = useForm();  

//   const onSubmit = async (data) => {  
//     try {  
//       // Al enviar, utilizar el campo 'thumbnail' para la imagen  
//       if (params.id) {  
//         await updateTask(params.id, {  
//           ...data,  
//           date: dayjs.utc(data.date).format(),  
//           thumbnail: data.profilePicture, // Asegurarse de que 'thumbnail' se llena con el valor correcto  
//         });  
//       } else {  
//         await createTask({  
//           ...data,  
//           date: dayjs.utc(data.date).format(),  
//           thumbnail: data.profilePicture, // Hacer lo mismo aquí  
//         });  
//       }  

//       navigate("/tasks");  
//     } catch (error) {  
//       console.log(error);  
//       window.location.href = "/";  
//     }  
//   };  

//   useEffect(() => {  
//     const loadTask = async () => {  
//       if (params.id) {  
//         const task = await getTask(params.id);  
//         setValue("title", task.title);  
//         setValue("description", task.description);  
//         setValue(  
//           "date",  
//           task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""  
//         );  
//         setValue("completed", task.completed);  
//         setValue("profilePicture", task.thumbnail); // Usar 'thumbnail' al cargar el enlace de la imagen   
//       }  
//     };  
//     loadTask();  
//   }, [params.id, getTask, setValue]);  

//   return (  
//     <Card>  
//       <form onSubmit={handleSubmit(onSubmit)}>  
//         <Label htmlFor="title">Title</Label>  
//         <Input  
//           type="text"  
//           name="title"  
//           placeholder="Title"  
//           {...register("title")}  
//           autoFocus  
//         />  
//         {errors.title && (  
//           <p className="text-red-500 text-xs italic">Please enter a title.</p>  
//         )}  

//         <Label htmlFor="description">Description</Label>  
//         <Textarea  
//           name="description"  
//           id="description"  
//           rows="3"  
//           placeholder="Description"  
//           {...register("description")}  
//         ></Textarea>  

//         <Label htmlFor="date">Date</Label>  
//         <Input type="date" name="date" {...register("date")} />  

//         {/* Campo para ingresar el enlace de la foto de perfil, ahora con 'thumbnail' */}  
//         <Label htmlFor="profilePicture">Profile Picture URL</Label>  
//         <Input  
//           type="text"  
//           name="profilePicture"  
//           placeholder="Enter URL of your profile picture"  
//           {...register("profilePicture")} // Registrar el campo con react-hook-form  
//         />  

//         <Button>Save</Button>  
//       </form>  
//     </Card>  
//   );  
// }


import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
          thumbnail: data.profilePicture,
        });
      } else {
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
          thumbnail: data.profilePicture,
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : "");
        setValue("profilePicture", task.thumbnail);
        // Cargar los nuevos campos  
        setValue("numRes", task.numRes);
        setValue("name", task.name);
        setValue("dni", task.dni);
        setValue("fechaNacimiento", task.fechaNacimiento);
        setValue("legajopersonal", task.legajopersonal);
        setValue("sitRevista", task.sitRevista);
        setValue("uDestino", task.uDestino);
        setValue("numExp", task.numExp);
        setValue("desCaratula", task.desCaratula);
        setValue("fechInicio", task.fechInicio);
        setValue("iniciador", task.iniciador);
        setValue("inspSumariante", task.inspSumariante);
        setValue("email", task.email);
        setValue("telefono", task.telefono);
        setValue("secretario", task.secretario);
        setValue("resInicio", task.resInicio);
        setValue("resCierre", task.resCierre);
        setValue("desCierre", task.desCaratula);
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <Card>

      <form onSubmit={handleSubmit(onSubmit)} className="grid " >
        <div className="border-solid border-2 rounded-md p-2 mb-4 border-gray-700">
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-3  ">
            <div className="camp-tipo-expediente">
              <Label htmlFor="title">Tipo de Expediente</Label>
              <Input
                type="text"
                name="title"
                placeholder="Tipo de Expediente"
                {...register("title")}
                autoFocus
              />
              {errors.title && <p className="text-red-500 text-xs italic">Please enter a title.</p>}
            </div>
            <div className="camp-num-expediente">
              <Label htmlFor="numExp">Número de Expediente</Label>
              <Input
                type="text"
                name="numExp"
                placeholder="Número de Expediente"
                {...register("numExp")}
              />
              {errors.numExp && <p className="text-red-500 text-xs italic">Please enter a file number.</p>}
            </div>
            <div className="camp-iniciador">
              <Label htmlFor="iniciador">Iniciador</Label>
              <Input
                type="text"
                name="iniciador"
                placeholder="Iniciador"
                {...register("iniciador")}
              />
              {errors.iniciador && <p className="text-red-500 text-xs italic">Please enter the initiator's name.</p>}
            </div>
          </div>
          <div>
            <div className="camp-desc-caratula">
              <Label htmlFor="desCaratula">Descripción de Carátula</Label>
              <Textarea
                type="text"
                name="desCaratula"
                row="13"
                placeholder="Descripción de Carátula"
                {...register("desCaratula")}
              />
              {errors.desCaratula && <p className="text-red-500 text-xs italic">Please enter a cover description.</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-fecha-inicio">
              <Label htmlFor="fechInicio">Fecha de Inicio</Label>
              <Input
                type="date"
                name="fechInicio"
                {...register("fechInicio")}
              />
              {errors.fechInicio && <p className="text-red-500 text-xs italic">Please enter a start date.</p>}
            </div>
            <div className="camp-instruc-sumariante">
              <Label htmlFor="inspSumariante">Instructor Sumariante</Label>
              <Input
                type="text"
                name="inspSumariante"
                placeholder="Instructor Sumariante"
                {...register("inspSumariante")}
              />
              {errors.inspSumariante && <p className="text-red-500 text-xs italic">Please enter the inspector's name.</p>}
            </div>
            <div className="camp-resolucion-inicio">
              <Label htmlFor="resInicio">Resolución de Inicio</Label>
              <Input
                type="text"
                name="resInicio"
                placeholder="Resolución de Inicio"
                {...register("resInicio")}
              />
              {errors.resInicio && <p className="text-red-500 text-xs italic">Please enter the start resolution.</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-num-resolucion">
              <Label htmlFor="numRes">Número de Resolución</Label>
              <Input
                type="text"
                name="numRes"
                placeholder="Número de Resolución"
                {...register("numRes")}
              />
              {errors.numRes && <p className="text-red-500 text-xs italic">Please enter a resolution number.</p>}
            </div>
          </div>
          <div>
            <div className="camp-description">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                rows="3"
                placeholder="Descripcion de Resolucion de Inicio"
                {...register("description")}
              ></Textarea>
              {errors.description && <p className="text-red-500 text-xs italic">Please enter a description.</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="camp-email">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
            </div>
            <div className="camp-telefono">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                {...register("telefono")}
              />
              {errors.telefono && <p className="text-red-500 text-xs italic">Please enter a phone number.</p>}
            </div>
            <div className="camp-secretario">
              <Label htmlFor="secretario">Secretario</Label>
              <Input
                type="text"
                name="secretario"
                placeholder="Secretario del Inst. Sumariante"
                {...register("secretario")}
              />
              {errors.secretario && <p className="text-red-500 text-xs italic">Please enter the secretary's name.</p>}
            </div>
          </div>
        </div>


        <div className="border-solid border-2 rounded-md p-2 mt-4 mb-4 border-gray-700">
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-resolucion-cierre">
              <Label htmlFor="resCierre">Resolución de Cierre</Label>
              <Input
                type="text"
                name="resCierre"
                placeholder="Resolución de Cierre"
                {...register("resCierre")}
              />
              {errors.resCierre && <p className="text-red-500 text-xs italic">Please enter the closing resolution.</p>}
            </div>
          </div>
          <div className="">
            <div className="camp-desCierre">
              <Label htmlFor="desCierre">Description</Label>
              <Textarea
                name="desCierre"
                rows="3"
                placeholder="Descripcion de Resolucion de Cierre"
                {...register("desCierre")}
              ></Textarea>
              {errors.description && <p className="text-red-500 text-xs italic">Please enter a description.</p>}
            </div>
          </div>
        </div>

        <div className="border-solid border-2 rounded-md p-2 mb-4 border-gray-700">
          <div className="grid grid-cols-3 gap-3 p-1">
            <div></div>
            <h4 className="text-center">Datos del Sumariado</h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-nom-apellido">
              <Label htmlFor="name">Nombre</Label>
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-xs italic">Please enter a name.</p>}
            </div>
            <div className="camp-dni">
              <Label htmlFor="dni">DNI</Label>
              <Input
                type="text"
                name="dni"
                placeholder="DNI"
                {...register("dni")}
              />
              {errors.dni && <p className="text-red-500 text-xs italic">Please enter a DNI.</p>}
            </div>
            <div className="camp-fech-nacimiento">
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                type="date"
                name="fechaNacimiento"
                {...register("fechaNacimiento")}
              />
              {errors.fechaNacimiento && <p className="text-red-500 text-xs italic">Please enter a birth date.</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-legajo-personal">
              <Label htmlFor="legajopersonal">Legajo Personal</Label>
              <Input
                type="text"
                name="legajopersonal"
                placeholder="Legajo Personal"
                {...register("legajopersonal")}
              />
              {errors.legajopersonal && <p className="text-red-500 text-xs italic">Please enter a personal file number.</p>}
            </div>
            <div className="camp-sit-revista">
              <Label htmlFor="sitRevista">Situación Revista</Label>
              <Input
                type="text"
                name="sitRevista"
                placeholder="Situación Revista"
                {...register("sitRevista")}
              />
              {errors.sitRevista && <p className="text-red-500 text-xs italic">Please enter the magazine situation.</p>}
            </div>
            <div className="camp-ultimo-dest">
              <Label htmlFor="uDestino">Unidad Destino</Label>
              <Input
                type="text"
                name="uDestino"
                placeholder="Unidad Destino"
                {...register("uDestino")}
              />
              {errors.uDestino && <p className="text-red-500 text-xs italic">Please enter the destination unit.</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="camp-thumbnail">
              <Label htmlFor="profilePicture">Foto del Sumariado</Label>
              <Input
                type="text"
                name="profilePicture"
                placeholder="Ingresar URL de la foto"
                {...register("profilePicture")}
              />
            </div>
          </div>
        </div>

        <div className="border-solid border-2 rounded-md p-2 mb-4 border-gray-700">
          <div className="grid grid-cols-3 gap-3">
            <div></div>
            <div className="camp-fecha">
              <Label htmlFor="date">Ultima Modificacion</Label>
              <Input
                type="date"
                name="date"
                {...register("date")} />
            </div>
          </div>
        </div>


        <div className="button-save h-20 grid grid-cols-3 gap-3 content-center">
          <div></div>
          <Button >Save</Button>
          <div></div>
        </div>
      </form>

    </Card>
  );
}