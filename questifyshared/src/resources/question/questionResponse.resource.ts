import { Answer } from "./question.resource";

export class QuestionResponse{
    statement: string;
    discipline: string;
    answers: Answer[];
    userId: number;
    previousId?: number;

    constructor(statement: string, discipline: string, answers: Answer[], userId: number, previousId: number){
        this.statement = statement;
        this.discipline = discipline;
        this.answers = answers;
        this.userId = userId;
    }
}