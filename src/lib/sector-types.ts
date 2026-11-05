export interface Sector {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

export interface StrapiCollection<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
