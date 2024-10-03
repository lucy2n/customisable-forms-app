import {Select, SelectItem, Avatar} from "@nextui-org/react";

export default function QuestionTypeSelect() {
  return (
    <Select
      className="max-w-xs"
      label="Select question type"
    >
      <SelectItem
        key="short-text"
        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
      >
        Text
      </SelectItem>
      <SelectItem
        key="long-text"
        startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
      >
        Long Text
      </SelectItem>
      <SelectItem
        key="select"
        startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
      >
        Select
      </SelectItem>
      <SelectItem
        key="ratio"
        startContent={
          <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
        }
      >
        One of list
      </SelectItem>
    </Select>
  );
}