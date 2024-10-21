import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { GetEmployee } from "@/types/interfaces";

function renderValue(option: any | null) {
  if (!option) {
    return null;
  }
  let selectedItem = option;
  if (typeof option === "string") {
    selectedItem = JSON.parse(option);
  }
  return (
    <React.Fragment>
      <div className="flex gap-5 items-center">
        <Avatar
          src={selectedItem.avatar}
          sx={{ width: 70, height: 70 }}
          className="absolute -top-2 -left-2 z-10"
        />
        <p className="ml-14">{selectedItem.username}</p>
      </div>
    </React.Fragment>
  );
}

interface SelectWithAvatarProps {
  employees: GetEmployee[];
}

export default function SelectWithAvatar({ employees }: SelectWithAvatarProps) {
  const [value, setValue] = React.useState(employees[0]);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    setValue(event.target.value as unknown as GetEmployee);
  };
  return (
    <Select
      // defaultValue={employees[0]}
      value={value}
      sx={{ minWidth: 220 }}
      renderValue={renderValue}
      onChange={handleChange}
    >
      {employees.map((employee: GetEmployee, index: number) => [
        <MenuItem
          key={index}
          value={JSON.stringify(employee)}
          className="gap-6 p-2 m-0"
        >
          <Avatar src={employee.avatar} />
          {employee.username}
        </MenuItem>,
        index < employees.length - 1 && (
          <Divider component="li" variant="middle" />
        ),
      ])}
    </Select>
  );
}
