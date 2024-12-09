import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "../../context/authContext";
dayjs.extend(utc);

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { isAdmin } = useAuth();

  return (
    <Card>

      {task.thumbnail && (
        <img
          src={task.thumbnail}
          alt="Profile"
          className="mt-4 rounded-full w-16 h-16 object-cover mx-auto" // Centrar la imagen  
        />
      )}  



      <div className="flex items-center flex-col">
        <header className="flex justify-between  mt-3">
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </header>
        <p className="text-slate-300">{task.name}</p>
        <p className="text-slate-300">Leg. Pers. N°: {task.legajopersonal}</p>
        <p className="text-slate-300">DNI: {task.dni}</p>
        <div className="flex gap-x-2 items-center">
          {isAdmin && (
            <>
              <Button onClick={() => deleteTask(task._id)}>Delete</Button>
              <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
            </>
          )}
          <ButtonLink to={`/view-task/${task._id}`}>Ver</ButtonLink>
        </div>
      </div>
    </Card>
  );
}