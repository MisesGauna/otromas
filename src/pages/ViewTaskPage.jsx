import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskRequest } from "../api/tasks"; // Asegúrate de que la ruta sea correcta  

export function ViewTaskPage() {
    const { id } = useParams(); // Obtener el id de los parámetros de la URL  
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskRequest(id);
                setTask(response.data);
            } catch (err) {
                setError("Error al cargar la tarea");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className="container p-5 w-30 sm">
            <div className="grid">
                <div className=" grid grid-cols-3 gap-3">
                    <h1 className="text-4xl font-bold">{task.title}</h1>
                    <div></div>
                    <div>
                        <h7>EXPEDIENTE N°</h7>
                        <h1 className="text-2xl font-bold">{task.numExp}</h1>
                    </div>
                </div>
                <h1 className="text-2xl font-bold">{task.iniciador}</h1>
                <h1 className="text-2xl font-bold">{task.numRes}</h1>
                <h1 className="text-2xl font-bold">{task.name}</h1>
                <h1 className="text-2xl font-bold">{task.dni}</h1>
                <h1 className="text-2xl font-bold">{task.fechaNacimiento}</h1>
                <h1 className="text-2xl font-bold">{task.legajopersonal}</h1>
                <h1 className="text-2xl font-bold">{task.sitRevista}</h1>
                <h1 className="text-2xl font-bold">{task.email}</h1>
                <h1 className="text-2xl font-bold">{task.uDestino}</h1>
                <h1 className="text-2xl font-bold">{task.desCaratula}</h1>
                <h1 className="text-2xl font-bold">{task.fechInicio}</h1>
                <h1 className="text-2xl font-bold">{task.inspSumariante}</h1>
                <h1 className="text-2xl font-bold">{task.telefono}</h1>
                <h1 className="text-2xl font-bold">{task.secretario}</h1>
                <h1 className="text-2xl font-bold">{task.resInicio}</h1>
                <h1 className="text-2xl font-bold">{task.resCierre}</h1>
                <h1 className="text-2xl font-bold">{task.description}</h1>
                <h1 className="text-2xl font-bold">{task.desCierre}</h1>
                <p className="text-slate-300">{task.description}</p>
                <p className="mt-2">{`Fecha: ${new Date(task.date).toLocaleDateString()}`}</p>
            </div>
        </div>
    );
}