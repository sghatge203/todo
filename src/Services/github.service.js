import { apiEndPoint } from "../Config"

var requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/vnd.github.machine-man-preview',
    }
}
export const gitHubServices = () => {
    let owner ="angular";
    let repo = "angular";
    return fetch(`${apiEndPoint.baseUrl}repos/${owner}/${repo}/issues`,requestOptions).then((response)=>{
        return response.json();
    }).catch((error)=>{
        console.log('error',error)
    })
}