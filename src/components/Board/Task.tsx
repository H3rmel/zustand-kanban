//#region Imports

import { useMemo } from "react";

import { useKanban } from "@/stores/kanban";

import { Check, Trash } from "@phosphor-icons/react";
import { ConfirmButton } from "../ConfirmButton/ConfirmButton";

//#endregion

interface TaskProps {
  id: number;
}

export const Task = ({ id }: TaskProps) => {
  const { tasks, deleteTask, setDraggedTask } = useKanban();

  const filteredTask = useMemo(
    () => tasks.find((task) => task.id === id),
    [id, tasks]
  );

  const handleDelete = () => {
    deleteTask(id);
  };

  const handleDragStart = () => {
    setDraggedTask(id);
  }

  return (
    <article className="relative card border border-transparent hover:border-slate-300/10 cursor-grab duration-150" draggable={true} onDragStart={handleDragStart}>
      <div className="card-body gap-0">
        <h4 className="text-lg text-slate-200">{filteredTask?.title}</h4>
        <p className="text-sm text-slate-400">{filteredTask?.description}</p>
      </div>
      <ConfirmButton
        onConfirm={handleDelete}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 bottom-2 hover:text-red-8"
        messages={["Remover", "Confirmar"]}
        dialog={[
          <Trash size={16} weight="bold" />,
          <Check size={16} weight="bold" />,
        ]}
      />
    </article>
  );
};
