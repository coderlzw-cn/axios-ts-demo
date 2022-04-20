import service from "../index";
export const getInfo = () => {
    return service.request({
        url: '/posts'
    })
}
