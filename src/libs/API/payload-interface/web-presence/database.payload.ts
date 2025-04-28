
export interface save_One_Document_Payload {
    database_name: string;
    document: Record<string, any>;
}

export interface save_Many_Documents_Payload {
    database_name: string;
    documents: Record<string, any>[];
}

export interface find_One_Document_Payload {
    database_name: string;
    filter: Record<string, any>;
    projection?: Record<string, number>;
}

export interface find_Many_Documents_Payload {
    database_name: string;
    filter: Record<string, any>;
    projection?: Record<string, number>;
    sort?: Record<string, any>;
    limit?: number,
}

export interface update_One_Document_Payload {
    database_name: string;
    filter: Record<string, any>;
    document_updates: Record<string, any>;
    upsert?: boolean;
}

export interface update_Many_Documents_Payload {
    database_name: string;
    filter: Record<string, any>;
    document_updates: Record<string, any>;
    upsert: boolean;
}

export interface delete_One_Document_Payload {
    database_name: string;
    filter: Record<string, any>
}

export interface delete_Many_Documents_Payload {
    database_name: string;
    filter: Record<string, any>;
}