import $axiosSB from "@/utils/AxiosSB";

class HTTP_H2service{
    getAll() {
        return $axiosSB.get("/tutorials");
    }

    get(id) {
        return $axiosSB.get(`/tutorials/${id}`);
    }

    create(data) {
        return $axiosSB.post("/tutorials", data);
    }

    update(id, data) {
        return $axiosSB.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return $axiosSB.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return $axiosSB.delete(`/tutorials`);
    }

    findByTitle(title) {
        return $axiosSB.get(`/tutorials?title=${title}`);
    }
}

export default new HTTP_H2service()