export interface IAnswer {
    id: string,
    question_id: string;
    form_id: string;
    template_id: string,
    user_id: number;
    answer: string | string[];
}