
export interface save_One_Document_Response { acknowledged: boolean, _id: string }

export interface save_Many_Documents_Response { acknowledged: boolean, _ids: string[] }

export interface find_One_Documents_Response { acknowledged: boolean, result: Record<string, any> }

export interface find_Many_Documents_Response { acknowledged: boolean, results: Record<string, any>[] }

export interface update_One_Document_Response { acknowledged: boolean, modifiedCount: number }

export interface update_Many_Documents_Response { acknowledged: boolean, modifiedCount: number }

export interface delete_One_Document_Response { acknowledged: boolean, deletedCount: number }

export interface delete_Many_Documents_Response { acknowledged: boolean, deletedCount: number }