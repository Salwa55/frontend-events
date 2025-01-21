export interface Evenement {
    idEvenement?: number;
    responsable?: number;
    titre?: string;
    description?: string;
    dateFin?: Date;
    dateDebut?: Date;
    responsableNomComplet?: string;
    role?: string;
    lieu?: string;
    nbrParticipant?: number;
    decision:string;
    causeRefus:string;
  }
