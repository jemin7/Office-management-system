import "dotenv/config"
import app from  "./src/app.js"


async function start() {
    /// database 

    const server = app.listen(PORT, () => {
        const PORT = server.address().port 
    })
}