export interface NotificationDTO {
    message: string;
    titre: string,
    dejavue: boolean;
    idUser: number;
}

export class Notification implements NotificationDTO {
    constructor(

        public message: string,
        public titre: string,
        public dejavue: boolean,
        public idUser: number
    ) {}
}