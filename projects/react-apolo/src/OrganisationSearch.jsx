import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const OrganizationSearch = ({ organisationName, onOrganizationSearch }) => {
  const [value, setValue] = useState(organisationName);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    onOrganizationSearch(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input color={"white"} type="text" value={value} onChange={onChange} />{" "}
        <Button color={"white"} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default OrganizationSearch;
