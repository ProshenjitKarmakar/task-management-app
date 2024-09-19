import httpRequest from "../api/httpRequest";


class AssessmentService {
    getWhiteLabel(payload: any) {
        return httpRequest.get('/user-info/white-label-information', payload);
    }

    updateBrandName(payload: any) {
        return httpRequest.put('/user-info/white-label-information', payload);
    }

    async updateBrandLogo(payload: any) {
        return httpRequest.post('/user-info/white-label-logo', payload);
    }

    async updateBrandFavIcon(payload: any) {
        return httpRequest.post('/user-info/white-label-favicon', payload);
    }

    async deleteLogoAndIcon(payload: any) {
        return httpRequest.post('/user-info/white-label-favicon', payload);
    }
}

export default new AssessmentService();
