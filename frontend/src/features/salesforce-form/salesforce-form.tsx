import { useState } from "react";
import { Input, Button, CardBody, Card } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../app/routes/lib/hook";
import { RootState } from "../../app/appStore";
import { createSalesforce } from "../../shared/api/salesforce";
import { updateUser } from "../../shared/api/user";
import { setSalesforceId } from "../../entities/user/model/userSlice";

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
                const accountId = res.accountId
                dispatch(setSalesforceId(accountId));
                updateUser(+user.id, { salesforce_id: accountId })
            })
            .catch(err => setError(err))
      };

    if(!user) {
        return (
            <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-12 max-w-screen-xl">
                loading
            </main>
        )
    }

    if(user.salesforce_id) {
        return (
            <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24 max-w-screen-xl mb-[10%]">
                <Card className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-green-500 border-dotted">
                    <CardBody className="w-full flex flex-col items-center">
                        <p className="font-mono text-center">You have already successfully registered with <span className="text-cyan-600 font-bold">Salesforce.</span> Thank you!</p>
                    </CardBody>
                </Card>
            </main>
        )
    }

    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-14 max-w-screen-xl">
        <Card className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-green-500 border-dotted">
            <CardBody className="w-full flex flex-col items-center">  
                <h2 className="font-mono text-center font-bold text-2xl uppercase mb-12">
                    Create salesforce account
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
                {error && <p className="text-red-500">{error}</p>}
                <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono" isDisabled={!firstName || !lastName || !phone}>
                    Submit
                </Button>
            </form>
            </CardBody>
        </Card>
    </main>
    )
}

export default SalesforceForm;