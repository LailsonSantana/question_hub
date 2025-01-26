export class Classification{

    nota: number;
    mediaRate?: number;
    userId: number;
    questionId: number;

    constructor(nota: number , userId: number, questionId: number){
        this.nota = nota;
        this.userId = userId;
        this.questionId = questionId;
    }
}