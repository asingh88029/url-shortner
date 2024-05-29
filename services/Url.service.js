const clientPostgres = require("./../postgresql");

async function createANewUrlInDB(originalUrl, shortUrl){
    // It will save a new data for url in urls table of learning database 
    try {

        const QUERY = `
            INSERT INTO urls (original_url, short_url)
            VALUES ($1, $2)
            RETURNING *
        `

        const VALUES = [originalUrl, shortUrl]

        // Insert a new entry into the urls table
        const res = await clientPostgres.query(QUERY, VALUES);

        if(!res.rows || res.rows.length===0){
            throw new Error("Not able to add new data inside the urls table")
        }

        // Return success status and the inserted row
        return {
            success: true,
            data: res.rows[0]
        };

    }catch(err){
        console.log("Error happens while calling createANewUrlInDB - "+ err.message);
        return {
            success : false
        }
    }
}

module.exports = {
    createANewUrlInDB
}