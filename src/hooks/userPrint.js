
import * as ReactDOMServer from "react-dom/server"

const userPrint = async (component) =>{
    const content = await ReactDOMServer.renderToString(component)
    return content
}

export default userPrint