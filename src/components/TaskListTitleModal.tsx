"use client";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { editList } from "@/redux/slices/listSlice";

import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface TaskListTitleModal {
  listId: string;
  isOpen: boolean;
  listTitle: string;
  onClose: () => void;
}

const TaskListTitleModal: React.FC<TaskListTitleModal> = ({
  listId,
  isOpen,
  listTitle,
  onClose,
}) => {
  const [title, setTitle] = useState(listTitle);

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(editList({ id: listId, title }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p className="text-gray-400">Edit list title:</p>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="flex justify-end">
          <Button className="w-fit" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskListTitleModal;
