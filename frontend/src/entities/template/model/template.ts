import { IQuestion } from "../../question/model/question";

export interface ITemplate {
    id: string;
    title: string;
    description: string;
    user_id: number;
    questions?: IQuestion[];
}