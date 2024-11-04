import { useState } from "react";
import { Input, Button, CardBody, Card } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";
import { createSalesforce } from "../../shared/api/salesforce";
import { updateUser } from "../../shared/api/user";
import { setSalesforceId } from "../../entities/user/model/userSlice";
import salesforce from '../../assets/image.png';

const SalesforceForm = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((store: RootState) => store.user);
    const [email, setEmail] = useState<string>(user.email);
    const [phone, setPhone] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [error, setError] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        await createSalesforce({firstName, lastName, email, phone})
            .then((res) => {
                console.log(res, 'res')
                dispatch(setSalesforceId(res.accountId));
                updateUser(+user.id, { salesforce_id: res.accountId })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch(err => setError(err))
      };

    if(user.salesfoce_id) {
        return (
            <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-12 max-w-screen-xl">
                <img src={salesforce} alt='salesforce'/>
            </main>
        )
    }

    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-12 max-w-screen-xl">
        <Card className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-green-500 border-dotted">
            <CardBody className="w-full flex flex-col items-center">  
                <h2 className="font-mono text-center font-bold text-2xl uppercase mb-12">
                    Create salesforce account and contact
                </h2>
                <form className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit}>
                <Input
                    value={firstName}
                    type="text"
                    label="First name"
                    variant="bordered"
                    className="sm:w-full lg:w-2/3"
                    onChange={(e) => setFirstName(e.target.value)}
                    color={error ? "danger" : "secondary"}
                    isInvalid={!!error}
                    isRequired
                />
                <Input
                    value={lastName}
                    type="text"
                    label="Last name"
                    variant="bordered"
                    className="sm:w-full lg:w-2/3"
                    onChange={(e) => setLastName(e.target.value)}
                    color={error ? "danger" : "secondary"}
                    isInvalid={!!error}
                    isRequired
                />
                <Input
                    value={email}
                    type="email"
                    label="Email"
                    variant="bordered"
                    className="sm:w-full lg:w-2/3"
                    onChange={(e) => setEmail(e.target.value)}
                    color={error ? "danger" : "secondary"}
                    isInvalid={!!error}
                    isDisabled
                    isRequired
                />
                <Input
                    value={phone}
                    type="phone"
                    label="Phone number"
                    variant="bordered"
                    className="sm:w-full lg:w-2/3"
                    onChange={(e) => setPhone(e.target.value)}
                    color={error ? "danger" : "secondary"}
                    isInvalid={!!error}
                    isRequired
                />
                <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono">
                    Submit
                </Button>
            </form>
            </CardBody>
        </Card>
    </main>
    )
}

export default SalesforceForm;