export interface Answer{
    text: string;
    isCorrect: boolean;
}

// Os nomes dos atributos aqui devem ser os mesmos dos enviados pelo backend
export class Question{
    id?: number;
    statement: string;
    discipline: string;
    answers: Answer[];
    userId?: number
    nameUser: string;
    previousId?: number;
    createdAt?: string;
    countRating?: number;
    totalRating?: number;
    

    constructor(id: number,statement: string, discipline: string, answers: Answer[], userId: number, nameUser:string, previous: number, dataCriacao: string,
        countRating: number, totalRating: number
    ){
        this.id = id;
        this.statement = statement;
        this.discipline = discipline;
        this.answers = answers;
        this.userId = userId;
        this.nameUser = nameUser;
        this.previousId = previous;
        this.createdAt = dataCriacao;
        this.countRating = countRating;
        this.totalRating = totalRating;
    }
}