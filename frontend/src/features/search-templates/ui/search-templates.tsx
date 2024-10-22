import { Input } from "@nextui-org/react";
import search from '../../../assets/icons8-search.svg';


const SearchTemplates = () => {
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
        />
    )
}

export default SearchTemplates;