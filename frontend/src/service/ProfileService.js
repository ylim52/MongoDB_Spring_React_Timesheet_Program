import axios from "axios";

class ProfileService{

  //  functions
    update(data) {
        axios.put('/api/person/profile', data);
      }
}

export default new ProfileService();