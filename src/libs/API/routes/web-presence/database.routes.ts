
export interface Database_Routes_Interface {
    save_One_Document: string;
    save_Many_Documents: string;
    find_One_Documents: string;
    find_Many_Documents: string;
    update_One_Document: string;
    update_Many_Documents: string;
    delete_One_Document: string;    
    delete_Many_Document: string;    
}

export const Database_Routes: Database_Routes_Interface = {
    save_One_Document: "web-presence/database/save/one",
    save_Many_Documents: "web-presence/database/save/many",
    find_One_Documents: "web-presence/database/find/one",
    find_Many_Documents: "web-presence/database/find/many",
    update_One_Document: "web-presence/database/update/one",
    update_Many_Documents: "web-presence/database/update/many",
    delete_One_Document: "web-presence/database/delete/one",
    delete_Many_Document: "web-presence/database/delete/many"
}