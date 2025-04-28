
// * Dependencies Required

import Web_Design_Nodes from "../../src";

describe("Web Presence Database Workflow", () => {

    const web_Presence_Connection = Web_Design_Nodes.Web_Presence.connect({ project_id: "joseirasso-network", project_token: "9558ef3b61152c4752de4cbc296426427b561db6119cf964e1dac8eb3bd31845" })

    test("Save One document at the Web Presence Database", async () => {

        const testing_document = {
            title: "Articulo de prueba",
            content: ["Esto representa un parrafo del articulo", "Esto representa otro parrafo del articulo"],
            releaseDate: Date.now()
        }

        const insert_Result = await web_Presence_Connection.Database.save_One_Document("testing", testing_document);

        console.log(insert_Result);

        expect(insert_Result.acknowledged === true);

    });

    test("Save Many documents at the Web Presence Database", async () => {

        const testing_document = {
            title: "Articulo de prueba2",
            content: ["Esto representa un parrafo del articulos", "Esto representa otro parrafo del articulos"],
            releaseDate: Date.now()
        }

        const testing_document2 = {
            title: "Articulo de prueba3",
            content: ["Esto representa un parrafo del articulo", "Esto representa otro parrafo del articulo"],
            releaseDate: Date.now()
        }

        const search_Result = await web_Presence_Connection.Database.save_Many_Documents("testing", [testing_document, testing_document2]);

        console.log(search_Result);

        expect(search_Result);

    });

    test("Find One Web Presence Database Content", async () => {

        const filter = {
            content: ["Esto representa un parrafo del articulo", "Esto representa otro parrafo del articulo"],
        }

        const projection = {
            title: 1
        }




        const search_Result = await web_Presence_Connection.Database.find_One_Document("testing", filter, projection);

        console.log(search_Result);

        expect(search_Result);

    });

    test("Find Many Web Presence Database Content", async () => {

        const filter = {
            content: ["Esto representa un parrafo del articulo", "Esto representa otro parrafo del articulo"],
        }

        const projection = {
            title: 1
        }

        const sort = {
            releaseDate: -1
        }

        const search_Result = await web_Presence_Connection.Database.find_Many_Documents("testing", filter, projection, sort, 10);

        console.log(search_Result);

        expect(search_Result);

    });

    test("Update One Web Presence Database Document", async () => {

        const filter = {
            title: "Articulo de prueba",
        }

        const update = {
            $set: { title: "Articulo de prueba - one updated" }
        }

        const search_Result = await web_Presence_Connection.Database.update_One_Document("testing", filter, update, false);

        console.log(search_Result);

        expect(search_Result);

    });

    test("Update Many Web Presence Database Document", async () => {

        const filter = {
            content: ["Esto representa un parrafo del articulos", "Esto representa otro parrafo del articulos"],
        }

        const update = {
            $set: { title: "Acticulo de pruebas - many updated" }
        }

        const search_Result = await web_Presence_Connection.Database.update_Many_Documents("testing", filter, update, false);

        console.log(search_Result);

        expect(search_Result);

    });

    // test("Delete One Web Presence Database Document", async () => {

    //     const filter = {
    //         title: "Articulo de prueba",
    //     }

    //     const search_Result = await web_Presence_Connection.Database.delete_One_Document("testing", filter);

    //     console.log(search_Result);

    //     expect(search_Result);

    // });

    // test("Delete Many Web Presence Database Documents", async () => {

    //     const filter = {
    //         content: ["Esto representa un parrafo del articulo", "Esto representa otro parrafo del articulo"],
    //     }

    //     const search_Result = await web_Presence_Connection.Database.delete_Many_Documents("testing", filter);

    //     console.log(search_Result);

    //     expect(search_Result);

    // });

})