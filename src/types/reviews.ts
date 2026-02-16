export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  workshop_type: "couture" | "linogravure" | "both";
  created_at: string;
}

export interface ReviewSubmission {
  name: string;
  rating: number;
  comment: string;
  workshop_type: "couture" | "linogravure" | "both";
}
