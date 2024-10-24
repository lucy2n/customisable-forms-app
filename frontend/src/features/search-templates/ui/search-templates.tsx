import { Input } from "@nextui-org/react";
import search from '../../../assets/icons8-search.svg';
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAppDispatch } from "../../../app/routes/lib/hook";
import { setSearchByInputTemplates } from "../model/searchTemplatesSlice";


const SearchTemplates = () => {
  const [searchValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue] = useDebounce(searchValue, 700);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("Dispatching search value:", debouncedValue);
    dispatch(setSearchByInputTemplates(debouncedValue));
  }, [debouncedValue, dispatch]);

    return (
        <Input
          type="email"
          color="success"
          size="md"
          placeholder="Find template"
          variant="bordered"
          className="max-w-[420px]"
          startContent={
            <div className="pointer-events-none flex items-center">
                <img src={search} alt="search template"/>
            </div>
          }
          onChange={handleInputChange}
        />
    )
}

export default SearchTemplates;