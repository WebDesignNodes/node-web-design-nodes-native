
// * Interfaces Required

import { User_Manager_Routes_Interface } from "./users.routes";

// * Routes Exported

import { User_Manager_Routes } from "./users.routes";

export interface Web_Presence_Routes_Interface {
    user: User_Manager_Routes_Interface
}

export const Web_Presence_Routes: Web_Presence_Routes_Interface = {
    user: User_Manager_Routes
}