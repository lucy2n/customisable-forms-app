export enum QuestionType  {
    text = 'text',
    longText = 'longText',
    radio = 'radio',
    checkbox = 'checkbox',
    select = 'select',
}

export interface IQuestion {
    id: string;
    type: QuestionType,
    text: string,
    options: string[];
}