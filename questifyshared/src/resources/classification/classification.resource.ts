export class Classification{

    rating: number;
    mediaRate?: number;
    userId: number;
    questionId: number;

    constructor(rating: number , userId: number, questionId: number){
        this.rating = rating;
        this.userId = userId;
        this.questionId = questionId;
    }
}